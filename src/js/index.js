// import './css/styles.css';

// const DEBOUNCE_DELAY = 300;
// let target2 = document.querySelector(".country-list");
// target2.WebGLActiveInfo("https://restcountries.com/v2/all?fields={nameCountry");  
// let target3 = document.querySelector(".country-info");
// target3.WebGLActiveInfo("https://restcountries.com/v2/all?fields={capital},{population},{languages}"); 
//import './css/styles.css';
//import { fetchCountries } from './fetchCountries.js';
//import debounce from '/lodash.debounce';
//import { Notify } from '/notiflix';
// const DEBOUNCE_DELAY = 300;
// const TIMEOUT_NOTIFICATION = 4000; 

// function fetchCountries(name) {
//     let urlAPI = `https://restcountries.com/v3.1/name/${name}`;
//     fetch(urlAPI).then(response => {
//         if(response.status !== 200) {
//             console.log("Ops, there is no country with that name")
//         }
//         else {
//         //return 'Country found';
//         return response.json()
//         }
//     })
//      .then(data => {
//         console.log(data);
//     })
// }
import debounce from '/node_modules/lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from '/src/js/fetchCountries';
const DEBOUNCE_DELAY = 300;
const TIMEOUT_NOTIFICATION = 4000;
 let inPut = document.querySelector('#search-box');
 const countriesListEl = document.querySelector('.country-list');
 const infoAboutCountryEl = document.querySelector('.country-info');

inPut.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));
/**function */
function onSearchCountry(event) {
  const valueInput = event.target.value.trim();
  if (valueInput.length === 1) {
    Notify.warning('At least 2 letters must be entered to search', {
      timeout: TIMEOUT_NOTIFICATION,
    });
    return;
  } else if (valueInput.length === 0) {
    Notify.info('Please start entering some country for searching', {
      timeout: TIMEOUT_NOTIFICATION,
    });
    countriesListEl.innerHTML = '';
    infoAboutCountryEl.innerHTML = '';
    inPut.removeEventListener('input', event);
    return;
  }
  fetchCountries(valueInput)
    .then(onRenderCountriesList)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        timeout: TIMEOUT_NOTIFICATION,
      });
      countriesListEl.innerHTML = '';
      infoAboutCountryEl.innerHTML = '';
    });
}
function onRenderCountriesList(countries) {
  const numberCountriesFound = countries.length;
  const markupCountriesList = countries
    .map(
      country =>
        `<li class="country"><img src="${country.flags.svg}"
      alt="Flag of ${country.name.official}" />
      <h1>${country.name.official}</h1></li>`
    )
    .join('');
  countriesListEl.innerHTML = markupCountriesList;
  if (numberCountriesFound === 1) {
    const bigRenderCountry = document.querySelector('.country');
    bigRenderCountry.classList.add('small');
    const markupInfoAboutCountry = countries
      .map(
        country =>
          `<p><b>Capital: </b>${country.capital}</p>
         <p><b>Population: </b>${country.population}</p>
         <p><b>Languages: </b>${Object.values(country.languages)}</p>`
      )
      .join('');
    infoAboutCountryEl.innerHTML = markupInfoAboutCountry;
    return;
  }
  if (numberCountriesFound > 10) {
    Notify.warning(
      'Too many matches found. Please enter a more specific name',
      {
        timeout: TIMEOUT_NOTIFICATION,
      }
    );
  }
  infoAboutCountryEl.innerHTML = '';
}