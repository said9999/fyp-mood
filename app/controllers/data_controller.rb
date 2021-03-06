

class DataController < ApplicationController
	require 'securerandom'
	require 'prawn'
	require 'prawn/table'

	skip_before_action :verify_authenticity_token
	
	def read
		spane_history = get_data_with_type_and_scale(
		  params[:email], 
		  params[:start], 
		  params[:end], 
		  params[:type]
		)

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

	def sign_up
		name = params[:name]
		email = params[:email]
		psw = params[:psw]

		e = User.find_by(email: email);
		unless (e.nil?)
			render :json => {'valid' => 'no'} 
		else
			hash = SecureRandom.hex
			User.create!(:name => name,
				:email => email,
				:psw => psw,
				:access_key => hash
				)

			render :json => {'valid' => 'yes','email'=>email,'access_key'=>hash}
		end
	end

	def valid_user
		email = params[:email]
		access_key = params[:access_key]

		user = User.find_by(email: email,access_key: access_key)

		unless user.nil?
			render :json => {'valid'=>'yes'}
		else
			render :json => {'valid'=> 'no'}
		end
	end

	def download
	  #send_file "/Users/Sai/Documents/workspace/RubySpace/mood/public/pam01242015.pdf"
	  email = params[:email]
	  type = params[:type]

	  history = get_data_with_type(email, type)

	  path = generate_PDF(history,type)

	  render :json => {'path' => path}
	end

	def get_data_with_type(email, type)
	  History.where(email:email,test_type: type).order("time DESC")
	end

	def get_data_with_type_and_scale(email, start_time, ending_time, type)
	  return get_data_with_type(email, type) if start_time.empty? && ending_time.empty?

	  begin 
	  	if start_time.empty?
	  	  end_date = Date.strptime(ending_time, "%Y-%m-%d")

	  	  return History.where(
		    "email = ? AND test_type = ? AND time <= ?",
		    email,
		    type, 
		    end_date
		    )
		    .order("time DESC")
		elsif ending_time.empty?
		  st_date = Date.strptime(start_time, "%Y-%m-%d")

		  return History.where(
		    "email = ? AND test_type = ? AND time >= ?",
		    email,
		    type, 
		    st_date, 
		    )
		    .order("time DESC")
		else
		  st_date = Date.strptime(start_time, "%Y-%m-%d")
		  end_date = Date.strptime(ending_time, "%Y-%m-%d")
		  History.where(
		  "email = ? AND test_type = ? AND time >= ? AND time <= ?",
		  email,
		  type, 
		  st_date, 
		  end_date
		  )
		  .order("time DESC")
		end
	  rescue
	  	st_date = Date.strptime(start_time, "%Y-%m-%d")
		end_date = Date.strptime(ending_time, "%Y-%m-%d")
	  	
	  	return  History.where(
		  "email = ? AND test_type = ? AND time >= ? AND time <= ?",
		  email,
		  type, 
		  st_date, 
		  end_date
		  )
		  .order("time DESC")
	  end
	end

	def generate_PDF(history,type)
	  typeHeaderMap = {
	  	pam: ["grade","Date"],
	  	sam: ["Pleasure", "Arousal", "Dominance","Date"],
	  	panas: ["PA","NA","Date"],
	  	pad: ["Pleasure", "Arousal", "Dominance","Date"]

	  }
	  puts 'prepare to render'
	  pdf = Prawn::Document.new

	  table = []
	  headers = typeHeaderMap[type.to_sym]
	  no_cols = headers.length

	  factor = (type == 'sam') ? 10 : 100
	  
	  table.push(headers)
	  history.each do |row|
	  	tuple = []
	  	grade = row['score'].to_i

	  	(no_cols - 1).times do
	  		tuple.unshift(grade % factor)
	  		grade = grade / factor
	  	end

	  	tuple.push(row['time'])
	  	
	  	table.push(tuple)
	  end
	  
	  pdf.table(table, header: true)
	  name = type + Time.now.strftime("%m%d%Y")
	  path = "public/#{name}.pdf"
	  file_path = Rails.root.join('public',"#{name}.pdf")
	  pdf.render_file(file_path)
	  
	  return path
	end
end
