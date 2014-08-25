namespace :db do 
	desc 'Erase and fill user db'
	task :populate => :environment do
		require 'faker'

		Rake::Task['db:reset'].invoke

		#create first user userdata
		User.create!(:email=>'jyx@gmail.com', 
			:name => 'piange',
			:psw => '91091699'
			)

		#create dummy data for first user
		type = ['panas','pam','spane']
		for i in 1..200
			History.create!(:email=>'jyx@gmail.com', 
				:score => rand(50)+1,
				:test_type => type[rand(3)],
				:user_id => 1,
				:time => i.days.ago.to_date
				)
		end
	end
end