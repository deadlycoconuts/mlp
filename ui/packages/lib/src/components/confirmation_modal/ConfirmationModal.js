import React, { Fragment } from "react";
import { EuiOverlayMask, EuiConfirmModal, EuiProgress } from "@elastic/eui";
import { useToggle } from "../../hooks";

export const ConfirmationModal = ({
  title,
  content,
  onConfirm,
  confirmButtonText,
  confirmButtonColor,
  isLoading,
  ...props
}) => {
  const [isModalVisible, toggleModalVisible] = useToggle();

  return (
    <Fragment>
      {props.children(toggleModalVisible)}

      {isModalVisible && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title={title}
            onCancel={toggleModalVisible}
            onConfirm={onConfirm}
            cancelButtonText="Cancel"
            confirmButtonText={confirmButtonText}
            buttonColor={confirmButtonColor}>
            {content}
            {isLoading && <EuiProgress size="xs" color="accent" />}
          </EuiConfirmModal>
        </EuiOverlayMask>
      )}
    </Fragment>
  );
};
