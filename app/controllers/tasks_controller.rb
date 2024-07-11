class TasksController < ApplicationController
  before_action :set_goal, only: %i[new create show edit update destroy]
  before_action :set_task, only: %i[show edit update destroy]

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
      puts @task.errors.full_messages # Log errors for debugging
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
      respond_to do |format|
        format.json { render json: { status: 'ok' } }
      end
    else
      respond_to do |format|
        format.json { render json: { status: 'error' }, status: :unprocessable_entity }
      end
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
    @task = @goal.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :deadline, :completed,
                                 tasks_attributes: %i[id name deadline completed _destroy])
  end
end
