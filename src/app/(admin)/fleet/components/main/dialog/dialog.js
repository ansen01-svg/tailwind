import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AdminButton from "@/app/(admin)/components/button/button";
import { filterFields } from "@/app/utils/arrays";
import UnappliedFilters from "./unapplied_filters";
import AppliedFilters from "./applied_filters";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogBox(props) {
  const {
    open,
    handleClose,
    filters,
    setFilters,
    confirmFilters,
    setInitialCarsArray,
  } = props;

  const [availableFilters, setAvailableFilters] = useState(filterFields);

  // handle available filters button click
  const handleAvailableFiltersBtnClick = (title) => {
    const newAvailableFilters = availableFilters.filter(
      (filter) => filter !== title
    );
    setAvailableFilters(newAvailableFilters);

    const newFilters = [...filters, title];
    setFilters(newFilters);
  };

  // handle appplied filters button click
  const handleAppliedFiltersBtnClick = (title) => {
    const newFilters = filters.filter((filter) => filter !== title);
    setFilters(newFilters);

    const newAvailableFilters = [...availableFilters, title];
    setAvailableFilters(newAvailableFilters);
  };

  // handle cancel button click
  const handleCancelBtnClick = () => {
    setAvailableFilters(filterFields);
    setFilters([]);
    setInitialCarsArray();
    handleClose();
  };

  // clear filters
  const clearFilters = () => {
    setAvailableFilters(filterFields);
    setFilters([]);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, fontSize: "16px", color: "#24272c", fontWeight: 600 }}
        id="customized-dialog-title"
      >
        Edit Filters
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#24272c",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <UnappliedFilters
          availableFilters={availableFilters}
          handleAvailableFiltersBtnClick={handleAvailableFiltersBtnClick}
        />
        {filters.length > 0 && (
          <AppliedFilters
            filters={filters}
            clearFilters={clearFilters}
            handleAppliedFiltersBtnClick={handleAppliedFiltersBtnClick}
          />
        )}
      </DialogContent>
      <DialogActions>
        <button
          className="px-4 py-2 bg-primary text-primary text-[13px] font-semibold rounded-full hover:bg-slate-200"
          onClick={handleCancelBtnClick}
        >
          Cancel
        </button>
        <AdminButton title={"Confirm"} handleClick={confirmFilters} />
      </DialogActions>
    </BootstrapDialog>
  );
}
