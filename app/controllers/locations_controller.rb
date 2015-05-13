class LocationsController < ApplicationController

  def index
    @locations = Location.all
    respond_to do |format|
      format.html{}
      format.json{render json: @locations}
    end
  end

  def show
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

end
