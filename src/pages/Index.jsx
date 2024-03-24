import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/signup";
    const data = { email, password };

    try {
      const response = await fetch(`https://backengine-5tqc.fly.dev${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (isLogin) {
          const { accessToken } = await response.json();
          // Store the access token securely, e.g., in localStorage or a cookie
          localStorage.setItem("accessToken", accessToken);
          toast({
            title: "Login Successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // Redirect to a protected page or update the UI to show the user is logged in
        } else {
          toast({
            title: "Signup Successful",
            description: "You can now log in with your credentials.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setIsLogin(true); // Switch to login mode after successful signup
        }
      } else {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
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
        {isLogin ? "Login" : "Signup"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            {isLogin ? "Login" : "Signup"}
          </Button>
        </Stack>
      </form>
      <Box mt={4} textAlign="center">
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Index;
