# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :user, only: %i[show edit update destroy toggle_gpt_4]
  load_and_authorize_resource

  def show
    @sources = user.sources
    @documents = user.documents
  end

  def edit; end

  def toggle_gpt_4
    @user.toggle!(:gpt_4_enabled) # rubocop:disable Rails/SkipsModelValidations
    @user.save!
    redirect_to root_path
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_url(@user), notice: 'user was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to monitoring_url }
      format.json { head :no_content }
    end
  end

  private

  def user
    @user ||= User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:role, :email, :password)
  end
end
