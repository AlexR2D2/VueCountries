import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      clientLocation: null,
      clientCountry: null,
      countries: [],
    },
    getters: {
      clientLocation (state) {
        return state.clientLocation
      },
      clientCountry (state) {
        return state.clientCountry
      },
      countries (state) {
        return state.countries
      },
    },
    mutations: {
      setClientLocation (state, location) {
        state.clientLocation = location
      },
      setClientCountry (state, country) {
        state.clientCountry = country
      },
      setCountries (state, countries) {
        state.countries = countries
      }
    },
  })
}

export default createStore
