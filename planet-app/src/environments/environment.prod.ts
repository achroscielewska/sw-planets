const API_URL = 'https://swapi.co/api';

export const environment = {
  planetsUrl: {
    getList: `${API_URL}/planets`
  },
  peopleUrl: {
    getList: `${API_URL}/people`
  },
  filmsUrl: {
    getList: `${API_URL}/films`
  },
  production: true
};
