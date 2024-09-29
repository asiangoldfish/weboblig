
let locations = [
    {
        "latitude": 35.7,
        "longitude": 139.6875,
    },
    {
        "latitude": 59.9139,
        "longitude": 10.7522,
    },
    {
        "latitude": 52.52,
        "longitude": 13.4050,
    },
    {
        "latitude": 48.8575,
        "longitude": 2.3514,
    },
    {
        "latitude": 21.0278,
        "longitude": 105.8342,
    },
];

let base_url = "https://api.open-meteo.com/v1/forecast?"
let current_weather = "current_weather=true"

let urls = [];

for (let i = 0; i < 5; i++) {
    urls.push(base_url
        + "latitude=" + locations[i].latitude + "&"
        + "longitude=" + locations[i].longitude + "&"
        + current_weather
    );
}

console.log(urls);

function fetchAPI(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        
        xhr.open("GET", url);
        xhr.send();

        xhr.onload = function() {
            data = JSON.parse(xhr.responseText);
            resolve(data.current_weather);
        }
    });
}

function loadWeather() {
    // Create a row
    let container = document.getElementsByClassName("post");

    // https://stackoverflow.com/a/53111342
    Promise.all(
        urls.map(url => {
            return fetchAPI(url);
        })
    ).then(data => {
        for (let i = 0; i < 5; i++) {
            let children = container[i].childNodes;

            children[3].innerHTML = "Temperature: " + data[i].temperature + " C";
            children[5].innerHTML = "Wind Speed: " + data[i].windspeed + " ms";
            children[7].innerHTML = "Wind Direction: " + data[i].winddirection + " deg";
        }
    }).catch(error => {
        console.log(error);
    })
}

const interval = setInterval(function() {
    loadWeather();
}, 20000);

window.onload = loadWeather;