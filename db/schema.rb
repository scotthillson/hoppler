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

  create_table "images", force: :cascade do |t|
    t.integer  "tower_id"
    t.datetime "time"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image",      limit: 255
    t.index ["time"], name: "index_images_on_time"
  end

  create_table "location_lookups", force: :cascade do |t|
    t.integer  "rank"
    t.integer  "tower_id"
    t.integer  "location_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", force: :cascade do |t|
    t.string   "state",      limit: 255
    t.string   "city",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",       limit: 255
    t.string   "lat",        limit: 255
    t.string   "lng",        limit: 255
  end

  create_table "towers", force: :cascade do |t|
    t.string   "rid",         limit: 255
    t.string   "city",        limit: 255
    t.string   "state",       limit: 255
    t.string   "sw_lat",      limit: 255
    t.string   "sw_lng",      limit: 255
    t.string   "ne_lat",      limit: 255
    t.string   "ne_lng",      limit: 255
    t.string   "center_lat",  limit: 255
    t.string   "center_lng",  limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "est_sw_lat",  limit: 255
    t.string   "est_sw_lng",  limit: 255
    t.string   "est_ne_lat",  limit: 255
    t.string   "est_ne_lng",  limit: 255
    t.integer  "location_id"
  end

  create_table "uploads", force: :cascade do |t|
    t.string   "url",        limit: 255
    t.string   "note",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
