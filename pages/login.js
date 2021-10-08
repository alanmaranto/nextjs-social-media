import React, { useState, useEffect } from "react";
import { Form, Button, Message, Divider, Segment } from "semantic-ui-react";

import {
  HeaderMessage,
  FooterMessage,
} from "../components/Shared/WelcomeMessage";
import { isNotEmptyObject } from "../utils/validations";
import { loginUser } from "../utils/authUser";

const Login = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  useEffect(() => {
    isNotEmptyObject({ email, password })
      ? setSubmitDisabled(false)
      : setSubmitDisabled(true);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(user, setError, setFormLoading);
  };

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={error !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={error}
          onDismiss={() => setError(null)}
        />
        <Segment>
          <Form.Input
            required
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            action
            iconPosition="left"
            type="email"
          />
          <Form.Input
            required
            label="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            action
            iconPosition="left"
            type={showPassword ? "text" : "password"}
          />
          <Divider hidden />
          <Button
            icon="signup"
            content="Login"
            type="submit"
            color="orange"
            disabled={submitDisabled}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};

export default Login;
