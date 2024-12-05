import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import FullScreenDialog from "./pages/FullScreenDialog";
import ModelViewer from "./pages/ModelViewer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/alien",
      element: <FullScreenDialog/>,
    },
    {
      path:"/modelviewer",
      element:<ModelViewer/>
    }
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
