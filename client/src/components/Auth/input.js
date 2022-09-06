import { TextField } from "@mui/material";

export const Input = ({ label, name, myAccount, setMyAccount }) => {
  return (
    <TextField
      label={label}
      className="w-100 my-2"
      onChange={(e) => {
        setMyAccount({ ...myAccount, [name]: e.target.value });
      }}
    />
  );
};
