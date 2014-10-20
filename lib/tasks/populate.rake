namespace :db do 
	desc 'Erase and fill user db'
	task :populate => :environment do
		require 'faker'

		Rake::Task['db:reset'].invoke

		#create first user userdata
		User.create!(:email=>'jyx@gmail.com', 
			:name => 'piange',
			:psw => '91091699',
			:access_key => ''
			)

		#create dummy data for first user
		type = ['panas','pam','spane']
		for i in 1..200
			email = 'jyx@gmail.com'
			my_class = type[rand(3)]
			score = 0
			if (my_class == 'panas')
				score = rand(1516)
				
				while(score/100 > 15 || score%100 > 15 || score/100 < 5 || score % 100 < 5)
					score = rand(1516)
				end
			end

			if (my_class == 'pam')
				score = rand(16)+1
			end


			History.create!(:email=>email, 
				:score => score,
				:test_type => my_class,
				:user_id => 1,
				:time => i.days.ago.to_date
				)
		end
	end
end