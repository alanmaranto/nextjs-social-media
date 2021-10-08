import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Message, Divider, Segment } from "semantic-ui-react";
import CommonInputs from "../components/Shared/CommonInputs";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Shared/WelcomeMessage";
import ImageDropDiv from "../components/Shared/ImageDropDiv";
import PdfDropDiv from "../components/Shared/PdfDropDiv";
import { regexUserName } from "../helpers";
import { isNotEmptyObject } from "../utils/validations";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { registerUser } from "../utils/authUser";
import uploadPic from "../utils/uploadPicToCloudinary";

let cancel;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const inputRef = useRef();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const { name, email, password, bio } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFiles = (e) => {
    const { files } = e.target;
    if (files.length === 0) return;

    setMedia(files[0]);
    setMediaPreview(URL.createObjectURL(files[0]));
  };

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;

      const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
        cancelToken: new CancelToken((canceled) => {
          cancel = canceled;
        }),
      });

      if (error !== null) setError(null);

      if (res.data === "Available") {
        setUsernameAvailable(true);
        setUser((prev) => ({ ...prev, username }));
      }
    } catch (error) {
      setError("Username Not Available");
      setUsernameAvailable(false);
    }
    setUsernameLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    let profilePicUrl;

    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setFormLoading(false);
      return setError("Error Uploading Image");
    }

    await registerUser(user, profilePicUrl, setError, setFormLoading);
  };

  useEffect(() => {
    isNotEmptyObject({ name, email, password, bio })
      ? setSubmitDisabled(false)
      : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    username === "" ? setUsernameAvailable(false) : checkUsername();
  }, [username]);

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
          <ImageDropDiv
            media={media}
            setMedia={setMedia}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleFiles={handleFiles}
          />
          {/* <PdfDropDiv /> */}
          <Form.Input
            required
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon="user"
            action
            iconPosition="left"
          />
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
          <Form.Input
            loading={usernameLoading}
            error={!usernameAvailable}
            required
            label="Username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (regexUserName.test(e.target.value)) {
                setUsernameAvailable(true);
              } else {
                setUsernameAvailable(false);
              }
            }}
            fluid
            icon={usernameAvailable ? "check" : "close"}
            iconPosition="left"
          />
          <CommonInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          />
          <Divider hidden />
          <Button
            content="Signup"
            type="submit"
            color="orange"
            disabled={submitDisabled || !usernameAvailable}
          />
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};

export default SignUp;
