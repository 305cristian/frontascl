import { Uploader, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import { PhotoCamera } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

/*EJEMPLO DE USO   
<UploaderCC _control={control} label=" Adjuntar fotografias" icon={<Image />} name="imagenes" placeholder=" Adjunte una foto" required={true} multiple={true} errors={errors} shouldFocus={false} />;
 */
export const UploaderCC = ({
  _control,
  label,
  name,
  required,
  multiple,
  errors,
  shouldFocus,
}: {
  _control: any;
  label: string;
  name: string;
  required: boolean;
  multiple: boolean;
  errors: any;
  shouldFocus: boolean;
}) => {
  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (shouldFocus && selectRef.current) {
      selectRef.current.open(); // Simula el enfoque llamando al método open()
    }
  }, [shouldFocus]);

  return (
    <div>
      <Controller
        name={name}
        control={_control}
        rules={{ required: { value: required, message: `${label} is required` } }}
        render={({ field }) => (
          <Uploader {...field} accept="image/png image/jpg image/jpeg" multiple={multiple} action="" autoUpload={false} listType="picture-text" ref={selectRef}>
            <Box border={1} borderColor="primary.main" borderRadius={2} p={1} mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" className="text-secondary fs-6">
                  {label}
                </Typography>
                <Box className="text-end">
                  <Button>
                    <PhotoCamera />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Uploader>
        )}
      />
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};

export const UploaderMinCC = ({
  _control,
  label,
  name,
  required,
  multiple,
  errors,
  shouldFocus,
}: {
  _control: any;
  label: string;
  name: string;
  required: boolean;
  multiple: boolean;
  errors: any;
  shouldFocus: boolean;
}) => {
  const selectRef = useRef<any>(null);

  useEffect(() => {
    if (shouldFocus && selectRef.current) {
      selectRef.current.open(); // Simula el enfoque llamando al método open()
    }
  }, [shouldFocus]);

  return (
    <div>
      <Controller
        name={name}
        control={_control}
        rules={{ required: { value: required, message: `${label} is required` } }}
        render={({ field }) => (
          <Uploader {...field} accept="image/png image/jpg image/jpeg" multiple={multiple} listType="picture-text" action="" autoUpload={false} ref={selectRef}>
            <Button style={{ fontSize: "26px" }}>
              <PhotoCamera />
            </Button>
          </Uploader>
        )}
      />
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </div>
  );
};
