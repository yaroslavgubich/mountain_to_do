class TasksController < ApplicationController
  before_action :set_goal, only: %i[new create show edit update destroy toggle_completion]
  before_action :set_task, only: %i[show edit update destroy toggle_completion]

  def index
    @tasks = @goal.tasks.order(:created_at) # Ensure original order is maintained
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
    # @task is already set by the before_action
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

  def toggle_completion
    if @task.update(completed: params[:completed].present?)
      redirect_to goal_path(@goal), notice: 'Task status updated.'
    else
      redirect_to goal_path(@goal), alert: 'Failed to update task status.'
    end
  end

  private

  def set_goal
    @goal = Goal.find(params[:goal_id])
  end

  def set_task
    @task = @goal.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :deadline, :completed)
  end
end
