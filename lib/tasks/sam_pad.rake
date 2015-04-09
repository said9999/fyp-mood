namespace :db do 
    desc 'Erase and fill user db'
    task :sam_pad => :environment do
        require 'faker'

        #create dummy data for first user
        type = ['pad','sam']
        for i in 1..200
            email = 'jyx@gmail.com'
            my_class = type[rand(2)]
            score = 0
            if (my_class == 'pad')
                score = rand(101011)
                
                while(score/10000 > 10 || (score/100).floor%100 > 10 || score % 100 > 10 || score/10000 == 0 || (score/100).floor%100 == 0 || score % 100 == 0)
                    score = rand(101011)
                end
            end

            if (my_class == 'sam')
                score = rand(556)
                while(score/100 > 5 || (score/10).floor%10 > 5 || score % 10 > 5 || score/100 == 0 || (score/10).floor%10 == 0 || score % 10 == 0)
                    score = rand(556)
                end
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