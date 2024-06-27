class GoalsController < ApplicationController
  def index
    @goals = Goal.includes(:tasks).all
    @goals.each do |goal|
      goal.tasks.build unless goal.tasks.any?
    end
  end

  def new
    @goal = Goal.new
    @goal.tasks.build
  end

  def edit
    @goal = Goal.includes(:tasks).find(params[:id])
    @goal.tasks.build
  end

  def update
    @goal = Goal.find(params[:id])
    if @goal.update(goal_params)
      redirect_to @goal, notice: 'Goal was successfully updated.'
    else
      render :edit
    end
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user_id = current_user.id
    if @goal.save
      redirect_to @goal
    else
      render :new
    end
  end

  def show
    @goal = Goal.find(params[:id])
  end

  def destroy
    @goal = Goal.find(params[:id])
    @goal.destroy
    redirect_to goals_url
  end

  private

  def goal_params
    params.require(:goal).permit(:name, :start_date, :deadline,
                                 tasks_attributes: %i[id name deadline completed _destroy])
  end
end
