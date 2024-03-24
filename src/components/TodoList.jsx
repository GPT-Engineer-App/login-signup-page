import { useState, useEffect } from "react";
import { Box, Button, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("https://backengine-5tqc.fly.dev/todo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTodoList(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch todo list.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addTodo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("https://backengine-5tqc.fly.dev/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ text: newTodo }),
      });

      if (response.ok) {
        setNewTodo("");
        fetchTodoList();
      } else {
        toast({
          title: "Error",
          description: "Failed to add todo item.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const markTodoAsDone = async (todoId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`https://backengine-5tqc.fly.dev/todo/${todoId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        fetchTodoList();
      } else {
        toast({
          title: "Error",
          description: "Failed to mark todo item as done.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`https://backengine-5tqc.fly.dev/todo/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        fetchTodoList();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete todo item.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading as="h1" mb={8} textAlign="center">
        Todo List
      </Heading>
      <Stack spacing={4}>
        {todoList.map((todo) => (
          <Box key={todo.id} display="flex" alignItems="center">
            <Text flex="1" textDecoration={todo.done ? "line-through" : "none"}>
              {todo.text}
            </Text>
            {!todo.done && (
              <Button size="sm" colorScheme="green" onClick={() => markTodoAsDone(todo.id)}>
                Done
              </Button>
            )}
            <Button size="sm" colorScheme="red" onClick={() => deleteTodo(todo.id)}>
              Delete
            </Button>
          </Box>
        ))}
        <Box display="flex">
          <Input flex="1" placeholder="Add a new todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <Button colorScheme="blue" onClick={addTodo}>
            Add
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default TodoList;
