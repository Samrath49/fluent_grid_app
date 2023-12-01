import { useState, useEffect } from "react";
import Example from "./Example";
import { AddPersonForm } from "./Components";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Stack } from "@fluentui/react/lib/Stack";
import { data } from "./utils/constant";
import update from "immutability-helper";

function App() {
  // TODO: Add input fields to generate a new data grid item, upon clicking on edit popup should open where we can change values.
  // TODO: Need to add the select feature as well to move fields to different spots upon selecting them

  const [items, setItems] = useState([]);

  useEffect(() => {
    const ITEM_DATA = localStorage.getItem("ITEM_DATA");

    if (ITEM_DATA) {
      setItems(JSON.parse(ITEM_DATA));
    } else {
      localStorage.setItem("ITEM_DATA", JSON.stringify(data));
      setItems(data);
    }
  }, []);

  const handleAddPerson = (newPerson) => {
    const updatedItems = update(items, {
      $push: [newPerson],
    });
    setItems(updatedItems);
    localStorage.setItem("ITEM_DATA", JSON.stringify(updatedItems));
  };

  return (
    <>
      <FluentProvider theme={webLightTheme}>
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={{
            root: {
              minWidth: "100rem",
              height: "100vh",
              gap: "2rem",
            },
          }}
        >
          <AddPersonForm onAddPerson={handleAddPerson} />
          <Example items={items} setItems={setItems} />
        </Stack>
      </FluentProvider>
    </>
  );
}

export default App;
