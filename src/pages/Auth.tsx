import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h3" gutterBottom align="center">
          Welcome to SMS Notification System
        </Typography>

        {/* Form Section */}
        <Box width="100%" maxWidth="400px">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </Box>

        {/* Toggle Button */}
        <Button onClick={() => setIsLogin(!isLogin)} sx={{ mt: 2 }}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
