/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";

import { bgGradient } from "@/theme/css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { InputPassCC, InputTextCC } from "../../components/input";
import { AccountCircle } from "@mui/icons-material";
import { SweetNotifyError } from "@/app/components/sweet-notificacion";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";

// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();
  const theme = useTheme();
  /* TODO: código para realizar las validaciones del formulario, uso hooks */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* cierro código */

  /* TODO: Metodo login */
  const Login = handleSubmit(async (data) => {
    let username = data.username;
    let password = data.password;

    try {
      /*Validamos las credenciales de acceso usando nextauth*/
      const responseNextAuth = await signIn("credentials", { username, password, redirect: false });

      if (responseNextAuth?.ok) {
        /*Obtener la sesión con los datos del usuario usando nextauth*/
        const session = await getSession();
        Swal.fire({
          title: "OK",
          text: `Bienvenido al sistema ${session?.user?.name}`,
          icon: "success",
        });
        /*si las validaciones estan todo bien me redirecciono al Dashboard*/
        router.push("/dashboard");
      } else {
        if (responseNextAuth?.error == "") {
          SweetNotifyError({ message: "Error al cominicarse con el servicio de la base de datos" });
        } else {
          SweetNotifyError({ message: `${responseNextAuth?.error}` });
        }
      }
    } catch (error) {
      console.log("Error durante el proceso de signIn:" + error);
    }
  });

  /* cierro código */
  const renderForm = (
    <form onSubmit={Login}>
      <Stack spacing={3}>
        <InputTextCC
          register={register}
          label=" User or Email address"
          icon={<AccountCircle />}
          type="text"
          name="username"
          required={true}
          errors={errors}
        />
        <InputPassCC register={register} label="Password" name="password" required={false} errors={errors} />
      </Stack>
      <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        sx={{ my: 4 }}
        variant="contained"
        style={{ backgroundColor: "#212B36", color: "white", fontWeight: "bold", padding: "10px", borderRadius: "8px" }}
        onClick={Login}
      >
        Login
      </LoadingButton>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "} Departamento IT | CLP {new Date().getFullYear()}
        {"."}
      </Typography>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_3.jpg",
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography variant="h3" fontWeight="bold">
              Bienvenido a ZAMI
            </Typography>
            <br />
            <Image src="/images/logos/Logo1.png" alt="Banner clp" width={70} height={70} />
          </Box>
          <br />

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Start Sesion
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
