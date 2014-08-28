

class DataController < ApplicationController
	require 'securerandom'

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

	def sign_in
		puts "sign in!!!!"
		email = params[:email]
		psw = params[:psw]

		usr = User.find_by(email: email, psw: psw)

		unless usr.nil?
			puts "not nil"
			hash = SecureRandom.hex
			puts hash
			usr.access_key = hash
			usr.save
			
			puts"going to render"
			render :json => {'valid'=>'yes','email'=>email,'access_key'=>hash}
		else
			render :json => {'valid'=>'no'}
		end 
	end

end
