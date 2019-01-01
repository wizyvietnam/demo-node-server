import { BaseServices } from './shared/baseServices';

export const WeatherServices = () => {
  return Object.assign({}, BaseServices('weather'));
};