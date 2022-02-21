
import { getWeatherByCity } from './appService.js';
import { mapListToDOMElements } from './DOMActions.js';

class WeatherApp {
    constructor() {
        this.viewElems = {};
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

    handleSubmit = (event) => {
        if (event.type === 'click' || event.key === 'Enter'){ 
            // this.fadeInOut();
            let query = this.viewElems.searchInput.value;
            getWeatherByCity(query).then(data => {
                this.displayWeatherData(data);            
            });
            this.switchView();
        }
    }

    fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
        } else {
            this.viewElems.mainContainer.style.opacity = '1';
        }
    }

    switchView = () => {
        if (this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none';
            this.viewElems.weatherForecastView.style.display = 'block';
        } else {
            this.viewElems.weatherSearchView.style.display = 'flex';
            this.viewElems.weatherForecastView.style.display = 'none';
        }
    }

    returnToSearch = () => {
        this.fadeInOut();
        setTimeout( () => {
            this.switchView();
            this.fadeInOut();
        }, 500);
    }

    displayWeatherData = data => {
        const weather = data.consolidated_weather[0];
    
        this.viewElems.weatherCity.innerText = data.title;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/png/64/${weather.weather_state_abbr}.png`;
        this.viewElems.weatherIcon.alt = weather.weather_state_name;
        const currentTemp = weather.the_temp.toFixed(2);
        const maxTemp = weather.max_temp.toFixed(2);
        const minTemp = weather.min_temp.toFixed(2);
    
        this.viewElems.weatherCurrentTemp.innerText = `Current temperature is: ${currentTemp}°C`;
        this.viewElems.weatherMaxTemp.innerText = `Max temperature is: ${maxTemp}°C`;
        this.viewElems.weatherMinTemp.innerText = `Min temperature is: ${minTemp}°C`;
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());


// const viewElems = {};

// const getElemDOM = id => {
//     return document.getElementById(id);
// }

// const connectHTMLElemens = () => {
//     viewElems.weatherSearchView = getElemDOM("weatherSearchView");
//     viewElems.mainContainer = getElemDOM("mainContainer");
//     viewElems.weatherForecastView = getElemDOM("weatherForecastView");
    
//     viewElems.searchInput = getElemDOM("searchInput");
//     viewElems.searchButton = getElemDOM("searchButton");
//     viewElems.returnToSearchBtn = getElemDOM("returnToSearchBtn");
//     viewElems.weatherCity = getElemDOM("weatherCity");
//     viewElems.weatherIcon = getElemDOM("weatherIcon");
//     viewElems.weatherCurrentTemp = getElemDOM("weatherCurrentTemp");
//     viewElems.weatherMaxTemp = getElemDOM("weatherMaxTemp");
//     viewElems.weatherMinTemp = getElemDOM("weatherMinTemp");
// }


// const setupListeners = () => {
//     viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
//     viewElems.searchButton.addEventListener('click', onClickSubmit);
//     viewElems.returnToSearchBtn.addEventListener('click', returnToSearch);
// }

// const initializeApp = () => {
//     connectHTMLElemens();
//     setupListeners();
// }

// const onClickSubmit = () => {
//     returnToSearch();
//     let query = viewElems.searchInput.value;
//     console.log("hello");
//     getWeatherByCity(query).then(data => {
//         console.log("hello1");
//         console.log(data);
//         displayWeatherData(data);
//         // fadeInOut();
//         // switchView();
//     });
// };

// const onEnterSubmit = event => {
//     if (event.key === 'Enter') {
//         returnToSearch();
//         let query = viewElems.searchInput.value;
//         getWeatherByCity(query).then(data => {
//             console.log("hello1");
//             displayWeatherData(data);
//             console.log(data);
//         });
//         // switchView();
//         // fadeInOut();
//     }
// };

// const displayWeatherData = data => {
//     const weather = data.consolidated_weather[0];

//     viewElems.weatherCity.innerText = data.title;
//     viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/png/64/${weather.weather_state_abbr}.png`;
//     viewElems.weatherIcon.alt = weather.weather_state_name;
//     const currentTemp = weather.the_temp.toFixed(2);
//     const maxTemp = weather.max_temp.toFixed(2);
//     const minTemp = weather.min_temp.toFixed(2);

//     viewElems.weatherCurrentTemp.innerText = `Current temperature is: ${currentTemp}°C`;
//     viewElems.weatherMaxTemp.innerText = `Max temperature is: ${maxTemp}°C`;
//     viewElems.weatherMinTemp.innerText = `Min temperature is: ${minTemp}°C`;
// }

// const fadeInOut = () => {
//     if (viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
//         viewElems.mainContainer.style.opacity = '0';
//     } else {
//         viewElems.mainContainer.style.opacity = '1';
//     }
// }

// const switchView = () => {
//     if (viewElems.weatherSearchView.style.display !== 'none') {
//         viewElems.weatherSearchView.style.display = 'none';
//         viewElems.weatherForecastView.style.display = 'block';
//     } else {
//         viewElems.weatherSearchView.style.display = 'flex';
//         viewElems.weatherForecastView.style.display = 'none';
//     }
// }

// const returnToSearch = () => {
//     fadeInOut();
//     setTimeout( () => {
//         switchView();
//         fadeInOut();
//     }, 500);
// }
