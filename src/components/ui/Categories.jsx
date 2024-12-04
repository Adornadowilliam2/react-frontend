import { Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export default function Categories() {
  return (
    <Box
      sx={{
        background: "white",
        boxShadow: "0 0 5px #000",
        mt: 2,
        height: "100%",
      }}
    >
      <List>
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
      </List>
    </Box>
  );
}
