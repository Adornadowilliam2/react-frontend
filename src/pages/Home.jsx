import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import checkAuth from "../hoc/checkAuth";
import Navbar from "../components/ui/Navbar";

import { Box } from "@mui/material";
import Recent from "../components/ui/Recent";
import Login from "./Login";
import MyCalendar from "../components/ui/MyCalendar";

import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { index } from "../api/booking";
import { retrieveUser } from "../api/user";
import { retrieveRoom } from "../api/room";
import RoomCard from "../components/ui/RoomCard";

function Home() {
  const user = useSelector((state) => state.auth.user);
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const retrieve = () => {
    index(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        setRows(res.data);
      }
    });
    retrieveUser(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        setUsers(res.data);
      }
    });
    retrieveRoom(cookies.AUTH_TOKEN).then((res) => {
      if (res?.ok) {
        setRooms(res.data);
      }
    });
  };
  useEffect(() => {
    retrieve();
  }, []);
  const [roomcard, setRoomCard] = useState(false);
  return (
    <>
      {user ? (
        <Box>
          <Navbar user={user} setRoomCard={setRoomCard} roomcard={roomcard} />
          {roomcard ? <RoomCard rooms={rooms} /> : null}
          <Box
            sx={{
              background: "aliceblue",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Recent rooms={rooms} users={users} rows={rows} />
            <MyCalendar />
          </Box>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
}
export default checkAuth(Home);
