import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";

const Guard: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [secret] = useLocalStorage("secret", "");

  useEffect(() => {
    if (!secret || secret !== import.meta.env.VITE_API_KEY) {
      navigate("/403", { replace: true });
    }
  }, [secret, navigate]);

  return <>{children}</>;
};

export default Guard;
