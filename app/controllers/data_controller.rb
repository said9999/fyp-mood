class DataController < ApplicationController
	def panas
		email = params[:email]
		panas_history = History.where(email:email,test_type:'panas')

		render :json => {'history' => panas_history}
	end

	def pam
		email = params[:email]
		pam_history = History.where(email:email,test_type:'pam')

		render :json => {'history' => pam_history}
	end

	def spane
		email = params[:email]
		spane_history = History.where(email:email,test_type:'spane')

		render :json => {'history' => spane_history}
	end

end
