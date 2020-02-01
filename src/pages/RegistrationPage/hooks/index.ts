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

  const name = useFormInput({
    field: "name",
    value: "",
    required: true,
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

  const validate = () => {
    let errors = [];

    if (email.value === "") {
      email.touch();
      errors.push("email");
    }

    if (password.value === "") {
      password.touch();
      errors.push("password");
    }

    if (confirmPassword.value === "") {
      confirmPassword.touch();
      errors.push("confirmPassword");
    }

    return errors.length === 0;
  }

  return { email, name, password, confirmPassword, passwordsError, validate }
}
