class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
  end

  def update
    @user = current_user
    if update_user
      bypass_sign_in(@user)
      flash[:success] = determine_success_message
      redirect_to profile_path
    else
      flash.now[:error] = "Failed to update profile"
      render :show
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def update_user
    if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
      @user.update(user_params.except(:password, :password_confirmation))
    else
      @user.update(user_params)
    end
  end

  def determine_success_message
    if params[:user][:password].present?
      "Password updated successfully"
    elsif params[:user][:email].present?
      "Email updated successfully"
    elsif params[:user][:username].present?
      "Username updated successfully"
    else
      "Profile updated successfully"
    end
  end
end
