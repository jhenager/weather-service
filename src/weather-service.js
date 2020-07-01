function showElements(response) {
  $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
  $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
  $('.showErrors').text("");
}

function showError(error) {
  $('.showErrors').text(`There was an issue: ${error}.`);
  $('.showHumidity').text("");
  $('.showTemp').text("");
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    async function asyncApiCall() {
      try {
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}');
        if (!response.ok) {
          showError(response.statusText);
        } else {
          const jsonifiedResponse = await response.json();
          showElements(jsonifiedResponse);
        }
      } catch(error) {
        console.log(error);
      }
    }
    asyncApiCall();
  });
});