import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CategoryIcon from "@mui/icons-material/Category";
import FeedbackIcon from "@mui/icons-material/Feedback";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Tooltip } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminSidebar = () => {
  const { isAuthenticated, logout } = useAuth();

  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleAdminLogout = async () => {
    await logout();
    navigate("/auth/admin/login");
  };

  console.log();

  return (
    <Sidebar>
      <Menu>
        <MenuItem
          style={{
            marginBottom: "40px",
            marginTop: "20px",
          }}
          icon={
            <MenuRoundedIcon
              onClick={() => {
                collapseSidebar();
              }}
            />
          }
        >
          <h2>ADMIN PANEL</h2>
        </MenuItem>
        <MenuItem
          icon={
            <Tooltip title="Dashboard" placement="right">
              <GridViewRoundedIcon />
            </Tooltip>
          }
          active={selectedItem === "Dashboard"}
          onClick={() => {
            handleItemClick("Dashboard");
            navigate("home");
          }}
          style={{
            backgroundColor:
              selectedItem === "Dashboard" ? "#f4f6fa" : "transparent",
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          icon={
            <Tooltip title="Users" placement="right">
              <PersonIcon />
            </Tooltip>
          }
          active={selectedItem === "Users"}
          onClick={() => {
            handleItemClick("Users");
            navigate("user/list");
          }}
          style={{
            backgroundColor:
              selectedItem === "Users" ? "#f4f6fa" : "transparent",
          }}
        >
          Users
        </MenuItem>

        <SubMenu
          label="Quiz"
          icon={
            <Tooltip title="Quiz" placement="right">
              <QuizIcon />
            </Tooltip>
          }
          defaultOpen={selectedItem.startsWith("Quiz")}
          active={selectedItem.startsWith("Quiz")}
          style={{
            backgroundColor: selectedItem.startsWith("Quiz")
              ? "#f4f6fa"
              : "transparent",
          }}
        >
          <MenuItem
            icon={<FiberManualRecordIcon sx={{ fontSize: "10px" }} />}
            active={selectedItem === "QuizList"}
            onClick={() => {
              handleItemClick("QuizList");
              navigate("quiz/list");
            }}
            style={{
              backgroundColor:
                selectedItem === "QuizList" ? "#f4f6fa" : "transparent",
            }}
          >
            List
          </MenuItem>
          <MenuItem
            icon={<FiberManualRecordIcon sx={{ fontSize: "10px" }} />}
            active={selectedItem === "QuizCreate"}
            onClick={() => {
              handleItemClick("QuizCreate");
              navigate("quiz/new");
            }}
            style={{
              backgroundColor:
                selectedItem === "QuizCreate" ? "#f4f6fa" : "transparent",
            }}
          >
            Create
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Question"
          icon={
            <Tooltip title="Question" placement="right">
              <QuestionAnswerIcon />
            </Tooltip>
          }
          defaultOpen={selectedItem.startsWith("Question")}
          active={selectedItem.startsWith("Question")}
          style={{
            backgroundColor: selectedItem.startsWith("Question")
              ? "#f4f6fa"
              : "transparent",
          }}
        >
          <MenuItem
            icon={<FiberManualRecordIcon sx={{ fontSize: "10px" }} />}
            active={selectedItem === "QuestionList"}
            onClick={() => {
              handleItemClick("QuestionList");
              navigate("question/list");
            }}
            style={{
              backgroundColor:
                selectedItem === "QuestionList" ? "#f4f6fa" : "transparent",
            }}
          >
            List
          </MenuItem>
          <MenuItem
            icon={<FiberManualRecordIcon sx={{ fontSize: "10px" }} />}
            active={selectedItem === "QuestionCreate"}
            onClick={() => {
              handleItemClick("QuestionCreate");
              navigate("question/new");
            }}
            style={{
              backgroundColor:
                selectedItem === "QuestionCreate" ? "#f4f6fa" : "transparent",
            }}
          >
            Create
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Category"
          icon={
            <Tooltip title="Category" placement="right">
              <CategoryIcon />
            </Tooltip>
          }
          defaultOpen={selectedItem.startsWith("Category")}
          active={selectedItem.startsWith("Category")}
          style={{
            backgroundColor: selectedItem.startsWith("Category")
              ? "#f4f6fa"
              : "transparent",
          }}
        >
          <MenuItem
            icon={<FiberManualRecordIcon sx={{ fontSize: "10px" }} />}
            active={selectedItem === "CategoryList"}
            onClick={() => {
              handleItemClick("CategoryList");
              navigate("category/list");
            }}
            style={{
              backgroundColor:
                selectedItem === "CategoryList" ? "#f4f6fa" : "transparent",
            }}
          >
            List
          </MenuItem>
          <MenuItem
            icon={<FiberManualRecordIcon sx={{ fontSize: "10px" }} />}
            active={selectedItem === "CategoryCreate"}
            onClick={() => {
              handleItemClick("CategoryCreate");
              navigate("category/new");
            }}
            style={{
              backgroundColor:
                selectedItem === "CategoryCreate" ? "#f4f6fa" : "transparent",
            }}
          >
            Create
          </MenuItem>
        </SubMenu>

        <MenuItem
          icon={
            <Tooltip title="Logout" placement="right">
              <LogoutRoundedIcon />
            </Tooltip>
          }
          onClick={handleAdminLogout}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default AdminSidebar;
