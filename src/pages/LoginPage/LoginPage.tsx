import React, { useState, useCallback } from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import { Container, Col, Button, Form } from "reactstrap";

import { useStores } from "../../hooks";
import { useFormInput } from "../../hooks";
import { validateEmail } from "../../helpers";
import { Input } from "../../components/common";
import ShowPasswordIcon from "../../components/ShowPasswordIcon";

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
          />

          <div className="auth-link">
            <Link to="/registration">Sign up</Link>
          </div>
          <Button>Submit</Button>
        </Form>
      </Col>
    </Container>
  ));
};

export default LoginPage;
