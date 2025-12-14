// Displays a single todo row with actions
import {
  ListItem,
  Checkbox,
  IconButton,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format, parseISO } from "date-fns";
import { Todo } from "../types";
import { getTodoRowStyle } from "../utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => (
  <ListItem
    component={Paper}
    sx={{ ...getTodoRowStyle(todo), mb: 1, borderRadius: 1 }}
  >
    {/* Completion checkbox */}
    <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />

    {/* Task details */}
    <Box flex={1}>
      <Typography variant="subtitle1">{todo.title}</Typography>
      <Typography variant="caption">
        Due: {format(parseISO(todo.dueDate), "PP")}
      </Typography>
    </Box>

    {/* Edit action */}
    <IconButton aria-label="edit" onClick={() => onEdit(todo)}>
      <EditIcon />
    </IconButton>

    {/* Delete action */}
    <IconButton aria-label="delete" onClick={() => onDelete(todo.id)}>
      <DeleteIcon />
    </IconButton>
  </ListItem>
);
