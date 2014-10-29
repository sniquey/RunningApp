// Position Variables
var x = 0;
var y = 0;
var z = 0;
var time;

// Declaring A Ton Of Variables - Woot!
var accel_array = [];
var accel_time = [];
var accel_ax = [];
var accel_ay = [];
var accel_az = [];
var acceleration_squared;
var accel_squared = [];

var step_counter = 0;
var running_average;
var high_comparison;
var low_comparison; 
var deviation_from_average;
var deviation_array = [];
var comparison_value;
var sum;
var temp_time = new Date(); 
var old_temp_time = new Date();
var time_for_step;
var pace_per_2_seconds;
var stride_length;
var distance_of_steps = 0;
var last_step_counter = 0;
var current_user = {
    height: 1.8
};
var per_stride_length;


var pedometer = function(){

      // Device motion stuff  
    if (window.DeviceMotionEvent==undefined) {
        document.getElementById("no").style.display="block";
        document.getElementById("yes").style.display="none";

    } else {
         
    var output_xyz ;
        // Print out information about the accelerometer
        window.ondevicemotion = function(event) {
                ax = event.accelerationIncludingGravity.x;
                ay = event.accelerationIncludingGravity.y;
                az = event.accelerationIncludingGravity.z;
                output_xyz = "<h5> x: " + event.accelerationIncludingGravity.x.toFixed(1) + " y: " + event.accelerationIncludingGravity.y.toFixed(1) + " z: " + event.accelerationIncludingGravity.z.toFixed(1) + "</h5>";
                
                accel_array.push({
                    'ax': event.accelerationIncludingGravity.x,
                    'ay': event.accelerationIncludingGravity.y,
                    'az': event.accelerationIncludingGravity.z,
                    'datetime': new Date()
                });

                // Calculation of sqrt (x^2 + y^2 + z^2) to find absolute value of acceleration
                acceleration_squared = Math.sqrt( (event.accelerationIncludingGravity.x)*(event.accelerationIncludingGravity.x) + (event.accelerationIncludingGravity.y)*(event.accelerationIncludingGravity.y) + (event.accelerationIncludingGravity.z)*(event.accelerationIncludingGravity.z) ).toFixed(3) ;

                // Adds to front of an array
                accel_squared.unshift( acceleration_squared );
                accel_squared = accel_squared.sort();

                // TODO - Trying to find the running average, high comparison and low comparison across a sample range to keep it relevant with the running speed
                // if (accel_squared.length == 50) {
                //     sum = 0;
                //     for (var i =0; i < accel_squared.length; i++) {
                //         sum += accel_squared[i];
                //     }

                //     running_average = sum / 50;

                //     accel_squared_sorted = accel_squared.sort();

                //     high_comparison = accel_squared_sorted[50*0.75];
                //     low_comparison = accel_squared_sorted[50*0.25];
                //     accel_squared = [];
                // }

                // TODO - Find the exponential moving average as a value
                running_average = 10  ;             //(accel_squared);

                // Deviation from the average
                deviation_from_average = Math.abs(acceleration_squared - running_average);
                deviation_array.unshift(deviation_from_average);

                // Comparison value being set if there is no calculations happening
                if (comparison_value != +comparison_value) {
                    comparison_value = 3;
                    low_comparison = 0.25;
                    high_comparison = 3;
                }


                // Find the stride length per frequency
                var find_stride_length = function() {
                    if (pace_per_2_seconds <= 2) {
                         per_stride_length = current_user.height/5;
                    } else if (pace_per_2_seconds <= 3) {
                         per_stride_length = current_user.height/4;
                    } else if (pace_per_2_seconds <= 4) {
                         per_stride_length = current_user.height/3;
                    } else if (pace_per_2_seconds <= 5) {
                         per_stride_length = current_user.height/2;
                    } else if (pace_per_2_seconds <= 6) {
                         per_stride_length = current_user.height/1.2;
                    } else if (pace_per_2_seconds <= 8) {
                         per_stride_length = current_user.height;
                    } else if (pace_per_2_seconds > 8) {
                         per_stride_length = current_user.height * 1.2;
                    }
                };


                // Calculating frequency of each pace per 2 seconds 
                var paceMeasurement = function() {
                    temp_time = new Date();
                    time_for_step = temp_time - old_temp_time;
                    if (time_for_step < 2000) {
                        return; // 2 seconds haven't elapsed yet so don't calculate.
                    } else {
                        old_temp_time = temp_time;
                        pace_per_2_seconds = (step_counter - last_step_counter)/(time_for_step/1000); // Finds the number of steps in 2 seconds
                        last_step_counter = step_counter;

                        find_stride_length();

                        stride_length = pace_per_2_seconds * per_stride_length;
                        distance_of_steps += stride_length;
                    }
                };



                // Calculating a step
                if ((comparison_value == low_comparison) && (deviation_from_average <= comparison_value)) {
                    comparison_value = high_comparison;
                    step_counter += 1;

                    paceMeasurement();
     
                } else if ((comparison_value == high_comparison) && (deviation_from_average >= comparison_value)) {
                    comparison_value = low_comparison;
                    step_counter += 1;

                    paceMeasurement(); 
                } 

        };

    } 
        
    // Printing information on screen every 0.5 seconds
    setInterval(function() {
        // $('#objectPrint').html(JSON.stringify(accel_array));
        // $('#outputAcc').html(output_xyz);
        // $('#objectPrint').html(accel_squared);
        // $('#objectPrint').html( JSON.stringify(deviation_array));

        // var step_counter_html = '<h4> Step counter: </h4> <h4>' + step_counter.toFixed(0) + ' steps </h4>';
        // $('#step_counter').html(step_counter_html);

        // $('#distance_of_steps').html(distance_of_steps);
    }, 500);

        // Printing the step counter to the screen
        var step_counter_html = '<h4> Step counter: </h4> <h4>' + step_counter.toFixed(0) + ' steps </h4>';
        // $('#step_counter').html(step_counter_html);

        // Posting the step counter to the runs database
        $.ajax('/runs', {
            type: 'POST',
            dataType: 'json',
            data: {
                "run[steps]":step_counter
            }
        });

};