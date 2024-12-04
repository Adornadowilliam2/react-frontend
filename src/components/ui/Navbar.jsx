import React, { useState } from "react";
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
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../api/auth";
import { logout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar({ user, setRoomCard, roomcard }) {
  const [dialog, setDialog] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Adjust based on your design

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

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#007bff",
          padding: 1,
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

        {isMobile ? (
          <IconButton onClick={handleSidebarToggle} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        ) : (
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
            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => {
                roomcard ? setRoomCard(false) : setRoomCard(true);
              }}
            >
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
                  <ListItemText primary="My Account" />
                </ListItem>
              </>
            ) : (
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
            )}
            <ListItem sx={{ cursor: "pointer" }}>
              <TextField
                sx={{ background: "white", zIndex: 2, width: "200px" }}
                placeholder="Search"
                label="Search"
              />
            </ListItem>
          </List>
        )}
      </AppBar>

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={handleSidebarToggle}
        sx={{
          width: 250,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleSidebarToggle} sx={{ color: "black" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem button onClick={handleSidebarToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleSidebarToggle}>
            <ListItemText primary="Rooms" />
          </ListItem>
          <ListItem button onClick={handleSidebarToggle}>
            <ListItemText primary="Bookings" />
          </ListItem>
          {user ? (
            <>
              <ListItem
                button
                onClick={() => {
                  onSubmit();
                  handleSidebarToggle();
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setDialog(true);
                  handleSidebarToggle();
                }}
              >
                <ListItemText primary="My Account" />
              </ListItem>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <ListItem button onClick={handleSidebarToggle}>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>

      {/* Dialog for My Account */}
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
