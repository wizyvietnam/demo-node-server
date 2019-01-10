import { BaseServices } from './shared/baseServices';

export const WeatherServices = () => {
  return Object.assign({}, BaseServices('weather'), {
    delete: ({ id }) => {
      return base.getById(id).then(freelancer => {
        if (!freelancer) throw new Error('freelancer not found');
        return base.update(id, { isActive: false });
      });
    }
  });
};
