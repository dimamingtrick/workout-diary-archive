import React, { useState, useCallback } from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "reactstrap";

import { useStores } from "../../hooks";
import { useRegistration } from "./hooks";
import { Input } from "../../components/common";
import ShowPasswordIcon from "../../components/ShowPasswordIcon";
import "./registration-page.scss";

const RegistrationPage: React.FC = () => {
  const { AuthStore } = useStores();
  const {
    email,
    password,
    confirmPassword,
    passwordsError
  } = useRegistration();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSubmit = async (event: React.FormEvent) => {
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

    if (confirmPassword.value === "") {
      confirmPassword.touch();
      errors.push("confirmPassword");
    }

    if (errors.length !== 0) return;

    AuthStore.signIn();
  };

  return useObserver(() => (
    <Container fluid="md">
      <Col md={{ size: 6, offset: 3 }}>
        <Form onSubmit={handleSubmit}>
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
          />

          <Row form>
            <Col md={6}>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                type={showPassword ? "text" : "password"}
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onChange}
                valid={!password.error && password.touched && !passwordsError}
                invalid={password.error !== "" || passwordsError !== ""}
              />
            </Col>
            <Col md={6}>
              <Input
                id="confirmPassword"
                name="password"
                placeholder="Confirm password..."
                type={showPassword ? "text" : "password"}
                value={confirmPassword.value}
                onChange={confirmPassword.onChange}
                onBlur={confirmPassword.onChange}
                valid={
                  !confirmPassword.error &&
                  confirmPassword.touched &&
                  !passwordsError
                }
                invalid={
                  passwordsError !== "" ||
                  confirmPassword.error !== "" ||
                  password.error !== ""
                }
                error={password.error || passwordsError}
                errorClassName="passwordsError"
                rightIcon={
                  <ShowPasswordIcon
                    show={showPassword}
                    onClick={handleClickShowPassword}
                  />
                }
                leftIcon={
                  <ShowPasswordIcon
                    show={showPassword}
                    onClick={handleClickShowPassword}
                  />
                }
              />
            </Col>
          </Row>

          <div className="auth-link">
            <Link to="/login">Sign in</Link>
          </div>
          <Button>Submit</Button>
        </Form>
      </Col>
    </Container>
  ));
};

export default RegistrationPage;
