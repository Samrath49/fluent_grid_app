import { useState } from "react";
import Example from "./Example";
import { Modal } from "./Components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

function App() {
  // TODO: Add input fields to generate a new data grid item, upon clicking on edit popup should open where we can change values.
  // TODO: Also we can delete a value where popup should open and if we select delete it should delete the value
  // TODO: Need to add four fields to the four columns of data grid and we should be able to edit each field individually
  // TODO: Need to add the select feature as well to move fields to different spots upon selecting them

  const [count, setCount] = useState(0);

  return (
    <>
      <FluentProvider theme={webLightTheme}>
        <Example />
        <Modal />
      </FluentProvider>
    </>
  );
}

export default App;
