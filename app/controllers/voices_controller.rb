# frozen_string_literal: true

class VoicesController < ApplicationController
  before_action :set_voice, only: %i[edit update destroy delete_from_frame undiscard]
  load_and_authorize_resource
  layout 'dashboard', only: %i[manager edit]

  def delete_from_frame
    @voice.destroy

    head :ok
  end

  def index; end

  def new
    @voice = Voice.new
  end

  def undiscard
    @voice.undiscard
    redirect_to manager_voices_path(@voice)
  end

  def manager
    set_voice if params[:id].present?
    render layout: 'dashboard'
  end

  def edit; end

  def create
    @voice = Voice.new(voice_params)

    respond_to do |format|
      if @voice.save
        format.html { redirect_to edit_voice_path(@voice), status: :see_other }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /voices/1 or /voices/1.json
  def update
    respond_to do |format|
      if @voice.update(voice_params)
        format.html { redirect_to edit_voice_path(@voice), notice: 'Voice was successfully updated.' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @voice.discard

    head :no_content
  end

  private

  def set_voice
    @voice = Voice.find(params[:id])
  end

  def voice_params
    params.require(:voice).permit(:name, :user_id, :meta_prompt, conversation_ids: [])
  end
end
