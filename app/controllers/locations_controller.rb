class LocationsController < ApplicationController
  before_action :get_location, only: [:show, :point]

  def index
    @locations = Location.all
    respond_to do |format|
      format.html{}
      format.json{render json: @locations}
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        render json: @location.towers
      end
    end
  end

  def master
    render json: Tower.where('sw_lat IS NOT NULL OR est_sw_lat IS NOT NULL')
  end

  def point
    render json: @location
  end

  def create
  end

  def new
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def get_location
    @location = Location.find_by_name params[:id]
  end

end
