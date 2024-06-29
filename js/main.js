document.addEventListener('DOMContentLoaded', function() {
    fetch('city_coordinates.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').slice(1);
            const selectElement = document.querySelector('#city');

            lines.forEach(line => {
                const [latitude, longitude, city, country] = line.split(',');
                if (city.trim() && country.trim()) {
                    const option = document.createElement('option');
                    option.value = `${latitude.trim()},${longitude.trim()}`;
                    option.textContent = `${city.trim()}, ${country.trim()}`;
                    selectElement.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Error loading or parsing CSV:', error);
        });

    const selectElement = document.querySelector('#city');
    selectElement.addEventListener('change', function() {
        const [lat, lon] = this.value.split(',');
        fetchWeatherData(lon, lat);
    });
});

function fetchWeatherData(lon, lat) {
    const apiUrl = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;
    //Create a loading spinner
    const weatherDetails = document.getElementById('weatherDetails');
    if (weatherDetails) {
        weatherDetails.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            console.log(response);
        })
        .then(data => {
            displayWeatherData(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
        });
}

function displayWeatherData(data) {
    const weatherDetails = document.getElementById('weatherDetails');
    if (weatherDetails) {
        let htmlContent = '<div class="row">';
      

        data.dataseries.forEach(item => {
           // Convert date from YYYYMMDD to Date object
            const year = item.date.toString().substring(0, 4);
            const month = item.date.toString().substring(4, 6);
            const day = item.date.toString().substring(6, 8);
            const date = new Date(`${year}-${month}-${day}`);

    // Format the date as "Month, day"
            const options = { month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);

    htmlContent += `
        <div class="col-sm-12 col-md-2 mb-4"><!-- Bootstrap responsive columns -->
            <div class="card custom-blue">
            <div class="card-body">
            <h5 class="card-title">${formattedDate}</h5>
            <img src ="./images/${item.weather}.png" alt="${item.weather}" class="img-fluid">
            <p class="card-text"> ${item.weather}</p>
            <p class="card-text">H: ${item.temp2m.max}°C</p>
            <p class="card-text">L: ${item.temp2m.min}°C</p>
           
        </div>
        </div>
        </div>
    `;
        });
        htmlContent += '</div>';// Close the row
        weatherDetails.innerHTML = htmlContent;
    }
}