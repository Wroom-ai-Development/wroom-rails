# frozen_string_literal: true

class VoicesController < ApplicationController
  before_action :set_voice, only: %i[show edit update destroy]
  load_and_authorize_resource

  # GET /voices or /voices.json
  def index
    @voices = Voice.all
    @users = User.all if current_user.admin?
  end

  # GET /voices/1 or /voices/1.json
  def show; end

  # GET /voices/new
  def new
    @voice = Voice.new
  end

  # GET /voices/1/edit
  def edit; end

  # POST /voices or /voices.json
  def create
    @voice = Voice.new(voice_params)

    respond_to do |format|
      if @voice.save
        format.html { redirect_to voice_url(@voice), notice: 'Voice was successfully created.' }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /voices/1 or /voices/1.json
  def update
    respond_to do |format|
      if @voice.update(voice_params)
        format.html { redirect_to voice_url(@voice), notice: 'Voice was successfully updated.' }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /voices/1 or /voices/1.json
  def destroy
    @voice.destroy

    respond_to do |format|
      format.html { redirect_to voices_url, notice: 'Voice was successfully destroyed.' }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_voice
    @voice = Voice.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def voice_params
    params.require(:voice).permit(:name, :user_id, :meta_prompt, conversation_ids: [])
  end
end
