import React, { useState, useCallback } from "react";
import { useObserver } from "mobx-react";
import { Container, Button, Form, Spinner } from "reactstrap";

import { useStores } from "../../hooks";
import { useFormInput } from "../../hooks";
import { validateEmail } from "../../helpers";
import { Input, Card, CardTitle } from "../../components/common";
import ShowPasswordIcon from "../../components/ShowPasswordIcon";
import AuthLink from "../../components/AuthLink";

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

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let errors = [];

    if (email.value === "") {
      email.touch();
      errors.push("email");
    }

    if (password.value === "") {
      password.touch();
      errors.push("password");
    }

    if (errors.length !== 0) return;

    setIsLoading(true);
    
    AuthStore.signIn({
      email: email.value,
      password: password.value
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });
  };

  return useObserver(() => (
    <Container fluid className="auth-page">
      <Card className="auth-card">
        <CardTitle>Login</CardTitle>
        <Form className="auth-form" onSubmit={handleSubmit}>
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

          <Button className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? <Spinner color="light" size="sm" /> : "Sign In"}
          </Button>
          <AuthLink to="/registration" disabled={isLoading}>
            Sign Up
          </AuthLink>
        </Form>
      </Card>
    </Container>
  ));
};

export default LoginPage;
