class UsersController < ApplicationController
  before_action :user, except: [:index]

  def index
    @users = User.all
  end

  def show; end

  private

  def user
    @user ||= User.find(params[:id])
  end

end