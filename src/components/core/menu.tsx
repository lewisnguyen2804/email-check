"use client";

import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { Environment } from "./environment";

export const Menu = () => {
  const location = useLocation();
  const isUserPathname = location.pathname === "/user";
  const isEmailPathname = location.pathname === "/email";
  return (
    <div className="flex flex-row gap-4">
      <Environment />
      {isUserPathname && (
        <Button>
          <Link to="/email">Send Mail Loggers</Link>
        </Button>
      )}
      {isEmailPathname && (
        <Button>
          <Link to="/user">Check User Endpoints </Link>
        </Button>
      )}
    </div>
  );
};
