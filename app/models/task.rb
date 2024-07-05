class Task < ApplicationRecord
  belongs_to :goal

  scope :completed, lambda {
    where(completed: true)
  }
end
