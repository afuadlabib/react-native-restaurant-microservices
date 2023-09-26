import bcrypt from 'bcrypt';

export const hashPassword = (planPassword) => {
  return bcrypt.hashSync(planPassword, 10);
};
export const comparePassword = (planPassword, hashPassword) => {
  return bcrypt.compareSync(planPassword, hashPassword);
};
