class TowersController < ApplicationController

  def show
    tower = Tower.find params[:id]
    images = tower.images
    render json: { images: images}
  end

end
