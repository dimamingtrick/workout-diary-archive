import { useState, useEffect } from "react";
import { useFormInput } from "../../../hooks";
import { validateEmail } from "../../../helpers";

export const useRegistration = () => {
  const email = useFormInput({
    field: "email",
    value: "",
    required: true,
    validation: validateEmail
  });

  const password = useFormInput({
    field: "password",
    value: "",
    required: true
  });

  const confirmPassword = useFormInput({
    field: "confirmPassword",
    value: "",
    required: true
  });

  const [passwordsError, setPasswordsError] = useState("");

  useEffect(() => {
    if (
      password.touched &&
      confirmPassword.touched &&
      password.value !== confirmPassword.value &&
      passwordsError === ""
    ) {
      setPasswordsError("Passwords doesn't match");
    } else if (
      password.touched &&
      confirmPassword.touched &&
      password.value === confirmPassword.value &&
      password.value !== "" &&
      confirmPassword.value !== "" &&
      passwordsError !== ""
    ) {
      setPasswordsError("");
    }
  }, [password, confirmPassword, passwordsError]);

  return { email, password, confirmPassword, passwordsError }
}
