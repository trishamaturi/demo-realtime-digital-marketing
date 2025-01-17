import { SimpleGrid, Stack } from "@chakra-ui/react";
import * as React from "react";
import { useRecoilState } from "recoil";

import { ConfigInput } from "@/components/ConfigInput";
import { ScaleFactorSelector } from "@/components/ScaleFactorSelector";
import {
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
} from "@/data/recoil";

type Props = {
  showDatabase?: boolean;
  showScaleFactor?: boolean;
  editable?: boolean;
};

export const DatabaseConfigForm = ({
  showDatabase,
  showScaleFactor,
  editable,
}: Props) => {
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const [database, setDatabase] = useRecoilState(connectionDatabase);

  let databaseInput;
  if (showDatabase) {
    databaseInput = (
      <ConfigInput
        label="Martech Database Name"
        placeholder="martech"
        value={database}
        setValue={setDatabase}
        editable={editable}
      />
    );
  }

  let scaleFactor;
  if (showScaleFactor) {
    scaleFactor = <ScaleFactorSelector />;
  }

  return (
    <Stack spacing={4}>
      <ConfigInput
        label="Workspace Host"
        placeholder="http://127.0.0.1"
        value={host}
        setValue={setHost}
        helpText="Your workspace hostname."
        editable={editable}
      />
      <SimpleGrid columns={2} gap={2}>
        <ConfigInput
          label="Workspace Group Username"
          helpText="Fill in the Security credentials of your workspace group."
          placeholder="admin"
          value={user}
          setValue={setUser}
          editable={editable}
        />
        <ConfigInput
          label="Workspace Group Password"
          placeholder=""
          value={password}
          setValue={setPassword}
          type="password"
          editable={editable}
        />
      </SimpleGrid>
      {databaseInput}
      {scaleFactor}
    </Stack>
  );

 
};
