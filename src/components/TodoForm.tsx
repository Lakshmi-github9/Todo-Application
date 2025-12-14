import { TextField, Button, Box } from "@mui/material";

interface TodoFormProps {
  title: string;
  dueDate: string;
  onTitleChange: (v: string) => void;
  onDateChange: (v: string) => void;
  onAdd: () => void;
}

export const TodoForm = ({
  title,
  dueDate,
  onTitleChange,
  onDateChange,
  onAdd,
}: TodoFormProps) => (
  <Box display="flex" gap={2} flexWrap="wrap">
    <TextField
      label="Task Title"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      sx={{ flex: 1, minWidth: 200 }}
    />

    <TextField
      type="date"
      label="Due Date"
      InputLabelProps={{ shrink: true }}
      value={dueDate}
      onChange={(e) => onDateChange(e.target.value)}
    />

    <Button variant="contained" onClick={onAdd}>
      Add Task
    </Button>
  </Box>
);