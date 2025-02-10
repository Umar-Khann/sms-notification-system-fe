import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signupUser(email, password, name, phoneNumber);
      if (response.status === 200 || response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.status?.message ||
        "Signup failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterForm;
