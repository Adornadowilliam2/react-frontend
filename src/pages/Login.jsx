import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { toast } from "react-toastify";
import { login as LoginAPI } from "../api/auth";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { login } from "../redux/authSlice";
import CloseIcon from "@mui/icons-material/Close";

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    LoginAPI(body).then((res) => {
      if (res?.ok) {
        toast.success(res.message);
        navigate("/");
        setCookie("AUTH_TOKEN", res.data.token);
        dispatch(login(res.data));
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      onSubmit={onSubmit}
    >
      <Box
        className="form-register"
        component="form"
        sx={{
          p: 2,
          background: "white",
          width: "400px",
          border: "1px solid black",
        }}
      >
        <IconButton
          onClick={() => {
            navigate("/");
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "32px",
          }}
        >
          Login
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "Roboto", fontSize: "20px", mb: 1 }}
          >
            Email
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            required
            placeholder="Email"
            sx={{
              width: "100%",
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "Roboto", fontSize: "20px", mb: 1 }}
          >
            Password
          </Typography>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            required
            placeholder="Password"
            sx={{
              width: "100%",
            }}
            type="password"
          />
        </Box>

        <Button
          variant="contained"
          sx={{ width: "100%", mt: 2, p: 2 }}
          type="submit"
        >
          Login
        </Button>
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Don't have account yet!{" "}
          <Link to="/register" style={{ color: "#007bff" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
