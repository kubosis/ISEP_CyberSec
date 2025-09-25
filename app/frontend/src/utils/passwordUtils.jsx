// src/utils/passwordUtils.jsx
export function evaluatePassword(password) {
  let strength = 0;

  const lengthRule = password.length >= 12;
  const uppercaseRule = /[A-Z]/.test(password);
  const numberRule = /[0-9]/.test(password);
  const specialCharRule = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (lengthRule) strength += 1;
  if (uppercaseRule) strength += 1;
  if (numberRule) strength += 1;
  if (specialCharRule) strength += 1;

  let message;
  if (strength < 2) message = "Weak";
  else if (strength === 2 || strength === 3) message = "Moderate";
  else message = "Strong";

  return {
    strength,
    message,
    isValid: lengthRule && uppercaseRule && numberRule && specialCharRule,
  };
}
