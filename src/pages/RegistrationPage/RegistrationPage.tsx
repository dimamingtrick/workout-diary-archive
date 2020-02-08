import React, { useState, useReducer, useCallback } from "react";
import { useObserver } from "mobx-react";
import { Container, Row, Col, Button, Form, Spinner } from "reactstrap";

import { useStores } from "../../hooks";
import {
  registrationReducer,
  initialState,
  HANDLE_EMAIL,
  HANDLE_NAME,
  HANDLE_PASSWORD,
  HANDLE_CONFIRM_PASSWORD,
  HANDLE_VALIDATE,
  SET_IS_LOADING,
  HANDLE_ERRORS_RESPONSE,
  HANDLE_ERROR
} from "./registrationReducer";
import { Input, Card, CardTitle, ErrorMessage } from "../../components/common";
import ShowPasswordIcon from "../../components/ShowPasswordIcon";
import AuthLink from "../../components/AuthLink";
import "./registration-page.scss";
import { ErrorMessageAnimated } from "../../components/animations";

type InputChangeType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

const RegistrationPage: React.FC = () => {
  const { AuthStore } = useStores();
  const [state, dispatch] = useReducer(registrationReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { email, name, password, confirmPassword, isLoading, error } = state;

  const handleChange = useCallback(
    ({ target: { name, value } }: InputChangeType) => {
      switch (name) {
        case "email":
          return dispatch({ type: HANDLE_EMAIL, value });
        case "name":
          return dispatch({ type: HANDLE_NAME, value });
        case "password":
          return dispatch({ type: HANDLE_PASSWORD, value });
        case "confirmPassword":
          return dispatch({ type: HANDLE_CONFIRM_PASSWORD, value });
        default:
          return;
      }
    },
    []
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const fields = [email, name, password, confirmPassword];
    const formHaveErrors = fields.some(i => i.error !== "" || !i.touched);

    if (formHaveErrors) {
      return dispatch({ type: HANDLE_VALIDATE });
    }

    dispatch({ type: SET_IS_LOADING });

    AuthStore.signUp({
      email: email.value,
      name: name.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    }).catch(error => {
      const errors = error.body;
      if (Array.isArray(errors)) {
        dispatch({ type: HANDLE_ERRORS_RESPONSE, errors });
      } else {
        dispatch({ type: HANDLE_ERROR, error: error.message });
      }
    });
  };

  return useObserver(() => (
    <Container fluid className="auth-page">
      <Card className="auth-card">
        <CardTitle>Registration</CardTitle>
        <Form className="auth-form" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            placeholder="Email..."
            label="Email"
            type="email"
            value={email.value}
            onChange={handleChange}
            onBlur={handleChange}
            valid={email.touched && email.error === ""}
            invalid={email.touched && email.error !== ""}
            error={email.error}
            disabled={isLoading}
          />

          <Input
            id="name"
            name="name"
            placeholder="Name..."
            label="Name"
            value={name.value}
            onChange={handleChange}
            onBlur={handleChange}
            valid={name.touched && name.error === ""}
            invalid={name.touched && name.error !== ""}
            error={name.error}
            disabled={isLoading}
          />

          <Row form>
            <Col md={6}>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password.value}
                onChange={handleChange}
                onBlur={handleChange}
                valid={!password.error && password.touched}
                invalid={password.error !== ""}
                error={password.error}
                disabled={isLoading}
              />
            </Col>
            <Col md={6}>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password..."
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword.value}
                onChange={handleChange}
                onBlur={handleChange}
                valid={!confirmPassword.error && confirmPassword.touched}
                invalid={confirmPassword.error !== ""}
                error={confirmPassword.error}
                errorClassName="passwordsError"
                rightIcon={
                  <ShowPasswordIcon
                    show={showPassword}
                    onClick={handleClickShowPassword}
                  />
                }
                disabled={isLoading}
              />
            </Col>
          </Row>

          <ErrorMessageAnimated showError={error !== ""}>
            <ErrorMessage className="auth-error-message">{error}</ErrorMessage>
          </ErrorMessageAnimated>
          <Button className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? <Spinner color="light" size="sm" /> : "Sign Up"}
          </Button>
          <AuthLink to="/login" disabled={isLoading}>
            Sign In
          </AuthLink>
        </Form>
      </Card>
    </Container>
  ));
};

export default RegistrationPage;
