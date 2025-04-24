import { FUNCTIONS } from "@/models/enum";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const values = Object.values(FUNCTIONS.SERVICE);

  const [tenant, setTenant] = useState("_iac3p");
  const [email, setEmail] = useState("");
  const [prefix, setPrefix] = useState(FUNCTIONS.SERVICE.AUTH.toString());

  const [isCheck, setIsCheck] = useState(false);

  const handleClick = () => {
    setIsCheck(!isCheck);
    navigate(
      `${location.pathname}?tenant=${tenant}&prefix=${prefix}&email=${email}`
    );
  };

  const clear = () => {
    setTenant("");
    setEmail("");
    setPrefix(FUNCTIONS.SERVICE.AUTH.toString());
    setIsCheck(!isCheck);
    navigate(`${location.pathname}`);
  };

  return (
    <div className="flex gap-2 mx-auto max-w-5xl p-8 justify-center">
      <Input
        placeholder="Enter tenant"
        value={tenant}
        className="w-32"
        onChange={(e) => setTenant(e.target.value)}
      />
      <Input
        placeholder="Enter email employee"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-80"
      />
      <Select onValueChange={(value) => setPrefix(value)}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Service " />
        </SelectTrigger>
        <SelectContent>
          {values.map((value, index) => (
            <SelectItem key={index} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleClick}>Check</Button>
      {isCheck && (
        <Button onClick={clear} variant="destructive">
          Clear
        </Button>
      )}
    </div>
  );
};

export default FormCheck;
