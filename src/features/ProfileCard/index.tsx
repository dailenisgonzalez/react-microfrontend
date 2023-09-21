/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from "react";
import { fromEvent } from "rxjs";
import getCookie from "../../utils/getCookie";
import Profile from "./Profile";

function getToken() {
  const token$ = fromEvent(window, "token");
  const [token, setToken] = useState(getCookie("token"));
  useEffect(() => {
    const getToken = token$.subscribe(async (x) => {
      setToken(x["detail"]["answer"]);
    });
    return () => {
      getToken;
    };
  }, []);
  return token;
}

function getUser() {
  const user$ = fromEvent(window, "user");
  const [user, setUser] = useState(getCookie("user"));
  useEffect(() => {
    const getUser = user$.subscribe(async (x) => {
      setUser(x["detail"]["answer"]);
    });
    return () => {
      getUser;
    };
  }, []);
  return user;
}

export default function ClockCard() {
  const token = getToken();
  const user = getUser();
  return <Profile token={token} user={user} />;
}
