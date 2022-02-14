
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
    viewElems.returnToSearchBtn = getElemDOM("returnToSearchBtn");
    viewElems.weatherCity = getElemDOM("weatherCity");
    viewElems.weatherIcon = getElemDOM("weatherIcon");
    viewElems.weatherCurrentTemp = getElemDOM("weatherCurrentTemp");
    viewElems.weatherMaxTemp = getElemDOM("weatherMaxTemp");
    viewElems.weatherMinTemp = getElemDOM("weatherMinTemp");
}


const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
    viewElems.returnToSearchBtn.addEventListener('click', returnToSearch);
}

const initializeApp = () => {
    connectHTMLElemens();
    setupListeners();
}

const onClickSubmit = () => {
    returnToSearch();
    let query = viewElems.searchInput.value;
    getWeatherByCity(query).then(data => 
        console.log(data));
    // fadeInOut();
    // switchView();
};

const onEnterSubmit = event => {
    if (event.key === 'Enter') {
        returnToSearch();
        let query = viewElems.searchInput.value;
        getWeatherByCity(query).then(data => {
            console.log(data);
        });
        // switchView();
        // fadeInOut();
    }
};

const fadeInOut = () => {
    if (viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
        viewElems.mainContainer.style.opacity = '0';
    } else {
        viewElems.mainContainer.style.opacity = '1';
    }
}

const switchView = () => {
    if (viewElems.weatherSearchView.style.display !== 'none') {
        viewElems.weatherSearchView.style.display = 'none';
        viewElems.weatherForecastView.style.display = 'flex';
    } else {
        viewElems.weatherSearchView.style.display = 'flex';
        viewElems.weatherForecastView.style.display = 'none';
    }
}

const returnToSearch = () => {
    fadeInOut();
    setTimeout( () => {
        switchView();
        fadeInOut();
    }, 500);
}

document.addEventListener('DOMContentLoaded', initializeApp);