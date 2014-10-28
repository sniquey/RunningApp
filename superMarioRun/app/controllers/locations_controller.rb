class LocationsController < ApplicationController
  before_action :set_location, only: [:show, :edit, :update, :destroy]


  def index
    @locations = current_user.runs.last.locations
    render :json => @locations
  end

  def show
  end

  def new
    @location = Location.new
  end

  def edit
  end

  def create
    @location = Location.new(location_params)   
    @location.run_id = current_user.runs.last.id
    @location.distance_from_last = @location.calcDistance
    @location.cumulative_distance = @location.calcCumulativeDistance ## current_user.runs.last.locations.last
    @location.coin = @location.coinsPresent
    @location.mushroom = @location.mushroomPresent
    @location.turtle = @location.turtlePresent

    respond_to do |format|
      if @location.save
        format.html { redirect_to @location, notice: 'Location was successfully created.' }
        #format.json { render :show, status: :created, location: @location }
        format.json { render :json => @location.run.locations }
        # render :json => @run
      else
        format.html { render :new }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /locations/1
  # PATCH/PUT /locations/1.json
  def update
    respond_to do |format|
      if @location.update(location_params)
        format.html { redirect_to @location, notice: 'Location was successfully updated.' }
        format.json { render :show, status: :ok, location: @location }
      else
        format.html { render :edit }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /locations/1
  # DELETE /locations/1.json
  def destroy
    Location.each do |location|
      location.destroy
    end

    # @location.destroy
    respond_to do |format|
      format.html { redirect_to locations_url, notice: 'Location was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_location
      @location = Location.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def location_params
      params.require(:location).permit(:latitude, :longitude, :distance_from_last, :run_id, :coin, :mushroom, :turtle, :cummulative_distance)
    end
end
