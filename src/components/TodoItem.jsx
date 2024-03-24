import { Box, IconButton, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, onDelete }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderWidth="1px" borderRadius="lg" mb={2}>
      <Text>{todo.text}</Text>
      <IconButton aria-label="Delete todo" icon={<FaTrash />} onClick={() => onDelete(todo.id)} />
    </Box>
  );
};

export default TodoItem;
