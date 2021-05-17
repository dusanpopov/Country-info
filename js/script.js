const countriesElement = document.querySelector(".countries");
const toggleButton = document.querySelector(".toggle");
const filterMenu = document.querySelector(".filter");
const regionFilters = document.querySelectorAll("li");
const searchElement = document.querySelector(".search-country");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

 // Retrieve country data and show it
 const getCountries = async () => {
    const response = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await response.json();
    displayCountries(countries);
}
// Display countries
displayCountries = (countries) => {
  countriesElement.innerHTML = '';
  countries.forEach(country => {
  const countryElement = document.createElement('div');
	 countryElement.classList.add('country');
	 countryElement.innerHTML = `
            <div>
                <img src="${country.flag}" alt="Country flag" />
            </div>
            <div class="country__body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;
        countryElement.addEventListener("click", () => {
            modal.style.display = "flex";
            showCountryDetails(country);
        })
	  countriesElement.appendChild(countryElement);
	});
}

getCountries();
// Search for a country 
searchElement.addEventListener('input', e => {
    const { value } = e.target;
    const countryNames = document.querySelectorAll('.country-name');
	countryNames.forEach(countryName => {
	  if (countryName.innerText.toLowerCase().includes(value.toLowerCase())) {
	     countryName.parentElement.parentElement.style.display = 'block';
	     }else{
	     countryName.parentElement.parentElement.style.display = 'none';
	   }
	});
});

// Filter country by a region
regionFilters.forEach(regionFilter => {

   regionFilter.addEventListener('click', () => {

   const value = regionFilter.innerText;
   const countryRegions = document.querySelectorAll('.country-region');
   countryRegions.forEach(countryRegion => {
	if (countryRegion.innerText.includes(value) || value === 'All') {
	    countryRegion.parentElement.parentElement.style.display = 'block';
	} else {
		countryRegion.parentElement.parentElement.style.display = 'none';
	}
	});
    });
});

// Show country details 
showCountryDetails = (country) => {
    const modalBody = modal.querySelector('.modal-body');
    const modalImg = modal.querySelector('img');
    modalImg.src = country.flag;

	modalBody.innerHTML = `
        <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
        </p>
    `;
}

toggleDarkMode = () => {
    document.body.classList.toggle("dark");
}

showRegionMenu = () => {
    filterMenu.classList.toggle("open")
}

closeModal = () => {
    modal.style.display = "none";
}

toggleButton.addEventListener("click", toggleDarkMode);
filterMenu.addEventListener("click", showRegionMenu);
closeBtn.addEventListener("click", closeModal);
