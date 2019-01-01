import { BaseEntity } from './shared/baseEntity';

export const Weather = ({
  coord,
  weather,
  base,
  main,
  extId,
  name,
  cod,
  isActive
}) => {
  return Object.assign(
    {},
    {
      coord,
      weather,
      base,
      main,
      extId,
      name,
      cod,
      isActive
    },
    BaseEntity(isActive)
  );
};
