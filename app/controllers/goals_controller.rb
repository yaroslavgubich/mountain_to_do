class GoalsController < ApplicationController
  def index
    @goals = Goal.all
  end

  def new
    @goal = Goal.new
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user_id = current_user.id
    if @goal.save
      redirect_to @goal, notice: 'Goal was successfully created.'
    else
      render :new
    end
  end

  def show
    @goal = Goal.find(params[:id])
  end
end

private

def goal_params
  params.require(:goal).permit(:name, :deadline, :completed)
end