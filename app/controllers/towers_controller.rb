class TowersController < ApplicationController
  
  before_action :tower_params, only: [:create,:update]

  def index
    @towers = Tower.all
    respond_to do |format|
      format.html
      format.json { render json: @towers }
    end
  end

  def show
    params[:images] ||= 20
    images = Image.where(tower_id:params[:id]).last(1000).order(:time).last(params[:images].to_i)
    render json: images
  end

  #def new
  #  @tower = Tower.new
  #end

  #def create
  #  @tower = Tower.new(tower_params)
  #  if @tower.save
  #    redirect_to towers_path
  #  else
  #    redirect_to :new
  #  end
  #end

  def update
    @tower = Tower.find params[:id]
    @tower.update(tower_params)
    @tower.save
    redirect_to towers_path
  end

  def destroy
  end

  private

  def tower_params
    params.require(:tower).permit(:rid,:city,:state,:sw_lat,:sw_lng,:ne_lat,:ne_lng,:center_lat,:center_lng,:location_id)
  end

end
