import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";

interface ConfrimModalProps {
  body: string;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}
const ConfrimModal = ({
  body,
  isOpen,
  handleSubmit,
  onClose,
}: ConfrimModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContent>
          <ModalBody className="px-6">
            <h1 className="mt-4">{body}</h1>
            <div className="flex justify-end gap-2 mb-2">
              <Button onClick={onClose} variant="flat" radius="sm">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="solid"
                color="primary"
                radius="sm">
                Confirm
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfrimModal;
