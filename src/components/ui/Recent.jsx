import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { index } from "../../api/booking";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { retrieveUser } from "../../api/user";
import { retrieveRoom } from "../../api/room";

export default function Recent({ rows, users, rooms }) {
  return (
    <Box
      sx={{
        background: "white",
        boxShadow: "0 0 5px #000",
        mt: 2,
        height: "100%",
        p: 1,
      }}
    >
      <Typography>Recent Activities</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Room name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Updated at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {users.filter((u) => u.id == row.user_id)[0]?.name || ""}
                </TableCell>
                <TableCell>
                  {rooms.filter((r) => r.id == row.room_id)[0]?.room_name || ""}
                </TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.start_time}</TableCell>
                <TableCell>{row.end_time}</TableCell>
                <TableCell>
                  {row.created_at.slice(0, 10) +
                    " " +
                    row.created_at.slice(11, 16)}
                </TableCell>
                <TableCell>
                  {row.updated_at.slice(0, 10) +
                    " " +
                    row.updated_at.slice(11, 16)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
