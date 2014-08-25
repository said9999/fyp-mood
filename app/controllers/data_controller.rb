class DataController < ApplicationController
	def panas
		email = params[:email]
		panas_history = History.where(email:email,test_type:'panas')

		render :json => {'history' => panas_history}
	end

	def pam

	end

	def spane

	end

end
