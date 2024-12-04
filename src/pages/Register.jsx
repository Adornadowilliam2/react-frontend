import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/mockup.png";
import $ from "jquery";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import CloseIcon from "@mui/icons-material/Close";
export default function Register() {
  const [warnings, setWarnings] = useState({});
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  // submit function
  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      password_confirmation: $("#password_confirmation").val(),
    };
    register(body).then((res) => {
      console.log(res);
      if (res?.ok) {
        toast.success(res.message);
        navigate("/");
        setCookie("AUTH_TOKEN", res.data.token);
        dispatch(login(res.data));
      } else {
        toast.error(res.message);
        setWarnings(res?.errors);
      }
    });
  };

  return (
    <Box className="grid-container">
      <Box
        className="bg-mockup-register"
        style={{
          background: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={image} alt="bg-mockup-img" style={{ width: "400px" }} />
      </Box>
      <Box
        className="form-register"
        component="form"
        sx={{
          width: "auto",
          p: 2,
          background: "white",
        }}
        onSubmit={onSubmit}
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
          Register
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "Roboto", fontSize: "20px", mb: 1 }}
          >
            Username
          </Typography>
          <TextField
            id="name"
            label="Username"
            variant="outlined"
            required
            placeholder="Username"
            sx={{ width: "100%" }}
          />
          {warnings?.name ? (
            <Typography sx={{ color: "red" }}>{warnings?.name}</Typography>
          ) : null}
        </Box>
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
            sx={{ width: "100%" }}
            type="email"
          />
          {warnings?.email ? (
            <Typography sx={{ color: "red" }}>{warnings?.email}</Typography>
          ) : null}
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
            sx={{ width: "100%" }}
            type="password"
          />
          {warnings?.password ? (
            <Typography sx={{ color: "red" }}>{warnings?.password}</Typography>
          ) : null}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "Roboto", fontSize: "20px", mb: 1 }}
          >
            Confirm Password
          </Typography>
          <TextField
            id="password_confirmation"
            label="Confirm Password"
            variant="outlined"
            required
            placeholder="Confirm Password"
            sx={{ width: "100%" }}
            type="password"
          />
          {warnings?.password_confirmation ? (
            <Typography sx={{ color: "red" }}>
              {warnings?.password_confirmation}
            </Typography>
          ) : null}
        </Box>
        <Button
          variant="contained"
          sx={{ width: "100%", mt: 2, p: 2 }}
          type="submit"
        >
          Register
        </Button>
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
