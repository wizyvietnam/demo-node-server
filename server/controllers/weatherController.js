import { WeatherServices } from '../services/weatherService';

export const weatherController = {
  async getAllWeather(req, res) {
    const weathers = await WeatherServices().getAll();
    res.ok({ success: true, result: weathers });
  },
  async getWeatherByID(req, res) {
    const { extID } = req.params;
    const weather = await WeatherServices().getOne({
      extId: Number.parseInt(extID)
    });
    res.ok({ success: true, result: weather });
  },
  async createNewWeatherInfo(req, res) {
    const weatherInfo = req.body.weather;
    await WeatherServices().create(weatherInfo);
    res.ok({ success: true, result: weatherInfo });
  },
  async updateWeather(req, res) {
    
  },
  async deleteWeatherByID(req, res) {
    const weatherInfo = req.body.weather;
    await WeatherServices().delete(weatherInfo);
    res.ok({ success: true, result: extID });
  }
};
