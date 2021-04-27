import React from "react";
import {
  Form,
  Button,
  Message,
  TextArea,
  Divider,
  Segment,
} from "semantic-ui-react";

const CommonInputs = ({
  user: { bio, facebook, instagram, youtube, twitter },
  handleChange,
  showSocialLinks,
  setShowSocialLinks,
}) => {
  return (
    <>
      <Form.Field
        required
        control={TextArea}
        name="bio"
        value={bio}
        onChange={handleChange}
        placeholder="biography"
      />
      <Button
        content="Add Social Links"
        color="red"
        icon="at"
        type="button"
        onClick={() => setShowSocialLinks(!showSocialLinks)}
      />
      {showSocialLinks && (
        <>
          <Divider />
          <Form.Input
            input="facebook f"
            icon="facebook"
            iconPosition="left"
            name="facebook"
            value={facebook}
            onChange={handleChange}
          />
          <Form.Input
            input="twitter"
            icon="twitter"
            iconPosition="left"
            name="twitter"
            value={twitter}
            onChange={handleChange}
          />
          <Form.Input
            input="instagram"
            icon="instagram"
            iconPosition="left"
            name="instagram"
            value={instagram}
            onChange={handleChange}
          />
          <Form.Input
            input="youtube"
            icon="youtube"
            iconPosition="left"
            name="youtube"
            value={youtube}
            onChange={handleChange}
          />
          <Message
            icon="attention"
            info
            size="small"
            header="Social Media Links Are Optional"
          />
        </>
      )}
    </>
  );
};

export default CommonInputs;
