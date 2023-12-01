import * as React from "react";
import { Field, Input } from "@fluentui/react-components";

const DataField = (props) => (
  <Field
    label="Example field"
    // validationState="success"
    // validationMessage="This is a success message."
    {...props}
  >
    <Input />
  </Field>
);

export default DataField;
