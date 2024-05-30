import {
  Autocomplete,
  Box,
  InputAdornment,
  CircularProgress,
  TextField,
  Typography,
  NativeSelect,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { FirstPage } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

interface SelectProps<T> {
  _control: any;
  _setValue: any;
  errors: any;
  label: string;
  name: string;
  size?: any;
  required: boolean;
  listaData: T[];
}

/* EJEMPLO DE USO
   <SelectCC _control={control} _setValue={setValue} label=" Areas" name="area" size="small" required={true} errors={errors} listaData={listaAreas} />
 */
export const SelectCC: React.FC<SelectProps<any>> = ({ _control, _setValue, label, name, size, required, errors, listaData }) => {
  const listaAux = [
    {
      label: "No options",
      value: "-1",
    },
  ];

  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const selectRef = useRef<any>(null);

  const handleDateChange = (newval: any) => {
    setSelectedOpt(newval);
    if (newval) {
      _setValue(name, newval.value);
    }
  };

  return (
    <div>
      <Controller
        name={name}
        control={_control}
        rules={{ required: { value: required, message: `${label} is required` } }}
        render={({ field }) => (
          <Autocomplete
            fullWidth
            id={name}
            options={listaData ? listaData : listaAux}
            size={size}
            value={selectedOpt}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(event, newValue) => {
              handleDateChange(newValue);
            }}
            renderInput={(params) => (
              <Box>
                <TextField {...params} ref={selectRef} label={required ? "* " + label : "" + label} />
              </Box>
            )}
          />
        )}
      />

      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};

interface Select2Props<T> {
  register: any;
  errors: any;
  label: string;
  name: string;
  size?: any;
  required: boolean;
}

export const SelectStatusCC: React.FC<Select2Props<any>> = ({ register, label, name, size, required, errors }) => {
  const [status, setStatus] = useState("2");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor={name}>
          {label}
        </InputLabel>
        <Select
          {...register(name, {
            required: { value: required, message: `${label} is required` },
          })}
          size={size}
          id={name}
          value={status}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value={2}>ACTIVO</MenuItem>
          <MenuItem value={0}>INACTIVO</MenuItem>
        </Select>
      </FormControl>
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};
