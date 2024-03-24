import { useState, useEffect } from "react";
import { Box, VStack, useToast } from "@chakra-ui/react";
import TodoItem from "./TodoItem.jsx";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    try {
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteTodo = async (todoId) => {};

  return (
    <VStack spacing={4}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
      ))}
    </VStack>
  );
};

export default TodoList;
