class RunsController < ApplicationController
  before_action :set_run, only: [:show, :edit, :update, :destroy]
  def testing
  end

  def index
    show_runs = []
    current_user.runs.each do |run|
      if run.locations.length > 0
        show_runs.push(run)
      end
    end
    show_runs.reverse!

    @runs = show_runs        #current_user.runs  #Run.all
    # raise 'params'

  end

  def show

  end

  # GET /runs/new
  def new
    @run = Run.new
    @run.user_id = current_user.id
    @run.save
    # raise 'params'
        
  end

  # GET /runs/1/edit
  def edit
  end

  # POST /runs
  # POST /runs.json
  def create
    @run = Run.new(run_params)

    respond_to do |format|
      if @run.save
        format.html { redirect_to @run, notice: 'Run was successfully created.' }
        format.json { render :show, status: :created, location: @run }
      else
        format.html { render :new }
        format.json { render json: @run.errors, status: :unprocessable_entity }
      end
    end
    # redirect_to runs_path
  end

  def step_update ## UPDATING THE USER'S LAST RUN'S STEPS
    @run = current_user.runs.last       # fnding the last run the user made
    @run.steps = params[:step_count]    # pulling out the step_count as a params
    @run.save  
    render :json => {:status => 'ok'}
    # binding.pry
  end

  # PATCH/PUT /runs/1
  # PATCH/PUT /runs/1.json
  def update
    respond_to do |format|
      if @run.update(run_params)
        format.html { redirect_to @run, notice: 'Run was successfully updated.' }
        format.json { render :show, status: :ok, location: @run }
      else
        format.html { render :edit }
        format.json { render json: @run.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /runs/1
  # DELETE /runs/1.json
  def destroy
    @run.destroy
    respond_to do |format|
      format.html { redirect_to runs_url, notice: 'Run was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_run
      @run = Run.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def run_params
      params.require(:run).permit(:total_coins, :steps, :calories, :user_id, :total_mushrooms, :total_turtles, :start_time, :end_time)
    end
end
