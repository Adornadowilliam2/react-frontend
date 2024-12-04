import React from "react";
import { useSelector } from "react-redux";
import checkAuth from "../hoc/checkAuth";
import Navbar from "../components/ui/Navbar";

import { Box } from "@mui/material";
import Recent from "../components/ui/Recent";
import Login from "./Login";

function Home() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {user ? (
        <Box>
          <Navbar user={user} />
          <Box
            sx={{
              background: "aliceblue",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Recent />
          </Box>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
}
export default checkAuth(Home);
