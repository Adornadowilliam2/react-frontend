// src/components/MyCalendar.js
import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Styling for the calendar

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDateClick = (date) => {
    setDate(date);
    setIsDialogOpen(true);
  };



  return (
    <Box>
      <Calendar
        onChange={handleDateChange}
        value={date}
        onClickDay={handleDateClick} // Adds the date click event handler
      />
      <Dialog open={!!isDialogOpen}>
        <DialogTitle>Selected Date</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            You clicked on: {date.toDateString()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
