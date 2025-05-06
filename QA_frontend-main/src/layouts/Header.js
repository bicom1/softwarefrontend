import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Cookies from "universal-cookie";
import { logoutApi } from "../features/userApis";
import { ReactComponent as LogoWhite } from "../assets/images/logos/bi2.svg";
import user2 from "../assets/images/users/avatar.jpg";
import { socket } from "../socket";
import { getNotification } from "../features/userApis";
import moment from "moment";

const cookie = new Cookies();

const Header = () => {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("bicuserData"));
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenNotification, setDropdownOpenNotification] =
    useState(false);
  const [notification, setNotification] = useState([]);
  const [count, setCount] = useState(0);

  const handlerLogout = async () => {
    const res = await logoutApi();
    if (res.data.success === true) {
      localStorage.removeItem("bicuserData");
      cookie.remove("bictoken");
      nav("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    const gettingNotification = async () => {
      const res = await getNotification();
      setNotification(res?.data?.data);
    };
    if (user?.role === "admin") {
      gettingNotification();
    }
  }, [user?.role]); // Include user?.role as a dependency

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleNotification = () => {
    setDropdownOpenNotification((prevState) => !prevState);
    setCount(0);
  };

  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    socket.on("receive-notification", (data) => {
      setNotification((prev) => [data, ...prev]);
      setCount((prev) => prev + 1);
    });
    return () => {
      socket.off("receive-notification");
    };
  }, []); // Removed socket from the dependency array

  return (
    <Navbar className="fixed-header" color="light" font="dark" expand="md">
      <div className="d-flex align-items-center ">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse
        navbar
        isOpen={isOpen}
        style={{ backgroundColor: "#1B1B29 !important" }}
      >
        <Nav className="me-auto" navbar></Nav>
        {user?.role === "admin" && (
          <Dropdown
            style={{ position: "relative" }}
            isOpen={dropdownOpenNotification}
            toggle={toggleNotification}
          >
            {count > 0 && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  color: "#000",
                  backgroundColor: "#fff",
                  padding: "5px",
                  position: "absolute",
                  right: "-5px",
                  borderRadius: "20px",
                  height: "18px",
                }}
              >
                {count}
              </div>
            )}
            <DropdownToggle
              color="transparent"
              style={{ border: "1px solid #DBDBDB", borderRadius: "10px" }}
            >
              <i className="bi bi-bell-fill text-white" width="30"></i>
            </DropdownToggle>
            {notification.length > 0 ? (
              <DropdownMenu
                style={{
                  maxHeight: "490px",
                  minHeight: "90px",
                  overflowY: "scroll",
                }}
              >
                {notification.map((item, index) => (
                  <DropdownItem key={index}>
                    <div className="fw-bold">
                      {item.userName} {item.description}
                    </div>
                    <div className="text-sm">
                      {moment(item.lastActive).format("MMMM Do YYYY, h:mm a")}
                    </div>
                    <DropdownItem divider />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <span style={{ display: "flex", justifyContent: "center" }}>
                  no notification
                </span>
              </DropdownMenu>
            )}
          </Dropdown>
        )}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user2}
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Role: {user?.role}</DropdownItem>
            <DropdownItem>{user?.email}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handlerLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
