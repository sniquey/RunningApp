require 'test_helper'

class LevelsControllerTest < ActionController::TestCase
  setup do
    @level = levels(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:levels)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create level" do
    assert_difference('Level.count') do
      post :create, level: { coin_freq: @level.coin_freq, coin_threshold: @level.coin_threshold, description: @level.description, image: @level.image, mushroom_freq: @level.mushroom_freq, name: @level.name, turtle_freq: @level.turtle_freq }
    end

    assert_redirected_to level_path(assigns(:level))
  end

  test "should show level" do
    get :show, id: @level
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @level
    assert_response :success
  end

  test "should update level" do
    patch :update, id: @level, level: { coin_freq: @level.coin_freq, coin_threshold: @level.coin_threshold, description: @level.description, image: @level.image, mushroom_freq: @level.mushroom_freq, name: @level.name, turtle_freq: @level.turtle_freq }
    assert_redirected_to level_path(assigns(:level))
  end

  test "should destroy level" do
    assert_difference('Level.count', -1) do
      delete :destroy, id: @level
    end

    assert_redirected_to levels_path
  end
end