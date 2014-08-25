class CreateHistories < ActiveRecord::Migration
  def change
    create_table :histories do |t|
      t.string :email
      t.float :score
      t.string :test_type
      t.date :time
      t.references :user, index: true

      t.timestamps
    end
  end
end
