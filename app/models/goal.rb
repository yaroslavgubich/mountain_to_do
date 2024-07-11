class Goal < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy
  accepts_nested_attributes_for :tasks, allow_destroy: true, reject_if: proc { |attributes| attributes['name'].blank? }

  def completion_percentage
    return 0 if tasks.count.zero?

    completed_tasks = tasks.where(completed: true).count
    (completed_tasks.to_f / tasks.count * 100).round
  end
end
