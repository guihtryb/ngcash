export default function passwordValidation(password: string) {
  const passwordRegEx = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;

  return passwordRegEx.test(password);
}
