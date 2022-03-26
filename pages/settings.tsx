import { useState } from "react";

import { H1 } from "@/components/Heading";
import Input from "@/components/Input";
import { LineBox } from "@/components/LineBox";
import { styled } from "@/stitches.config";
import { SettingsStore } from "@/stores/SettingsStore";
import { useObservable } from "@/stores";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";

const Settings = () => {
  const noOfColumns = useObservable(SettingsStore.publicationsContainerColumns);

  const [updatedNoofColumns, setUpdatedNoofColumns] = useState(noOfColumns);

  const onUpdate = (e) => {
    e.preventDefault();

    if (updatedNoofColumns < 1 || updatedNoofColumns > 3) {
      toast.error("Please enter a number between 1 and 3");
      return;
    }

    SettingsStore.setPublicationsContainerColumns(updatedNoofColumns);

    toast.success("Settings Updated");
  };

  return (
    <SettingsContainer as="form" onSubmit={onUpdate}>
      <H1 size="h1" sansSerif italic css={{ marginBottom: "5rem" }}>
        Settings
      </H1>

      {/* <SettingBox> */}
      <Input
        label="No. of Columns in Publications Container"
        placeholder="recommanded options: 1, 2, 3"
        type="number"
        value={updatedNoofColumns}
        // min="1"
        // max="3"
        onChange={(e) => setUpdatedNoofColumns(e.target.value)}
        css={{
          marginBottom: "2rem",

          input: {
            border: "1px solid $grey300",
          },
        }}
      />
      {/* </SettingBox> */}

      <Button
        type="submit"
        onClick={onUpdate}
        css={{
          backgroundColor: "$grey400",
          color: "$grey100",
          marginBottom: "2rem",
        }}>
        Update
      </Button>
    </SettingsContainer>
  );
};

export default Settings;

const SettingsContainer = styled(LineBox, {
  padding: "0 2rem",
});

const SettingBox = styled(LineBox, {
  padding: "1rem",
  margin: "2rem 0",
});
