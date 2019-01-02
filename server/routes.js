import { Router } from 'express';

import { weatherController } from './controllers/weatherController';

const routes = new Router();

routes.get('/weathers', weatherController.getAllWeather);
routes.get('/weather/:extID', weatherController.getWeatherByID);
routes.post('/weather', weatherController.createNewWeatherInfo);
routes.delete('/weather/:extID', weatherController.deleteWeatherByID);

export default routes;
