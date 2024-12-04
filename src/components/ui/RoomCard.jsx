import { Box, Typography } from "@mui/material";
import React from "react";

export default function RoomCard({ rooms }) {
  return (
    <>
      <Typography variant="h6">RoomCard</Typography>
      {rooms.map((room) => (
        <Box
          key={room.id}
          sx={{ p: 1, border: "1px solid #ccc", m: 1 }}
          onClick={() => {}}
        >
          <Typography>{room.room_name}</Typography>
          <Typography>{room.capacity}</Typography>
          <Typography>{room.description}</Typography>
        </Box>
      ))}
    </>
  );
}
