// $(document).ready(function() {

//     // Get the context of the canvas element we want to select
//     var ctx = document.getElementById("run_time_chart").getContext("2d");

//     var data = {
//         labels: [ "<%== @run_labels.join('", "') %>" ],
//         datasets: [
//             {
//                 label: "My First dataset",
//                 fillColor: "rgba(215, 40, 40,0.2)",
//                 strokeColor: "rgba(215, 40, 40,1)",
//                 pointColor: "rgba(215, 40, 40,1)",
//                 pointStrokeColor: "#fff",
//                 pointHighlightFill: "#fff",
//                 pointHighlightStroke: "rgba(220,220,220,1)",
//                 data: [<%= @run_total_time.join(', ') %>]
//             }
//         ]
//     };

//     var myLineChart = new Chart(ctx).Line(data);


//     var ctx_2 = document.getElementById("run_distance_chart").getContext("2d");

//     var data = {
//         labels: [ "<%== @run_labels.join('", "') %>" ],
//         datasets: [
//             {
//                 label: "My First dataset",
//                 fillColor: "rgba(97, 162, 255,0.2)",
//                 strokeColor: "rgba(97, 162, 255,1)",
//                 pointColor: "rgba(97, 162, 255,1)",
//                 pointStrokeColor: "#fff",
//                 pointHighlightFill: "#fff",
//                 pointHighlightStroke: "rgba(220,220,220,1)",
//                 data: [<%= @run_total_distance.join(', ') %>]
//             }
//         ]
//     };

//     var myLineChart = new Chart(ctx_2).Line(data);


//     var ctx_3 = document.getElementById("run_pace_chart").getContext("2d");

//     var data = {
//         labels: [ "<%== @run_labels.join('", "') %>" ],
//         datasets: [
//             {
//                 label: "My First dataset",
//                 fillColor: "rgba(247, 230, 42,0.2)",
//                 strokeColor: "rgba(247, 230, 42,1)",
//                 pointColor: "rgba(247, 230, 42,1)",
//                 pointStrokeColor: "#fff",
//                 pointHighlightFill: "#fff",
//                 pointHighlightStroke: "rgba(220,220,220,1)",
//                 data: [<%= @run_pace.join(', ') %>]
//             }
//         ]
//     };

//     var myLineChart = new Chart(ctx_3).Line(data);


//     var ctx_4 = document.getElementById("run_steps_chart").getContext("2d");

//     var data = {
//         labels: [ "<%== @run_labels.join('", "') %>" ],
//         datasets: [
//             {
//                 label: "My First dataset",
//                 fillColor: "rgba(255, 164, 4, 0.2)",
//                 strokeColor: "rgba(255, 164, 4, 1)",
//                 pointColor: "rgba(255, 164, 4, 1)",
//                 pointStrokeColor: "#fff",
//                 pointHighlightFill: "#fff",
//                 pointHighlightStroke: "rgba(220,220,220,1)",
//                 data: [<%= @run_steps.join(', ') %>]
//             }
//         ]
//     };

//     var myLineChart = new Chart(ctx_4).Line(data);

// });