import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const users = [
  { id: 1, name: "Alice Johnson", phone: "+123456789" },
  { id: 2, name: "Bob Smith", phone: "+987654321" },
  { id: 3, name: "Charlie Brown", phone: "+112233445" },
];

const UserTable: React.FC = () => {
  const handleSendMessage = (userName: string) => {
    alert(`SMS sent to ${userName}!`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSendMessage(user.name)}
                >
                  Send Message
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
