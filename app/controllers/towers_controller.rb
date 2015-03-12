class TowersController < ApplicationController

  def index
    @towers = Tower.all
    respond_to do |format|
      format.html{}
      format.json{render json: @towers}
    end
  end

  def show
    @tower = Tower.find params[:id]
    @images = @tower.images.last(30)
    respond_to do |format|
      format.html{}
      format.json{render json: @images}
    end
  end

end
