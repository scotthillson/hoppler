class ImagesController < ApplicationController
  def index
    @images = Tower.first.images
    respond_to do |format|
      format.html{}
      format.json{render json: @images}
    end
  end
end
