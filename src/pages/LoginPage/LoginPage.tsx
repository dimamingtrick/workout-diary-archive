import React, { useState, useCallback } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
  Container,
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
import { useFormInput } from "../../hooks";
import { validateEmail } from "../../helpers";

const LoginPage: React.FC = observer(() => {
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

  return (
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
              placeholder="with a placeholder"
            />
            {email.error !== "" && <FormFeedback>{email.error}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <InputGroup>
              <Input
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onChange}
                valid={!password.error && password.touched}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password..."
              />
              <InputGroupAddon addonType="append">
                <Button color="secondary" onClick={handleClickShowPassword}>
                  O
                </Button>
              </InputGroupAddon>
            </InputGroup>
            {password.error && <FormFeedback>{password.error}</FormFeedback>}
          </FormGroup>

          <div className="auth-link">
            <Link to="/registration">Sign up</Link>
          </div>
          <Button>Submit</Button>
        </Form>
      </Col>
    </Container>
  );
});

export default LoginPage;
