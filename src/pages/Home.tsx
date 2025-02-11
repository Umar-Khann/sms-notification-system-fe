import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../util/token";

const Home: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    removeToken();
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <UserTable />
    </Container>
  );
};

export default Home;
