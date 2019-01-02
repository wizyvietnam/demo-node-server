import { BaseServices } from './shared/baseServices';


export const weatherServices = () => {
  const base = BaseServices('weather');

  const update = ({ id, document }) => {
    return base.getById(id).then(weather => {
      if (!weather) throw new Error('weather');
      const formatedDocument = _.merge({}, weather, document);
      delete formatedDocument.isActive;
      return base.update(id, formatedDocument);
    });
  };

  return Object.assign({}, base, {
    find: id => {
      return base.getById(id).then(weather => {
        if (!weather) throw new Error('weather');
        return weather;
      });
    },
    create: ({ id, document }) => {
      return update({ id, document })
        .catch((error) => {
          if (!(error instanceof Error)) throw error;
          // if not, create new one
          return base.create({
            ...document,
            _id: id,
            isActive: true
          });
        });
    },
    update,
    delete: ({ id }) => {
      return base.getById(id).then(weather => {
        if (!weather) throw new Error('weather');
        return base.update(id, { isActive: false });
      });
    }
  });
};
