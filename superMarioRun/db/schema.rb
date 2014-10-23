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

ActiveRecord::Schema.define(version: 20141023043824) do

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
    t.float    "cummulative_distance"
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
  end

  create_table "users", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.text     "email"
    t.string   "password_digest"
    t.text     "avatar"
    t.float    "height"
    t.date     "dob"
    t.integer  "runs_per_week"
    t.integer  "total_lives"
    t.integer  "level_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
