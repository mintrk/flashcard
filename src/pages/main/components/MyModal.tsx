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

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (value: object) => void;
  initialValue: {
    title: string;
    color: string;
    cardText: string;
  };
}
const MyModal = ({
  isOpen,
  onClose,
  handleSubmit,
  initialValue,
}: MyModalProps) => {
  const [values, setValues] = useState(initialValue);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onClose();
        }}
        size="2xl"
        scrollBehavior="inside">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col pt-5 font-normal text-xl pb-1">
              Create new deck
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                variant="underlined"
                label="Name : "
                placeholder="Enter your deck name"
                size="lg"
                classNames={{
                  label: "text-lg",
                  base: "",
                }}
                value={values.title}
                onChange={(e) => {
                  setValues({ ...values, title: e.target.value });
                }}
              />
              <RadioGroup
                label="Color : "
                orientation="horizontal"
                classNames={{ label: "text-[#52525b] ps-1" }}
                value={values.color}
                onValueChange={(e) => {
                  setValues({ ...values, color: e });
                }}>
                <CustomRadio value="primary">
                  <div className="h-5 w-5 bg-primary rounded-sm"></div>
                </CustomRadio>
                <CustomRadio value="blue">
                  <div className="h-5 w-5 bg-blue rounded-sm"></div>
                </CustomRadio>
                <CustomRadio value="green">
                  <div className="h-5 w-5 bg-green rounded-sm"></div>
                </CustomRadio>
                <CustomRadio value="yellow">
                  <div className="h-5 w-5 bg-yellow rounded-sm"></div>
                </CustomRadio>
                <CustomRadio value="orange">
                  <div className="h-5 w-5 bg-orange rounded-sm"></div>
                </CustomRadio>
                <CustomRadio value="pink">
                  <div className="h-5 w-5 bg-pink rounded-sm"></div>
                </CustomRadio>
              </RadioGroup>
              <div className="flex gap-4 ps-1">
                <Textarea
                  label="Cards :"
                  labelPlacement="outside"
                  description="Separate your front and back of card by | (pipeline). Separate each card by line"
                  classNames={{
                    label: "text-base text-[#52525b]",
                    inputWrapper: "min-h-[121px]",
                    description: "font-light pt-2",
                  }}
                  placeholder="example : Front|Back"
                  defaultValue="Front|Back"
                  maxRows={5}
                  value={values.cardText}
                  onChange={(e) => {
                    setValues({ ...values, cardText: e.target.value });
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                onPress={() => {
                  onClose();
                  handleSubmit(values);
                }}>
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyModal;

import { RadioGroup, Radio, cn } from "@nextui-org/react";

export const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "m-0 bg-content1 hover:bg-content2 items-center justify-center",
          "cursor-pointer rounded-md p-1 border-2 border-transparent",
          "data-[selected=true]:border-black"
        ),
        labelWrapper: "!ml-0",
        wrapper: "!border-0 hidden",
      }}>
      {children}
    </Radio>
  );
};
