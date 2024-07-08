class TasksController < ApplicationController
  before_action :set_goal, only: [:new, :create, :show, :edit, :update, :destroy]
  before_action :set_task, only: [:show, :edit, :update, :destroy]

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
    # @task is already set by the before_action
  end

  def edit

  end

  def update
    if @task.update(task_params)
      redirect_to [@goal, @task], notice: 'Task was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @task.destroy
    redirect_to @goal, notice: 'Task was successfully deleted.'
  end

  private

  def set_goal
    @goal = Goal.find(params[:goal_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :deadline, :completed)
  end
end
