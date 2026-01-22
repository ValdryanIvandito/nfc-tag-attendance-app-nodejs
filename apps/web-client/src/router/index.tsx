/* src/router/index.ts */

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import Employee from "@/pages/Employee";
import Attendance from "@/pages/Attendance";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout titlePage="Summary Dashboard">
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/employee",
    element: (
      <MainLayout titlePage="Employee Management">
        <Employee />
      </MainLayout>
    ),
  },
  {
    path: "/attendance",
    element: (
      <MainLayout titlePage="Attendance Records">
        <Attendance />
      </MainLayout>
    ),
  },
]);
