export const BaseEntity = (id, isActive = true) => {
    const base = {
      isActive: isActive
    }
    if (id)
      return Object.assign({}, base, { _id: id })
    else
      return base;
  };