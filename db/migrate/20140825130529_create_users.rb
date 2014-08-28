class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :psw
      t.string :access_key

      t.timestamps
    end
  end
end
