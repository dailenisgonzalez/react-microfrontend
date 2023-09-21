/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, Stack, TextField, styled } from "@mui/material";
import { useEffect } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Profile({ user, token }: any) {
  const [value, setValue] = React.useState(0);
  const [roles, setRoles] = React.useState();

  useEffect(() => {
    if (!token) return;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": token,
      },
    };
    fetch(
      "https://localhost:8443/rest/latest/translations/roles",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={2}>
      <Paper>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  label="Username"
                  id="username"
                  defaultValue="Username"
                  value={user.username}
                  fullWidth
                />
                <TextField
                  label="FirstName"
                  id="firstName"
                  defaultValue="firstName"
                  value={user.name}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  id="email"
                  defaultValue="email"
                  value={user.email}
                  fullWidth
                />
                <TextField
                  label="Phone"
                  id="phone"
                  defaultValue="phone"
                  value={user.phone}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Organization"
                  id="organization"
                  defaultValue="organization"
                  value={user.organization}
                  fullWidth
                />
                <TextField
                  label="Home Url"
                  id="homeUrl"
                  defaultValue="homeUrl"
                  value={user.homeUrl}
                  fullWidth
                />
              </div>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Paper>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Testing API call from React app 
        </Typography>
        <Typography>
          URL: https://localhost:8443/rest/latest/translations/roles{" "}
        </Typography>
        <Typography>Token: {token}</Typography>
        <br />
        <Typography>Result: </Typography>
        <Typography>{JSON.stringify(roles)}</Typography>
      </StyledPaper>
    </Stack>
  );
}
