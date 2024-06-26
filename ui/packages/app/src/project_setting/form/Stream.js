import React, { useState, useMemo } from "react";
import { EuiFormRow } from "@elastic/eui";
import { EuiComboBoxSelect } from "@caraml-dev/ui-lib";
import { isValidK8sLabelKeyValue } from "../../validation/validation";
import config from "../../config";

export const Stream = ({
  stream,
  setStream,
  isValidStream,
  setIsValidStream,
  isDisabled = false
}) => {
  const streamOptions = useMemo(() => {
    return Object.entries(config.STREAMS)
      .map(([stream]) => stream.trim())
      .sort((a, b) => a.localeCompare(b))
      .map(stream => ({ label: stream }));
  }, []);

  const [streamError, setStreamError] = useState("");

  const onStreamChange = stream => {
    let isValid = isValidK8sLabelKeyValue(stream);
    if (!isValid) {
      setStreamError(
        "Stream name is invalid. It should contain only lowercase alphanumeric and dash (-), or underscore (_) or period (.), and must start and end with an alphanumeric character"
      );
    }
    setIsValidStream(isValid);
    setStream(stream);
  };

  return (
    <EuiFormRow isInvalid={!isValidStream} error={streamError}>
      <EuiComboBoxSelect
        value={stream}
        options={streamOptions}
        onChange={onStreamChange}
        onCreateOption={config.ALLOW_CUSTOM_STREAM ? onStreamChange : undefined}
        isDisabled={isDisabled}
      />
    </EuiFormRow>
  );
};

export default Stream;
