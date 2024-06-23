class TasksController < ApplicationController
  before_action :set_goal, only: [:new, :create]

  def index
    @tasks = Task.all
  end

  def new
    @task = @goal.tasks.new
  end

  def create
    @task = @goal.tasks.new(task_params)
    if @task.save
      redirect_to @goal, notice: 'Task was successfully created.'
    else
      render :new
    end
  end

  def show
    @Task = Task.find(params[:id])
  end
end

private

def set_goal
  @goal = Goal.find(params[:goal_id])
end

def task_params
  params.require(:goal).permit(:name, :deadline, :completed,)
end

end
