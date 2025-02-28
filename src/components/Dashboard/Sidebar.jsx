import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate, Outlet } from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Logout_btn from "../Navbar/Logout_btn";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const nave = (text) => {
    const navigate = useNavigate();
    return () => {
      {if(text === "dashboard")navigate("/dashboard")};
      {if(text === "Projects")navigate("/dashboard/display")};
      {if(text === "Home")navigate("/")};
      {if(text === "Contact Us")navigate("/contact")};
      {if(text === "About Us")navigate("/about")};
    };
  };


  const DrawerList = (
    <Box sx={{ width: 250, height: "100%",display: "flex", flexDirection: "column" }} role="presentation" onClick={toggleDrawer(false)}>
        <div className="display flex flex-col p-0 m-0 justify-space-between  h-full">
      <List sx={{ display: "flex",flexDirection: "column", justifyContent: "start",height: "100%",gap: 2 }}>
        {["Home", "Projects", "Contact Us", "About Us"].map((text, index) => (
          <ListItem key={text} disablePadding  sx={{ color: "blue"}} onClick={nave(text)}>
            <ListItemButton >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      </div>
        <div className="p-4 m-0 bg-gray-100/90 mb-10 flex items-center flex-col gap-2 mx-5 rounded border border-gray-300">
      <Logout_btn/>
        </div>
    </Box>
  );

  return (
    <>
      <div className="p-0 m-0 fixed top-20 -left-3 z-50 bg-blue-800/80 rounded hover:bg-blue-800 ">
        <Button
          onClick={toggleDrawer(true)}
          sx={{ color: "white", 
            margin: "0px",
            marginRight: "-10px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "rgb(3, 32, 50)", // Fix: 'Color' -> 'color'
              transform: "scale(1.1) translateX(5px)", // Slightly enlarge & shift right
            },
          }}
        >
          <DoubleArrowIcon fontSize="large"/>
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
      <Outlet />
    </>
  );
}
