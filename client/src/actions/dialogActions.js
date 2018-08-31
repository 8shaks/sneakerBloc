import { OPEN_DIALOG, CLOSE_DIALOG } from "./types";

export const openDialog = () => {
  return {
    type: OPEN_DIALOG
  };
};

export const closeDialog = () => {
  return {
    type: CLOSE_DIALOG
  };
};
