
// // Position Variables
// var x = 0;
// var y = 0;
// var z = 0;
// var time;

// // Declaring an array which all the accelerometer information will sit
// // Will need to map these items later (x, y and z values)
// var accel_array = [];
// var accel_time = [];
// var accel_ax = [];
// var accel_ay = [];
// var accel_az = [];
// var acceleration_squared;
// var accel_squared = [];

// var step_counter = 0;
// var running_average;
// var deviation_from_average;
// var deviation_array = [];
// var comparison_value = 3;

// var pedometer = function() {
//       // Device motion stuff  

//     if (window.DeviceMotionEvent==undefined) {
//         document.getElementById("no").style.display="block";
//         document.getElementById("yes").style.display="none";

//     } else {
         
//     var output_xyz ;
//         // Print out information about the accelerometer
//         window.ondevicemotion = function(event) {
//                 ax = event.accelerationIncludingGravity.x;
//                 ay = event.accelerationIncludingGravity.y;
//                 az = event.accelerationIncludingGravity.z;
//                 output_xyz = "<h5> x: " + event.accelerationIncludingGravity.x.toFixed(1) + " y: " + event.accelerationIncludingGravity.y.toFixed(1) + " z: " + event.accelerationIncludingGravity.z.toFixed(1) + "</h5>";
                
//                 accel_array.push({
//                     'ax': event.accelerationIncludingGravity.x,
//                     'ay': event.accelerationIncludingGravity.y,
//                     'az': event.accelerationIncludingGravity.z,
//                     'datetime': new Date()
//                 });

//                 // Calculation of sqrt (x^2 + y^2 + z^2) to find absolute value of acceleration
//                 acceleration_squared = Math.sqrt( (event.accelerationIncludingGravity.x)*(event.accelerationIncludingGravity.x) + (event.accelerationIncludingGravity.y)*(event.accelerationIncludingGravity.y) + (event.accelerationIncludingGravity.z)*(event.accelerationIncludingGravity.z) ).toFixed(3) ;

//                 // Adds to front of an array
//                 accel_squared.unshift( acceleration_squared );

//                 // Find the exponential moving average as a value
//                 running_average = 10  ;             //(accel_squared);

//                 // Deviation from the average
//                 deviation_from_average = Math.abs(acceleration_squared - running_average);
//                 deviation_array.unshift(deviation_from_average);

//                 if ((comparison_value == 0.25) && (deviation_from_average <= comparison_value)) {
//                     comparison_value = 3;
//                     step_counter += 1;
//                 } else if ((comparison_value == 3) && (deviation_from_average >= comparison_value)) {
//                     comparison_value = 0.25;
//                     step_counter += 1;
//                 } 

//                 // TODO - figure out how to incorporate this array of accel_squared to read pedometer data
//                 // Need to look for a max, min and brushing through the running_average value

//         };


//     } 
//         // Printing information on screen every 0.5 seconds
//         setInterval(function() {
//             // $('#objectPrint').html(JSON.stringify(accel_array));
//             $('#outputAcc').html(output_xyz, new Date());
//             // $('#objectPrint').html(accel_squared);
//             $('#objectPrint').html( JSON.stringify(deviation_array));
//             $('.step_counter').html(step_counter);
//             }, 500);
// };

// // pedometer();