class ImagesController < ApplicationController

  def index
    @images = Tower.first.images
    respond_to do |format|
      format.html{}
    end
  end

  def manifest
    render json: Image.manifest
  end

end
