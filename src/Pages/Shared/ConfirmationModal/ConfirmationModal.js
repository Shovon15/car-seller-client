import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";

const ConfirmationModal = ({
  modalData,
  message,
  successAction,
  closeModal,
  handleOpen,
  open,
}) => {
  const { windowWidth } = useContext(DashboardContext);
  let size = "xl";
  if (windowWidth > 920) {
    size = "md";
  }
  return (
    <>
      <Dialog
        size={size}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="text-red-500">{message}</DialogHeader>
        <DialogBody divider>
          Warning: Deleting this post is permanent and cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => successAction(modalData)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
