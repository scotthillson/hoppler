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

ActiveRecord::Schema.define(version: 20151014004603) do

  create_table "images", force: true do |t|
    t.integer  "tower_id"
    t.datetime "time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
  end

  add_index "images", ["time"], name: "index_images_on_time"

  create_table "location_lookups", force: true do |t|
    t.integer  "rank"
    t.integer  "tower_id"
    t.integer  "location_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", force: true do |t|
    t.string   "state"
    t.string   "city"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "lat"
    t.string   "lng"
  end

  create_table "towers", force: true do |t|
    t.string   "rid"
    t.string   "city"
    t.string   "state"
    t.string   "sw_lat"
    t.string   "sw_lng"
    t.string   "ne_lat"
    t.string   "ne_lng"
    t.string   "center_lat"
    t.string   "center_lng"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "est_sw_lat"
    t.string   "est_sw_lng"
    t.string   "est_ne_lat"
    t.string   "est_ne_lng"
    t.integer  "location_id"
  end

  create_table "uploads", force: true do |t|
    t.string   "url"
    t.string   "note"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
