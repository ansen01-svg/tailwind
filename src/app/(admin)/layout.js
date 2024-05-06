"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminHeader from "./components/admin_header/admin_header";
import DesktopAside from "./components/desktop_aside/desktop_aside";
import useMediaQuery from "../_lib/frontend/hooks/useMediaQuery";
import { drawerNavItems } from "../utils/arrays";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MaterialDesignContent, SnackbarProvider } from "notistack";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#2D7708",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "#970C0C",
  },
}));

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { mobileScreen } = useMediaQuery();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // automatically close mobile screen aside when
  // screen is mobile
  useEffect(() => {
    if (mobileScreen) {
      setOpen(false);
    }
  }, [mobileScreen]);

  // fetch user on load
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/getCurrentUser`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setUser(data.data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => console.log("fetch error-", error));
  }, []);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {drawerNavItems.map((navItem) => (
          <ListItem key={navItem.id} disablePadding>
            <ListItemButton onClick={() => router.push(navItem.link)}>
              <ListItemIcon>{navItem.icon}</ListItemIcon>
              <ListItemText
                primary={navItem.tittle}
                sx={{
                  ".MuiTypography-root": {
                    fontSize: "15px",
                    fontWeight: 500,
                    // fontFamily: "__Inter_e66fe9,__Inter_Fallback_e66fe9",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (mobileScreen) {
    return (
      <div className="max-w-full flex flex-col items-center justify-center">
        <AdminHeader toggleDrawer={toggleDrawer} user={user} />
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        />
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div className="max-w-full flex flex-row">
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      />
      <DesktopAside user={user} />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
