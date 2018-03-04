import axios from 'axios'

export const detectClientLocation = async (store) => {
  try {
    const response = await axios.get('http://ip-api.com/json')
    store.commit('setClientLocation', response.data)
  } catch (error) {
    console.log(error);
  }
}

export const detectClientCountry = async (store) => {
  if (!store.getters.clientLocation) return  
  try {
    const response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + store.getters.clientLocation.countryCode)
    store.commit('setClientCountry', response.data)
  } catch (error) {
    console.log(error);
  }
}

export const getCountriesList = async (store) => {
  try {
    const response = await axios.get('https://restcountries.eu/rest/v2/all')
    store.commit('setCountries', response.data)
  } catch (error) {
    console.log(error)
  }
}
