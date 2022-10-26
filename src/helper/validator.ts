export const isValidEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }
  const regexp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  return regexp.test(email);
};

export const isValidUsername = (username: string): boolean => {
  if (!username) {
    return false;
  }
  // can include only lower case, number, min length 3, max length 32, special characters ['-' '_' '.']
  const regexp = new RegExp(/^(?!.*[-._]{2})(?=.*[a-z0-9]$)[a-z0-9][a-z0-9_.-]{2,32}$/);
  return regexp.test(username);
};
