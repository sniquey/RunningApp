# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141027001442) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "levels", force: true do |t|
    t.float    "coin_freq"
    t.float    "mushroom_freq"
    t.float    "turtle_freq"
    t.string   "name"
    t.text     "description"
    t.integer  "coin_threshold"
    t.text     "image"
    t.string   "theme"
    t.string   "type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", force: true do |t|
    t.float    "latitude"
    t.float    "longitude"
    t.float    "distance_from_last"
    t.integer  "run_id"
    t.boolean  "coin"
    t.float    "cumulative_distance"
    t.boolean  "mushroom"
    t.boolean  "turtle"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "runs", force: true do |t|
    t.float    "total_coins"
    t.float    "calories"
    t.integer  "user_id"
    t.float    "total_mushrooms"
    t.float    "total_turtles"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "coin_counter"
    t.integer  "mushroom_counter"
    t.integer  "turtle_counter"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "password_digest"
    t.text     "avatar"
    t.float    "height"
    t.date     "dob"
    t.integer  "runs_per_week"
    t.integer  "total_lives"
    t.integer  "level_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
    t.string   "picture"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
