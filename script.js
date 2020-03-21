var key = "f15fc9d302b52500afaf375cf7812bcf";
var url = "https://api.openweathermap.org/data/2.5/forecast";

$(document).on('click', '#search-button', function() {
    getWeather();
    storeSearch();
})

function getWeather() {

    var city = document.getElementById('search-city').value;
    $.ajax ({
        url: url,
        dataType: "json",
        type: "GET",
        data: {
          q: city,
          appid: key,
          units: "imperial",
          cnt: "5"
        },
        success: function(data) {
          console.log('Received data:', data)
          var weatherForcast = "";
          weatherForcast += "<h2>" + data.city.name + "</h2>";
          $.each(data.list, function(index, val) {
              weatherForcast += "<p>"
              weatherForcast += "<b>Day " + index + "</b>: "
              weatherForcast += val.main.temp + "&degF |"
              weatherForcast += ' wind speed: ' + val.wind.speed + 'mph |'
              weatherForcast += ' humidity: ' + val.main.humidity + '%'
              weatherForcast += "<span> | " + val.weather[0].description + "</span>";
              weatherForcast += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
              weatherForcast += "</p>"
          });
          $("#showWeatherForcast").html(weatherForcast);
          
        }
      });

};

function storeSearch() {

    var city = document.getElementById('search-city').value;
    localStorage.setItem('cityName', city);
    $('<button>', { id: 'last-search'}).appendTo('#previous-search');
    document.getElementById('last-search').innerHTML = localStorage.getItem('cityName');

};

