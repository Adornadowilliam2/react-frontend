import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../api/auth";
import { logout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

export default function Navbar({ user }) {
  const [dialog, setDialog] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const token = cookies.AUTH_TOKEN;
    logoutAPI(token).then((res) => {
      if (res?.ok) {
        toast.success(res.message ?? "Logged out successfully");
        navigate("/login");
        removeCookie("AUTH_TOKEN");
        dispatch(logout(token));
      } else {
        toast.error(res.message ?? "Something went wrong");
      }
    });
  };
  return (
    <Box
      variant="contained"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#007bff",
        p: 1,
      }}
    >
      <Box
        className="logo-container"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography sx={{ fontFamily: "Monstserrat", fontWeight: "bold" }}>
          MFI Polytechnic Institute
        </Typography>
      </Box>
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Roboto",
        }}
      >
        <ListItem sx={{ cursor: "pointer" }}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem sx={{ cursor: "pointer" }}>
          <ListItemText primary="Rooms" />
        </ListItem>
        <ListItem sx={{ cursor: "pointer" }}>
          <ListItemText primary="Bookings" />
        </ListItem>
        {user ? (
          <>
            <ListItem sx={{ cursor: "pointer" }} onClick={onSubmit}>
              <ListItemText primary="Logout" />
            </ListItem>
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => setDialog(true)}
            >
              <ListItemText primary="MyAccount" />
            </ListItem>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                fontFamily: "Roboto",
              }}
            >
              Login
            </Link>
          </>
        )}
        <ListItem sx={{ cursor: "pointer" }}>
          <TextField
            sx={{ background: "white", zIndex: 2, width: "200px" }}
            placeholder="Search"
            label="Search"
          />
        </ListItem>
      </List>
      <Dialog open={!!dialog}>
        <DialogTitle>My Account</DialogTitle>
        <List>
          <ListItem>{user?.name}</ListItem>
          <ListItem>{user?.email}</ListItem>
        </List>
        <Button onClick={() => setDialog(false)} variant="contained">
          Close
        </Button>
      </Dialog>
    </Box>
  );
}
