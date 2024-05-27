import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputTextProps {
  register: any;
  errors: any;
  label: string;
  icon?: any;
  type: string;
  name: string;
  size?: string;
  required: boolean;
}

/* EJEMPLO DE USO  
  <InputTextCC register={register} label=" Programa" icon={<AlarmAddRoundedIcon />} type="text" name="programa" placeholder="Liderazgo CLP" required={true} errors={errors} />
 */
export const InputTextCC: React.FC<InputTextProps> = ({ register, label, icon, type, name, size, required, errors }) => {
  return (
    <div>
      <TextField
        fullWidth
        size={size}
        type={type}
        {...register(name, {
          required: { value: required, message: `${label} is required` },
        })}
        name={name}
        label={required ? (name === "username" ? "" + label : "*" + label) : "" + label}
        id={name}
        InputProps={{
          endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
        }}
      />
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};

/*  <InputTextCC_
   register={register}
   label=" Programa2"
   icon={<AlarmAddRoundedIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />}
   type="text"
   name="programa2"
   placeholder="Liderazgo CLPdddd"
   required={true}
   errors={errors}
 />; */
export const InputTextCC_: React.FC<InputTextProps> = ({ register, label, icon, type, name, required, errors }) => {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        {icon}
        <TextField
          {...register(name, {
            required: { value: required, message: `${label} is required` },
          })}
          fullWidth
          type={type}
          label={required ? "* " + label : "" + label}
          id={name}
          variant="standard"
        />
      </Box>

      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};

interface InputTextAreaProps {
  register: any;
  errors: any;
  label: string;
  icon?: any;
  name: string;
  size?: string;
  required: boolean;
  rows: number;
}
export const InputTextAreaCC: React.FC<InputTextAreaProps> = ({ register, label, icon, name, size, required, errors, rows }) => {
  return (
    <div>
      <TextField
        fullWidth
        size={size}
        {...register(name, {
          required: { value: required, message: `${label} is required` },
        })}
        name={name}
        label={required ? "* " + label : "" + label}
        id={name}
        rows={rows}
        multiline
        InputProps={{
          endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
        }}
      />
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};

interface InputPassProps {
  register: any;
  errors: any;
  label: string;
  name: string;
  size?: string;
  required: boolean;
}
/* <InputPassCC register={register} label="Password" name="password" size="small" required={true} errors={errors}></InputPassCC>; */
export const InputPassCC: React.FC<InputPassProps> = ({ register, label, name, size, required, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        size={size}
        {...register("password", {
          required: { value: true, message: `Password is required` },
        })}
        name={name}
        label={required ? "* " + label : "" + label}
        id={name}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};

interface InputRadioProps {
  register: any;
  errors: any;
  label: string;
  icon?: any;
  name: string;
  required: boolean;
}

export const InputRadiotCC: React.FC<InputRadioProps> = ({ register, label, icon, name, required, errors }) => {
  return (
    <div>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{required ? "* " + label : "" + label}</FormLabel>
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name={name} id={name}>
          <FormControlLabel
            {...register(name, {
              required: { value: required, message: `${label} is required` },
            })}
            value="SI"
            control={<Radio />}
            label="SI"
          />
          <FormControlLabel
            {...register(name, {
              required: { value: required, message: `${label} is required` },
            })}
            value="NO"
            control={<Radio />}
            label="NO"
          />
        </RadioGroup>
      </FormControl>
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};
