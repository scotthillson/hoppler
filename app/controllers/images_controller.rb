class ImagesController < ApplicationController

  def index
    @images = Tower.first.images
    respond_to do |format|
      format.html{}
    end
  end

end
