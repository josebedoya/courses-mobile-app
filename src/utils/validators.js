export const validateEmail = value => {
  const emailRegex = new RegExp(
    '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}',
  );
  if (emailRegex.test(value)) return true;
  return false;
};