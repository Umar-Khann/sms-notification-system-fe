import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { getUsers, sendSms } from "../services/api";
import { useMessageThreshold } from "../context/MessageThresholdContext";

interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  name: string;
  jti: string;
  phone_number: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<{ [key: number]: string }>({});
  const { maxMessages, messagesSent, incrementMessagesSent } =
    useMessageThreshold();

  const handleMessageChange = (userId: number, message: string) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [userId]: message,
    }));
  };

  const handleSendMessage = async (userId: number, userName: string) => {
    if (messagesSent >= maxMessages) {
      alert("Threshold reached! You cannot send more messages.");
      return;
    }

    const message = messages[userId] || "Hey, Respond ASAP";
    try {
      const response = await sendSms(userId, message);
      if (response.status === 200) {
        incrementMessagesSent();
        alert(`SMS sent to ${userName}!`);
      } else {
        alert("Failed to send SMS.");
      }
    } catch (error) {
      console.error("Error sending SMS", error);
      alert("Error sending SMS.");
    }
  };

  useEffect(() => {
    getUsersListing();
  }, []);

  const getUsersListing = async () => {
    try {
      const response = await getUsers();
      setUsers(response?.data?.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <Typography variant="h6">
        Max messages allowed: {maxMessages} | Messages sent: {messagesSent}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={messages[user.id] || ""}
                    onChange={(e) =>
                      handleMessageChange(user.id, e.target.value)
                    }
                    placeholder="Type your message"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSendMessage(user.id, user.name)}
                    disabled={messagesSent >= maxMessages} // Disable if threshold is reached
                  >
                    {messagesSent >= maxMessages
                      ? "Threshold Reached"
                      : "Send Message"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
