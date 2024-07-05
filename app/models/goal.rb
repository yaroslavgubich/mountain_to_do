class Goal < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy
  accepts_nested_attributes_for :tasks

  def percent_complete
    return 0 if total_tasks.zero?

    (completed_tasks.to_f / total_tasks * 100).round(1)
  end

  def completed_tasks
    @completed_tasks ||= tasks.completed.count
  end

  def total_tasks
    @total_tasks ||= tasks.count
  end
end
