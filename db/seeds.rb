# To use this seed file, simply place it in the `db/seeds.rb` file of your Rails application.
# Then, run `rails db:seed` in your terminal. This will populate your database with the data defined below.

# Destroy all existing records
Task.destroy_all
Goal.destroy_all
User.destroy_all

# Create a new user
user = User.create!(email: "ya.mansens@gmail.com", password: "123456", username: "yarik")

puts 'Creating goals and tasks...'

# Create the goal "Move to Spain"
move_to_spain = Goal.create!(
  name: "Move to Spain", 
  user: user, 
  deadline: Date.today + 180, # Assuming 6 months for all tasks to be completed
  start_date: Date.today, 
  completed: false
)

# Create tasks associated with the goal "Move to Spain"
move_to_spain_tasks = [
  { name: "Learn Spanish", start_date: Date.today, deadline: Date.today + 30, completed: false },
  { name: "Pass B1 Spanish exam", start_date: Date.today + 31, deadline: Date.today + 60, completed: false },
  { name: "Find a remote web dev job", start_date: Date.today, deadline: Date.today + 90, completed: false },
  { name: "Choose a city", start_date: Date.today, deadline: Date.today + 10, completed: false },
  { name: "Prepare a budget", start_date: Date.today + 5, deadline: Date.today + 15, completed: false },
  { name: "Find a flat/house", start_date: Date.today + 11, deadline: Date.today + 45, completed: false },
  { name: "Buy tickets", start_date: Date.today + 46, deadline: Date.today + 60, completed: false },
  { name: "Apply for your residence permit", start_date: Date.today + 61, deadline: Date.today + 75, completed: false },
  { name: "Register at the town hall", start_date: Date.today + 76, deadline: Date.today + 90, completed: false },
  { name: "Get your NIE number", start_date: Date.today + 91, deadline: Date.today + 105, completed: false },
  { name: "Apply for health insurance", start_date: Date.today + 106, deadline: Date.today + 120, completed: false },
  { name: "Open a Spanish bank account", start_date: Date.today + 121, deadline: Date.today + 135, completed: false },
  { name: "Get a local SIM card", start_date: Date.today + 136, deadline: Date.today + 150, completed: false },
  { name: "Register to pay tax in Spain", start_date: Date.today + 151, deadline: Date.today + 165, completed: false },
  { name: "Beach rest day with champagne", start_date: Date.today + 166, deadline: Date.today + 180, completed: false }
]

move_to_spain_tasks.each do |task|
  Task.create!(
    name: task[:name], 
    goal: move_to_spain, 
    start_date: task[:start_date], 
    deadline: task[:deadline], 
    completed: task[:completed]
  )
end

# Create the goal "Get a Remote Full Stack Web Dev Job"
get_remote_job = Goal.create!(
  name: "Get a Remote Full Stack Web Dev Job", 
  user: user, 
  deadline: Date.today + 120, # Assuming 4 months for all tasks to be completed
  start_date: Date.today, 
  completed: false
)

# Create tasks associated with the goal "Get a Remote Full Stack Web Dev Job"
get_remote_job_tasks = [
  { name: "Learn React", start_date: Date.today + 11, deadline: Date.today + 30, completed: false },
  { name: "Learn Node.js", start_date: Date.today + 31, deadline: Date.today + 45, completed: false },
  { name: "Learn PostgreSQL", start_date: Date.today + 46, deadline: Date.today + 60, completed: false },
  { name: "Build a portfolio website", start_date: Date.today + 61, deadline: Date.today + 75, completed: false },
  { name: "Create a professional LinkedIn profile", start_date: Date.today + 76, deadline: Date.today + 85, completed: false },
  { name: "Network with industry professionals on LinkedIn", start_date: Date.today + 86, deadline: Date.today + 100, completed: false },
  { name: "Apply for 3 jobs each day", start_date: Date.today + 101, deadline: Date.today + 110, completed: false },
  { name: "Pass at least 3 technical interview simulations", start_date: Date.today + 111, deadline: Date.today + 120, completed: false },
  { name: "Solve 2 coding challenges each day", start_date: Date.today + 11, deadline: Date.today + 120, completed: false },
  { name: "Build 3 small projects to show", start_date: Date.today + 61, deadline: Date.today + 120, completed: false },
  { name: "End Codecademy web course", start_date: Date.today + 11, deadline: Date.today + 30, completed: false },
  { name: "Get product management certificate", start_date: Date.today + 31, deadline: Date.today + 60, completed: false }
]

get_remote_job_tasks.each do |task|
  Task.create!(
    name: task[:name], 
    goal: get_remote_job, 
    start_date: task[:start_date], 
    deadline: task[:deadline], 
    completed: task[:completed]
  )
end

puts 'Seed data created successfully!'
