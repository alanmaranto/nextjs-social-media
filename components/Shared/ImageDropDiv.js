import React from "react";
import { Form, Segment, Image, Icon, Header } from "semantic-ui-react";
const ImageDropDiv = ({
  highlighted,
  setHighlighted,
  inputRef,
  handleFiles,
  mediaPreview,
  setMediaPreview,
  setMedia,
}) => {
  return (
    <>
      <Form.Field>
        <Segment placeholder basic secondary>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleFiles}
            name="media"
            ref={inputRef} // 'Cause this input's display is none we're going to use this inputRef to open it
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setHighlighted(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setHighlighted(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHighlighted(true);
              const droppedFile = Array.from(e.dataTransfer.files);
              setMedia(droppedFile[0]);
              setMediaPreview(URL.createObjectURL(droppedFile[0]));
            }}
          >
            {mediaPreview === null ? (
              <Segment color={highlighted ? "green" : ""} placeholder basic>
                <Header icon>
                  <Icon
                    name="file image outline"
                    style={{ cursor: "pointer" }}
                    onClick={() => inputRef.current.click()}
                  />
                  Drag n Drop or Click to Upload Image
                </Header>
              </Segment>
            ) : (
              <Segment color="green">
                <Image
                  src={mediaPreview}
                  size="medium"
                  centered
                  style={{ cursor: "pointer" }}
                  onClick={() => inputRef.current.click()}
                />
              </Segment>
            )}
          </div>
        </Segment>
      </Form.Field>
    </>
  );
};

export default ImageDropDiv;
