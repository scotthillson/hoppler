class TowersController < ApplicationController

  def show
    tower = Tower.find params[:id]
    @images = tower.images
    respond_to do |format|
      format.html{}
      format.json{render json: @images}
    end
  end

end
