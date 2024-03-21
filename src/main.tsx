import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/main/Main.tsx";
import { NextUIProvider } from "@nextui-org/react";
import Test from "./pages/test/Test.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/flashcard",
    element: <Main />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Flashcardy!</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </head>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
