# frozen_string_literal: true

class WroomController < ApplicationController
  layout 'wroom'

  def app # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    create_welcome_records unless current_user.onboarded?

    @document = if params[:document_id].present?
                  Document.find(params[:document_id])
                elsif current_user.current_document_id.present?
                  Document.find(current_user.current_document_id)
                elsif current_user.documents.any?
                  current_user.documents.first
                end
    if @document
      current_user.update!(current_document_id: @document.id)
    else
      create_no_documents_messages
    end
  end

  private

  def create_no_documents_messages
    service = OpenaiService.new
    @message = '☚ Have you created any documents yet?'

    @haiku = service.chat_completion([{
                                       role: 'user',
                                       content: 'Write a haiku about starting a new venture.'
                                     }],
                                     'gpt-3.5-turbo', 1000)
  end

  def create_welcome_records
    create_welcome_source
    create_welcome_voices
    current_user.update!(onboarded: true)
  end

  def create_welcome_source # rubocop:disable Metrics/MethodLength
    source = Source.create!(
      user_id: current_user.id,
      name: "'Sympathy' by Emily Brontë",
      fileless: true,
      title: 'Sympathy',
      author: 'Emily Brontë',
      year_published: '1846',
      text_category: 'poem',
      document: current_user.documents.first,
      folder_id: current_user.root_folder.id
    )
    poem = <<-POEM
      There should be no despair for you
      While nightly stars are burning;
      While evening pours its silent dew,
      And sunshine gilds the morning.
      There should be no despair—though tears
      May flow down like a river:
      Are not the best beloved of years
      Around your heart for ever?

      They weep, you weep, it must be so;
      Winds sigh as you are sighing,
      And winter sheds its grief in snow
      Where Autumn’s leaves are lying:
      Yet, these revive, and from their fate
      Your fate cannot be parted:
      Then, journey on, if not elate,
      Still, NEVER broken-hearted!
    POEM
    source.parse_source_chunks_from_text(poem)
  end

  def create_welcome_voices
    voices = [
      ['Pirate', 'Speak like a pirate'],
      ['Worried mother', 'Speak like a mother who is constantly worried about her child.'],
      ['Hepcat', 'Speak like a hepcat']
    ]
    voices.each do |voice|
      current_user.voices.create(name: voice[0], meta_prompt: voice[1])
    end
  end
end
