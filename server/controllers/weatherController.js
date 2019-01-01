import { WeatherServices } from '../services/weatherService';

export const weatherController = {
  async getAllWeather(req, res) {
    const weathers = await WeatherServices().getAll();
    res.ok({ success: true, result: weathers });
  },
  async getWeatherByID(req, res) {
    const { extID } = req.params;
    console.log('extID', extID);
    const weather = await WeatherServices().getOne({ extId: Number.parseInt(extID) });
    console.log('weather', weather);
    res.ok({ success: true, result: weather });
  }
};
