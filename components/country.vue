<template>
  <div class="flex flex-column">
    <div class="f4 silver pv3">Country</div>
    <table class="w-100 center f5" cellspacing="0">
      <tbody class="lh-copy">
        <tr v-for="(item, index) in items" :key="index">
          <td class="pv1 bb b--black-10 w-30">{{item.title}}</td>
          <td class="pv1 bb b--black-10">{{item.value}}</td>
        </tr>
        <tr v-if="country && country.currencies && country.currencies.length > 0 && false">
          <td class="bb b--black-10 w-30">Currencies</td>
          <td class="pv1 bb b--black-10">
            <table class="w-100 f5" cellspacing="0">
              <tbody class="">
                <tr v-for="(currency, curIndex) in country.currencies" :key="curIndex">
                  <td class="pv1">{{currency.name}}</td>
                  <td class="pv1">{{currency.code}}</td>
                  <td class="pv1">{{currency.symbol}}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: [
    'country'
  ],
  computed: {
    items () {
      if (!this.country) return []
      return [
        { title: "Name", value: this.country.name },
        { title: "Capital", value: this.country.capital },
        { title: "Region", value: this.country.region },
        { title: "Subregion", value: this.country.subregion },
        { title: "Population", value: this.country.population },
        { title: "Native name", value: this.country.nativeName },
        { title: "Numeric code", value: this.country.numericCode },
        { title: "Area", value: this.country.area },
        { title: "Gini", value: this.country.gini },
        { title: "Demonym", value: this.country.demonym },
        //{ title: "", value: country. },
        //{ title: "", value: country. },
      ]
    },
  },
}
/*
{
  "name": "Russian Federation",
  "capital": "Moscow",
  "region": "Europe",
  "subregion": "Eastern Europe",
  "population": 146599183,
  "nativeName": "Россия",
  "numericCode": "643",
  "area": 1.7124442E7,
  "gini": 40.1,
  "demonym": "Russian",
  "currencies": [{
    "code": "RUB",
    "name": "Russian ruble",
    "symbol": "₽"
  }],

  "topLevelDomain": [".ru"],
  "alpha2Code": "RU",
  "alpha3Code": "RUS",
  "callingCodes": ["7"],
  "altSpellings": ["RU", "Rossiya", "Russian Federation", "Российская Федерация", "Rossiyskaya Federatsiya"],
  "latlng": [60.0, 100.0],
  "timezones": ["UTC+03:00", "UTC+04:00", "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"],
  "borders": ["AZE", "BLR", "CHN", "EST", "FIN", "GEO", "KAZ", "PRK", "LVA", "LTU", "MNG", "NOR", "POL", "UKR"],

  "languages": [{
    "iso639_1": "ru",
    "iso639_2": "rus",
    "name": "Russian",
    "nativeName": "Русский"
  }],
  "translations": {
    "de": "Russland",
    "es": "Rusia",
    "fr": "Russie",
    "ja": "ロシア連邦",
    "it": "Russia",
    "br": "Rússia",
    "pt": "Rússia",
    "nl": "Rusland",
    "hr": "Rusija",
    "fa": "روسیه"
  },
  "flag": "https://restcountries.eu/data/rus.svg",
  "regionalBlocs": [{
    "acronym": "EEU",
    "name": "Eurasian Economic Union",
    "otherAcronyms": ["EAEU"],
    "otherNames": []
  }],
  "cioc": "RUS"
}
*/
</script>


<style>
.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%) translateY(-50%);
}
.example {
  height: 5rem;
  width: 5rem;
  background: #361F36;
  -webkit-box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
}
</style>
