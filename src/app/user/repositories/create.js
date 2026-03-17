import User from '../models/user.model.js';

export const create = async (user) => {
  const created = await User.create(user);
  console.log('hi from repo', created);
  return created;
};

