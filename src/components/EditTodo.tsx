import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface EditTodoDialogProps {
  open: boolean;
  title: string;
  dueDate: string;
  onTitleChange: (v: string) => void;
  onDateChange: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export const EditTodoDialog = ({
  open,
  title,
  dueDate,
  onTitleChange,
  onDateChange,
  onClose,
  onSave,
}: EditTodoDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Todo</DialogTitle>
    <DialogContent>
      <TextField
        fullWidth
        margin="dense"
        label="Task Title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <TextField
        fullWidth
        margin="dense"
        type="date"
        label="Due Date"
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={onSave}>Save</Button>
    </DialogActions>
  </Dialog>
);
