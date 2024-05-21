import React, { useRef, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Cancel, PhotoCamera } from "@mui/icons-material";
import Image from "next/image";

interface UploadFileProps {
  register: any;
  _setValue: any;
  errors: any;
  label: string;
  name: string;
  required: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader: React.FC<UploadFileProps> = ({ register, _setValue, label, name, errors, required, onChange }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: any) => {
    const files = event.target.files;
    if (files) {
      const validImages = Array.from(files).filter(
        (file: any) => file.type.includes("image/jpg") || file.type.includes("image/png") || file.type.includes("image/jpeg")
      );
      const uploadedImages = validImages.map((file: any) => URL.createObjectURL(file));
      setImages((prevImages) => prevImages.concat(uploadedImages as string[]));
      console.log("antes", name);
      _setValue(name, "cris");
      console.log("despues", name);
    }
  };

  /*   const handleImageUpload = (event: any) => {
    const files = event.target.files;
    if (files) {
      const validImages = Array.from(files).filter((file: any) => file.type.includes("image/jpg") || file.type.includes("image/png") || file.type.includes("image/jpeg"));
      const uploadedImages = validImages.map((file: any) => URL.createObjectURL(file));
      setImages((prevImages) => prevImages.concat(uploadedImages as string[]));
      // Almacena la información de los archivos en el estado de tu formulario, si es necesario
      // Por ejemplo:
      // setFormData({ ...formData, images: uploadedImages });
      _setValue(name, files);
    }
  }; */
  const removeImage = (index: any) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const selectRef = useRef<any>(null);

  return (
    <Box>
      <Box mb={2}>
        <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
          {label}
          {/*  <Controller
            name={name}
            control={_control}
            rules={{ required: { value: required, message: `${label} is required` } }}
            render={({ field }) => <input {...field} ref={selectRef} type="file" accept="image/jpeg, image/png" multiple hidden onChange={handleImageUpload} />}
          /> */}
          <input
            {...register(name, {
              required: { value: required, message: `${label} is required` },
            })}
            type="file"
            name={name}
            accept="image/jpeg, image/png"
            multiple
            hidden
            onChange={handleImageUpload}
          />
        </Button>
      </Box>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item key={index}>
            <Box position="relative">
              <Image src={image} alt={`Imagen ${index}`} style={{ maxWidth: "200px" }} />
              <IconButton color="error" size="small" style={{ position: "absolute", top: 0, right: 0 }} onClick={() => removeImage(index)}>
                <Cancel fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
      {errors[name] && typeof errors[name].message === "string" && <Typography color="error">{errors[name].message}</Typography>}
    </Box>
  );
};
