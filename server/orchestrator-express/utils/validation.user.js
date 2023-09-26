const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

export default (userData) => {
  const { username, email, password, phoneNumber, address } = userData;
  if (!username) {
    throw { name: 'validation_error', message: 'username is required' };
  } else if (!email) {
    throw { name: 'validation_error', message: 'email is required' };
  } else if (!password) {
    throw { name: 'validation_error', message: 'password is required' };
  } else if (!regex.test(email)) {
    throw { name: 'validation_error', message: 'invalid email format' };
  }
  return { username, email, password, phoneNumber, address };
};
