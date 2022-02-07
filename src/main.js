
import { getWeatherByCity } from './appService.js';

const viewElems = {};

const getElemDOM = id => {
    return document.getElementById(id);
}

const connectHTMLElemens = () => {
    viewElems.weatherSearchView = getElemDOM("weatherSearchView");
    viewElems.mainContainer = getElemDOM("mainContainer");
    viewElems.weatherForecastView = getElemDOM("weatherForecastView");
    
    viewElems.searchInput = getElemDOM("searchInput");
    viewElems.searchButton = getElemDOM("searchButton");
    viewElems.weatherCity = getElemDOM("weatherCity");
    viewElems.weatherIcon = getElemDOM("weatherIcon");
    viewElems.weatherCurrentTemp = getElemDOM("weatherCurrentTemp");
    viewElems.weatherMaxTemp = getElemDOM("weatherMaxTemp");
    viewElems.weatherMinTemp = getElemDOM("weatherMinTemp");
}


const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
}

const initializeApp = () => {
    connectHTMLElemens();
    setupListeners();
}

const onClickSubmit = () => {};
const onEnterSubmit = event => {
    if (event.key === 'Enter') {
        let query = viewElems.searchInput.value;
        getWeatherByCity(query).then(data =>
            console.log(data));
    }
};

document.addEventListener('DOMContentLoaded', initializeApp);