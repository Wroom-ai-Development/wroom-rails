# frozen_string_literal: true

class DocumentsController < ApplicationController # rubocop:disable Metrics/ClassLength
  before_action :set_document,
                only: %i[editor destroy autosave undiscard discard share]
  load_and_authorize_resource

  def share # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    email = params[:email]
    user = User.find_by(email:)
    # TODO: Refactor this logic into a service object, e.g. CollaborationService
    if user.nil?
      PendingCollaboration.create!(document_id: @document.id, invited_by: current_user.email, email:)
      redirect_to editor_document_path(@document),
                  notice: 'This user does not have an account yet. We have sent them an invitation to join Wroom.'
    elsif user == current_user
      redirect_to editor_document_path(@document), alert: 'You cannot share a document with yourself'
    elsif @document.collaborators.include?(user)
      redirect_to editor_document_path(@document), notice: 'This user already has access to this document'
    else
      @document.share_with(user)
      redirect_to editor_document_path(@document), notice: 'Document shared successfully'
    end
  end

  def editor # rubocop:disable Metrics/AbcSize, Metrics/MethodLength, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    # TODO: Refactor this method
    @document = if params[:id].present?
                  Document.find(params[:id])
                else
                  current_user.documents.first
                end
    # Initializes etherpad if not already done
    # TODO: Move this into a Document model callback
    if !@document.source_based && (@document.etherpad_group.nil? || @document.etherpad_pad_id.nil?)
      @document.initialize_etherpad
    end
    @conversation = @document.conversation
    # TODO: Move breadcrumb logic out of this method
    @document.folder.parents.reverse.each do |parent|
      breadcrumbs << Breadcrumb.new(parent.name, folder_path(parent))
    end
    breadcrumbs << Breadcrumb.new(@document.folder.name, folder_path(@document.folder))
    breadcrumbs << Breadcrumb.new(@document.truncated_title(40), editor_document_path(@document))

    return if @document.source_based

    # TODO: Move the logic below into EtherpadService for better separation of concerns
    ether = EtherpadService.new.ether
    author = ether.get_author(current_user.etherpad_author_id)
    group = ether.get_group(@document.etherpad_group.group_id)

    # TODO: Handle session logic in a separate method in this controller
    session[:ep_sessions] = {} if session[:ep_sessions].nil?
    sess = if session[:ep_sessions][group.id]
             ether.get_session(session[:ep_sessions][group.id])
           else
             group.create_session(
               author, 60 * 24
             )
           end
    if sess.expired?
      sess.delete
      sess = group.create_session(author, 60)
    end
    session[:ep_sessions][group.id] = sess.id
    cookies['sessionID'] = {
      value: sess.id,
      domain: ENV['COOKIES_DOMAIN']
    }
    cookies['prefsHttp'] = {
      value: {},
      domain: ENV['COOKIES_DOMAIN']
    }

    @etherpad_url = ENV['ETHERPAD_URL']
    @etherpad_url += '/p/'
    @etherpad_url += @document.etherpad_pad_id
  end

  def index
    @documents = Document.kept
    @users = User.where.not(id: current_user.id) if current_user.admin?
  end

  def undiscard
    @document.undiscard
    redirect_to wroom_path(document_id: @document.id)
  end

  def new
    @document = Document.create!(
      title: 'Untitled',
      user_id: current_user.id,
      folder_id: current_user.current_folder_id || current_user.root_folder.id
    )
    @document.initialize_etherpad
    redirect_to wroom_path(document_id: @document.id)
  end

  def autosave
    @document.assign_attributes(document_params)
    @document.save!
    head :ok
  end

  def duplicate # rubocop:disable Metrics/AbcSize, Metrics/MethodLength, Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    # TODO: Move this into Document model
    @document = Document.find(params[:id])
    duplicate = @document.dup
    duplicate.cloned_from = @document.id
    duplicate.title = "#{@document.title} Copy"
    duplicate.content = @document.content
    duplicate.etherpad_pad_id = nil
    duplicate.save!

    # Initializes etherpad for cloned document if for some reason the original is missing its etherpad_pad_id
    # Otherwise clones the original's pad
    if @document.etherpad_pad_id.nil?
      duplicate.initialize_etherpad
    else
      duplicate.clone_pad(@document)
    end
    # Copies the chat to the new document
    conversation = @document.conversation.dup
    if @document.conversation.messages.present?
      @document.conversation.messages.each do |message|
        conversation.messages << message.dup
      end
    end
    # Copies the voice to the new document
    conversation.voice = @document.conversation.voice if @document.conversation.voice.present?
    conversation.save!
    # Copies over context references
    if @document.conversation.context_references.present?
      @document.conversation.context_references.each do |reference|
        ContextReference.create!(document_id: reference.document_id, conversation_id: conversation.id)
      end
    end
    duplicate.conversation = conversation
    duplicate.save!
    # Copies over the source if the original document has one
    if @document.source.present?
      source = @document.source.dup
      @document.source.source_chunks.each do |chunk|
        source.source_chunks << chunk.dup
      end
      source.file.attach @document.source.file.blob
      source.save!
      duplicate.source = source
      duplicate.save!
    end
    @document.update_storage_bar
    head :no_content
  end

  def discard
    @document.discard
    current_user.update!(current_document_id: nil) if current_user.current_document_id == @document.id
    head :no_content
  end

  def destroy
    @document.destroy
    head :no_content
  end

  private

  def set_document
    @document = Document.find(params[:id])
  end

  def document_params
    params.require(:document).permit(:title, :content, :user_id, :folder_id)
  end
end
