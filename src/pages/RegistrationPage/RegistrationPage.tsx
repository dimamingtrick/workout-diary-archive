import React, { useState, useCallback } from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  InputGroup,
  Input,
  InputGroupAddon,
  FormFeedback
} from "reactstrap";

import { useStores } from "../../hooks";
import { useRegistration } from "./hooks";

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
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              value={email.value}
              onChange={email.onChange}
              onBlur={email.onChange}
              valid={email.touched && email.error === ""}
              invalid={email.touched && email.error !== ""}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email..."
            />
            {email.error !== "" && <FormFeedback>{email.error}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <InputGroup>
                    <Input
                      value={password.value}
                      onChange={password.onChange}
                      onBlur={password.onChange}
                      valid={!password.error && password.touched}
                      invalid={password.error !== ""}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password..."
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        color="secondary"
                        onClick={handleClickShowPassword}
                      >
                        O
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    value={confirmPassword.value}
                    onChange={confirmPassword.onChange}
                    onBlur={confirmPassword.onChange}
                    valid={!confirmPassword.error && confirmPassword.touched}
                    invalid={
                      passwordsError !== "" ||
                      confirmPassword.error !== "" ||
                      password.error !== ""
                    }
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="confirmPassword"
                    placeholder="Confirm password..."
                  />
                  {password.error && (
                    <FormFeedback style={{ textAlign: "right" }}>
                      {password.error}
                    </FormFeedback>
                  )}
                  {passwordsError !== "" && (
                    <FormFeedback style={{ textAlign: "right" }}>
                      {passwordsError}
                    </FormFeedback>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>

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
