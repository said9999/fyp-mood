class DataController < ApplicationController
	def read
		email = params[:email]
		type = params[:type]

		spane_history = History.where(email:email,test_type: type).order("time DESC")

		render :json => {'history' => spane_history}
	end

	def update
		mail_addr = params[:email]
		score = params[:total_score]
		type = params[:type]

		user = User.find_by(email: mail_addr)
		record = user.histories.find_by(test_type: type,time: Time.now.to_date)
		
		#override the score for today if a record already exists
		if record.nil?
			user.histories.create(:email => mail_addr, 
				:score=>score, 
				:test_type=>type, 
				:time=>Time.now)
		else
			record['score'] = score
			record.save
		end

		render status: 200,json: {'msg' => 'success'}
	end

end
