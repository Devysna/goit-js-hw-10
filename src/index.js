import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputSearch.addEventListener('input', debounce(handleSearchInput, DEBOUNCE_DELAY));

function handleSearchInput() {
    const inputValue = inputSearch.value.trim();
    cleanHtml();

    if (!inputValue) {return;}

    fetchCountries(inputValue)
    .then(foundList => renderResponse(foundList));
};

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

function renderResponse(foundList){
    if (foundList.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (foundList.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (foundList.length >= 2) {
        renderCountryList(foundList);
    } else {
        renderCountryInfo(foundList);
    }
};

function renderCountryList(countries) {
    const markupList = countries
    .map(country => {
        return `<li><p>
          <img src="${country.flags.svg}"
          alt="Flag of ${country.name.official}"
          width="30" hight="20">
          <b>${country.name.official}</b>
          </p>
            </li>`;
    })
    .join('');
  countryList.innerHTML = markupList;
};

function renderCountryInfo(countries) {
      const markupInfo = countries
        .map(country => {
          return `<li><h2>
             <img src="${country.flags.svg}"
             alt="Flag of ${country.name.official}"
             width="30" hight="20">
             ${country.name.official}</h2>
             <p><b>Capital</b>: ${country.capital}</p>
             <p><b>Population</b>: ${country.population}</p>
             <p><b>Languages</b>: ${Object.values(country.languages)}</p>
                </li>`;
        })
        .join('');
      countryInfo.innerHTML = markupInfo;
};