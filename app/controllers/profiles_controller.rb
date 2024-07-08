class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
    respond_to do |format|
      format.html
      format.any { head :not_acceptable }
    end
  end

  def update
    @user = current_user
    if update_user
      bypass_sign_in(@user)
      flash[:success] = determine_success_message
      redirect_to profile_path, status: :see_other
    else
      flash.now[:error] = "Failed to update profile"
      render :show
    end
  end

  def remove_profile_image
    @user = User.find(params[:id])
    @user.profile_image.purge
    redirect_to profile_path, notice: "Profile image removed successfully"
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :profile_image)
  end

  def update_user
    if params[:user].present?
      if params[:user][:profile_image].present?
        @user.profile_image.attach(params[:user][:profile_image])
      end
      if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
        @user.update(user_params.except(:password, :password_confirmation))
      else
        @user.update(user_params)
      end
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
