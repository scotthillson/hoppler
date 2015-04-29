class TowersController < ApplicationController

  def index
    @towers = Tower.all
    respond_to do |format|
      format.html{}
      format.json{render json: @towers}
    end
  end

  def show
    params[:images] ||= 20
    @tower = Tower.find params[:id]
    @images = @tower.images.order(:time).last(params[:images].to_i)
    respond_to do |format|
      format.html{}
      format.json{render json: @images}
    end
  end

end
