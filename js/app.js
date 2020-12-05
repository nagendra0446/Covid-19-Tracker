$(document).ready(function () {
    // Get JSON data from url
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
      var states = [];
      var confirmed = [];
      var recovered = [];
      var deaths = [];
  
      var total_confirmed;
      var delta_confirmed;
      var total_recovered;
      var delta_recovered;
      var total_deaths;
      var delta_deaths;
  
      // Take the first element in statewise array and add the objects values into the above variables
      total_confirmed = data.statewise[0].confirmed;
      delta_confirmed = data.statewise[0].deltaconfirmed
      total_recovered = data.statewise[0].recovered;
      delta_recovered = data.statewise[0].deltarecovered
      total_deaths = data.statewise[0].deaths;
      delta_deaths = data.statewise[0].deltadeaths
  
      // The each loop select a single statewise array element
      // Take the data in that array and add it to variables
      $.each(data.statewise, function (id, obj) {
        states.push(obj.state);
        confirmed.push(obj.confirmed);
        recovered.push(obj.recovered);
        deaths.push(obj.deaths);
      });
  
      // Remove the first element in the states, confirmed, recovered, and deaths as that is the total value
      states.shift();
      confirmed.shift();
      recovered.shift();
      deaths.shift();
  
      // console.log(confirmed);
      $("#total_confirmed").append(Number(total_confirmed).toLocaleString('en-IN'));
      $("#delta_confirmed").append(Number(delta_confirmed).toLocaleString('en-IN'));
      $("#total_recovered").append(Number(total_recovered).toLocaleString('en-IN'));
      $("#delta_recovered").append(Number(delta_recovered).toLocaleString('en-IN'));
      $("#total_deaths").append(Number(total_deaths).toLocaleString('en-IN'));
      $("#delta_deaths").append(Number(delta_deaths).toLocaleString('en-IN'));

      // Chart initialization
      var myChart = document.getElementById("myChart1").getContext("2d");
      var chart = new Chart(myChart, {
        type: "bar",
        data: {
          labels: states,
          datasets: [
            {
              label: "Confirmed Cases",
              data: confirmed,
              backgroundColor: "#16697a",
              minBarLength: 100,
            },
          ],
        },
      });

      var myChart = document.getElementById("myChart2").getContext("2d");
      var chart = new Chart(myChart, {
        type: "bar",
        data: {
          labels: states,
          datasets: [
            {
              label: "Recovered",
              data: recovered,
              backgroundColor: "#2ecc71",
              minBarLength: 100,
            },
          ],
        },
      });

      var myChart = document.getElementById("myChart3").getContext("2d");
      var chart = new Chart(myChart, {
        type: "bar",
        data: {
          labels: states,
          datasets: [
            {
              label: "Deceased",
              data: deaths,
              backgroundColor: "#e74c3c",
              minBarLength: 100,
            },
          ],
        },
      });
    });
  });