document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  const hierarchy = {};
  data.forEach((fact) => {
    if (!(fact.region in hierarchy)) {
      hierarchy[fact.region] = {};
    }

    if (!fact.subregion) {
      fact.subregion = "N/A";
    }
    if (!(fact.subregion in hierarchy[fact.region])) {
      hierarchy[fact.region][fact.subregion] = {};
    }

    hierarchy[fact.region][fact.subregion][fact.name.common] = fact;
  });

  const updateRegions = () => {
    document.querySelector("#regions").innerHTML = Object.keys(hierarchy)
      .sort()
      .map((region) => `<option value="${region}">${region}</option>`)
      .join("");
  };

  const updateSubregions = (region) => {
    document.querySelector("#subregions").innerHTML = Object.keys(
      hierarchy[region]
    )
      .sort()
      .map((subregion) => `<option value="${subregion}">${subregion}</option>`)
      .join("");
  };

  const updateCountries = (region, subregion) => {
    document.querySelector("#countries").innerHTML = Object.keys(
      hierarchy[region][subregion]
    )
      .sort()
      .map((country) => `<option value="${country}">${country}</option>`)
      .join("");
  };

  const updateFacts = (region, subregion, country) => {
    const fact = hierarchy[region][subregion][country];

    document.querySelector("#facts").innerHTML = `<h2>Facts about ${
      fact.name.common
    }</h2>
    <div id="country-flag">
      <img src="${fact.flags.svg}" alt="Flag of ${fact.name.common}" />
    </div>
    <table>
      <tbody>
        <tr>
          <th scope="row">Official Name</th>
          <td>${fact.name.official} (${fact.translations.ara.official})</td>
        </tr>
        <tr>
          <th scope="row">Capital City</th>
          <td>${fact.capital}</td>
        </tr>
        <tr>
          <th scope="row">Population</th>
          <td>${Number(fact.population).toLocaleString()}</td>
        </tr>
        <tr>
          <th scope="row">Languages</th>
          <td>${Object.values(fact.languages).join(", ")}</td>
        </tr>
        <tr>
          <th scope="row">Currencies</th>
          <td>${Object.keys(fact.currencies).join(", ")}</td>
        </tr>
        <tr>
          <th scope="row">TLD</th>
          <td>${fact.tld.join(", ")}</td>
        </tr>
      </tbody>
    </table>`;
  };

  document.querySelector("#regions").addEventListener("change", () => {
    updateSubregions(document.querySelector("#regions").value);
    updateCountries(
      document.querySelector("#regions").value,
      document.querySelector("#subregions").value
    );
    updateFacts(
      document.querySelector("#regions").value,
      document.querySelector("#subregions").value,
      document.querySelector("#countries").value
    );
  });

  document.querySelector("#subregions").addEventListener("change", () => {
    updateCountries(
      document.querySelector("#regions").value,
      document.querySelector("#subregions").value
    );
    updateFacts(
      document.querySelector("#regions").value,
      document.querySelector("#subregions").value,
      document.querySelector("#countries").value
    );
  });

  document.querySelector("#countries").addEventListener("change", () => {
    updateFacts(
      document.querySelector("#regions").value,
      document.querySelector("#subregions").value,
      document.querySelector("#countries").value
    );
  });

  updateRegions();
  updateSubregions(document.querySelector("#regions").value);
  updateCountries(
    document.querySelector("#regions").value,
    document.querySelector("#subregions").value
  );
  updateFacts(
    document.querySelector("#regions").value,
    document.querySelector("#subregions").value,
    document.querySelector("#countries").value
  );
});
