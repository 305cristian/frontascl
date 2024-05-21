import { useEffect, useRef, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { Box, Grid, Typography } from "@mui/material";
import "rsuite/dist/rsuite.min.css";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DateRangePicker, { DateRange } from "rsuite/esm/DateRangePicker";
//------------------------------------------------------------------------

interface DataRangeProps {
  label: string;
  icon: any;
  name: string;
  _setValue?: any;
}

/* EJEMPLO DE USO
   <DataRangeCC _setValue={setValue} label=" date" icon={<Image />} name="fechas"  />
  */

export const DataRangeCC: React.FC<DataRangeProps> = ({ label, icon, name, _setValue }) => {
  const handleDateRangeChange = (value: DateRange | null) => {
    if (value) {
      const [startDate, endDate] = value;
      //setDateRange([startDate, endDate]);
      const formattedStartDate = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(endDate.getDate()).padStart(2, "0")}`;
      _setValue(name, [formattedStartDate, formattedEndDate]);
    }
  };

  return (
    <div>
      {/*    <label className="form-label" htmlFor={name}>
        <span className="fs-6">
          {icon}
          {label}
        </span>
      </label> */}

      <DateRangePicker
        onChange={handleDateRangeChange}
        defaultValue={[new Date(), new Date()]}
        format="dd-MM-yyyy"
        appearance="default"
        style={{ width: "100% " }}
      />
    </div>
  );
};

interface DateProps {
  _control: any;
  _setValue: any;
  label: string;
  name: string;
  required: boolean;
  errors: any;
}
/* 
  <DateCC _control={control} _setValue={setValue} label="Fechas" name="fecha" required={true} shouldFocus={false} errors={errors} />
 */
export const DateCC: React.FC<DateProps> = ({
  _control,
  _setValue,
  label,
  name,
  required,
  errors,
}) => {
  const selectRef = useRef<any>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: any) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
    setSelectedDate(formattedDate);
    _setValue(name, formattedDate);
  };

  return (
    <div>
      <Controller
        name={name}
        control={_control}
        rules={{ required: { value: required, message: `${label} is required` } }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                {...field}
                ref={selectRef}
                label={required ? "* " + label : label}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {},
                }}
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
      />

      {errors[name] && typeof errors[name].message === "string" && (
        <Typography color="error">{errors[name].message}</Typography>
      )}
    </div>
  );
};

interface HourProps {
  _control: any;
  _setValue: any;
  label: string;
  name: string;
  required: boolean;
  errors: any;
}
/* <TimeCC _control={control} _setValue={setValue} label="Hora" name="hora" required={true} shouldFocus={false} errors={errors} />; */
export const TimeCC: React.FC<HourProps> = ({
  _control,
  _setValue,
  label,
  name,
  required,
  errors,
}) => {
  const selectRef = useRef<any>(null);

  const [selectedHora, setSelectedDate] = useState<string | null>(null);

  const handleHoraChange = (hora: any) => {
    const formattedHora = hora ? dayjs(hora).format("H:m:s") : null;
    setSelectedDate(formattedHora);
    _setValue(name, formattedHora);
  };

  return (
    <div>
      <Controller
        name={name}
        control={_control}
        rules={{ required: { value: required, message: `${label} is required` } }}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <TimePicker
                {...field}
                ref={selectRef}
                label={required ? "* " + label : label}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {},
                }}
                value={selectedHora ? dayjs(selectedHora) : null}
                onChange={handleHoraChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
      />

      {errors[name] && typeof errors[name].message === "string" && (
        <Typography color="error">{errors[name].message}</Typography>
      )}
    </div>
  );
};
