import React, { useState } from "react";
import { Stack, TextField, PrimaryButton } from "@fluentui/react";
import {
  Toaster,
  useId,
  useToastController,
  ToastTitle,
  Toast,
} from "@fluentui/react-components";

const UpdatePersonForm = ({ item, onAddPerson }) => {
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);
  const notify = (message) =>
    dispatchToast(
      <Toast>
        <ToastTitle>{message}</ToastTitle>
      </Toast>,
      { intent: "warning" }
    );
  const [designation, setDesignation] = useState(item?.job?.label);
  const [name, setName] = useState(item?.name?.label);
  const [age, setAge] = useState(item?.age?.label);
  const [experience, setExperience] = useState(item?.currentExp?.label);

  const handleSave = () => {
    if (!designation || !name || !age || !experience) {
      notify("Please fill in all fields.");
      return;
    }

    const newPerson = {
      job: { label: designation },
      name: { label: name },
      age: { label: age },
      currentExp: { label: experience },
      lastUpdated: { label: "Just now", timestamp: Date.now() },
    };

    onAddPerson(newPerson);
    setDesignation("");
    setName("");
    setAge("");
    setExperience("");
  };

  return (
    <>
      <Toaster
        toasterId={toasterId}
        position="top-end"
        pauseOnHover
        pauseOnWindowBlur
        timeout={5000}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
          gap: "2rem",
          marginTop: "1.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Stack styles={{ root: { width: "50%" } }}>
            <TextField
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Stack>
          <Stack styles={{ root: { width: "50%" } }}>
            <TextField
              label="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <TextField
              label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </Stack>
        </div>
        <PrimaryButton text="Update Record" onClick={handleSave} />
      </div>
    </>
  );
};

export default UpdatePersonForm;
