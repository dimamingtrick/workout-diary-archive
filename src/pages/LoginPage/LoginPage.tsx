import React, { useState, useCallback } from "react";
import { useObserver } from "mobx-react";
import { Button } from "antd";

import { useStores } from "../../hooks";
import { useFormInput } from "../../hooks";
import { validateEmail, getResponseErrorMessage } from "../../helpers";
import {
  Container,
  Input,
  Card,
  CardTitle,
  ErrorMessage
} from "../../components/common";
import ShowPasswordIcon from "../../components/ShowPasswordIcon";
import AuthLink from "../../components/AuthLink";
import { ErrorMessageAnimated } from "../../components/animations";

const LoginPage: React.FC = () => {
  const { AuthStore } = useStores();
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let errors = [];

    if (email.value === "" || email.error !== "") {
      if (email.error === "") email.touch();
      errors.push("email");
    }

    if (password.value === "" || password.error !== "") {
      if (password.error === "") password.touch();
      errors.push("password");
    }

    if (errors.length !== 0) return;

    setIsLoading(true);
    setError("");

    AuthStore.signIn({
      email: email.value,
      password: password.value
    }).catch(error => {
      setIsLoading(false);
      const errors = error.body;
      if (Array.isArray(errors)) {
        email.setError(getResponseErrorMessage(errors, "email"));
        password.setError(getResponseErrorMessage(errors, "password"));
      } else {
        setError(error.message);
      }
    });
  };

  return useObserver(() => (
    <Container fluid className="auth-page">
      <Card className="auth-card">
        <CardTitle>Login</CardTitle>
        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Email..."
            type="email"
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onChange}
            valid={email.touched && email.error === ""}
            invalid={email.touched && email.error !== ""}
            error={email.error}
            disabled={isLoading}
          />
          <Input
            id="password"
            name="password"
            placeholder="Password..."
            type={showPassword ? "text" : "password"}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onChange}
            valid={!password.error && password.touched}
            invalid={password.error !== ""}
            error={password.error}
            rightIcon={
              <ShowPasswordIcon
                show={showPassword}
                onClick={handleClickShowPassword}
              />
            }
            disabled={isLoading}
          />

          <ErrorMessageAnimated showError={error !== ""}>
            <ErrorMessage className="auth-error-message">{error}</ErrorMessage>
          </ErrorMessageAnimated>
          <Button
            className="auth-submit-btn"
            loading={isLoading}
            disabled={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
          >
            Sign In
          </Button>
          <AuthLink to="/registration" disabled={isLoading}>
            Sign Up
          </AuthLink>
        </form>
      </Card>
    </Container>
  ));
};

export default LoginPage;
