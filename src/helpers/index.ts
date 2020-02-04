export const validateEmail = (email: string): boolean => {
  //eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getResponseErrorMessage = (errors: Array<{ field: string, message: string }>, field: string): string => {
  if (!errors || !errors.length) return "";
  const errorField = errors.find(err => err.field === field);
  return errorField ? errorField.message : "";
}