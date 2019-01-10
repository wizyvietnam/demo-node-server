import co from 'co';

import weatherData from './init-data/weather.json';

import { WeatherServices } from './services/weatherService';
import { Weather } from './models/weather';

export const importData = () => {
  return co(function*() {
    yield importJSONData.importWeathers(weatherData);
  });
};

export const importJSONData = {
  importWeathers(weatherData) {
    return WeatherServices()
      .getAll()
      .then(result => {
        if (result.length === 0) {
          let array = Object.values(weatherData);
          return Promise.all(
            array.map(element => {
              const weather = Weather(element);
              WeatherServices().create(weather);
            })
          );
        } else {
          return null;
        }
      });
  }
};
