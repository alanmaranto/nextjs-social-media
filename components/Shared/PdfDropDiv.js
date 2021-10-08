import { useState } from "react";
import { Container, Divider, Icon } from "semantic-ui-react";
// The states needs to pass as a props
export default function Home() {
  const [media, setMedia] = useState(null);
  const [extension, setExtension] = useState("");

  return (
    <Container text style={{ marginTop: "10rem" }}>
      <input
        type="file"
        accept=".pdf, .csv"
        onChange={(e) => {
          const { files } = e.target;
          if (files.length === 0) return;

          const fileAdded = files[0];
          setMedia(fileAdded);

          // I am splitting the name of file added by user to get extension..
          // split will convert the name into an array..
          const splitName = fileAdded.name.split(".");

          // The extension will be the last element inside the array thats why I'm using splitName[splitName.length-1]
          const fileExtension = splitName[splitName.length - 1];

          setExtension(fileExtension);
        }}
      />

      {/* Divider just to seperate the components */}
      <Divider />

      {media !== null && (
        <>
          <Icon
            size="large"
            name={
              extension === "pdf"
                ? "file pdf"
                : extension === "csv" && "file excel"
            }
          />
          <p>{media.name}</p>
        </>
      )}
    </Container>
  );
}
