import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <UserTable />
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Home;
