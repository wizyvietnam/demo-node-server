import { WeatherServices } from '../services/weatherService';

export const weatherController = {
  async getAllWeather(req, res) {
    const weathers = await WeatherServices().getAll();
    res.ok({ success: true, result: weathers });
  }
};
