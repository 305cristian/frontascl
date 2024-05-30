/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

import {
  FirstPage,
  LastPage,
  Checklist,
  Article,
  PostAdd,
  FileCopy,
  Task,
  FormatListNumbered,
  CheckCircleOutline,
  TaskAlt,
  BorderAll,
  NoteAdd,
} from "@mui/icons-material";
import {
  Container,
  Stack,
  Typography,
  Divider,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  CardMedia,
  Badge,
} from "@mui/material";
import { Steps, Panel } from "rsuite";
import BaseCard from "../../components/shared/BaseCard";
import { UploaderMinCC } from "../../components/uploader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageContainer from "../../components/container/PageContainer";
import { InputRadiotCC, InputTextAreaCC, InputTextCC } from "../../components/input";
import { DateCC, TimeCC } from "../../components/date-hour";
import { SelectCC } from "../../components/select-option";
import { GetProgramas, GetTurnos, GetLugarObs, GetProyectos, GetAreas } from "@/app/api/dataApiComponents";
import { useResponsive } from "@/hooks/use-responsive";
import axios from "axios";
import { Account } from "@/app/_mock/account";
import { SweetNotifyError, SweetNotifySuccess } from "@/app/components/sweet-notificacion";
import PreviewReport from "./reports/viewpreview";
import { useRouter } from "next/navigation";

//--------------------------------------------------------
export default function FormOPT() {
  const account = Account();

  const authCredentials = {
    username: process.env.NEXT_PUBLIC_USER || "",
    password: process.env.NEXT_PUBLIC_PASS || "",
  };
  const route = useRouter();
  const upLg = useResponsive("up", "lg");

  const [listaAreas, setlistaAreas] = useState<any[]>([]);
  const [listaProgramas, setlistaProgramas] = useState<any[]>([]);

  const [listaProyectos, setlistaProyectos] = useState<any[]>([]);
  const [listaTurnos, setlistaTurnos] = useState<any[]>([]);
  const [listaLugarObs, setlistaLugarObs] = useState<any[]>([]);
  //--------------------------------------------------------------------
  const [datospreview, setDatosPreview] = useState<any[]>([]);
  const [datospreview2, setDatosPreview2] = useState<any[]>([]);
  const [imagespreview, setImagesPreview] = useState<any[]>([]);
  const [alldatosform, setAlldatosForm] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(0);
  const [step, setStep] = useState(0);
  const [namePanel, setnamePanel] = useState(" : Informacion General");

  //-------------------------------------------------------------------
  const [showReport, setShowReport] = useState(false);
  const [idPrograma, setIdPrograma] = useState(0);

  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onChange = (nextStep: any) => {
    setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep);
    setShowForm(nextStep);
    setnamePanel(nextStep === 0 ? " : Información General" : " : Revisión y finalización");
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  useEffect(() => {
    loadDataApi();
  }, []);

  async function loadDataApi() {
    const areas = await GetAreas();
    const programas = await GetProgramas();
    const lugares = await GetLugarObs();
    const turnos = await GetTurnos();
    const proyectos = await GetProyectos();
    setlistaAreas(areas);
    setlistaProgramas(programas);
    setlistaProyectos(proyectos);
    setlistaTurnos(turnos);
    setlistaLugarObs(lugares);
  }

  const registrarProceso = handleSubmit(async (data: any) => {
    //console.log(data);
    if (showForm === 1) {
      const datos = {
        programa: { idPrograma: data.programa },
        fecha: data.fecha,
        proyecto: { idProyecto: data.proyecto },
        area: { idArea: data.area },
        lugarObservacion: { idLugarObser: data.lugarobs },
        turno: { idTurno: data.turno },

        //----staticos--------
        statusAscl: 2,
        acslGeneralAct: { idListActLiderazgo: 3 },
        usuarios: { idUser: account.idUser },
      };
      try {
        let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/save-ascl`, datos, { auth: authCredentials });
        //await registrarPreguntas(data, response.data.object.idAscl); // TODO: NO HAY PREGUNTAS EN ESTE PROGRAMA

        const responseMedia = await registrarMedia(data, response.data.object.idAscl);
        const responseMediaDet = await registrarMediaDet(data.imagenes, responseMedia.idMedia, response.data.object.idAscl);

        if (responseMediaDet) {
          onNext();
          setIdPrograma(response.data.object.idAscl);
          //Cargamos las imagenes a BUCKET S3
          await uploadImagesS3(data.imagenes, response.data.object.idAscl);
        } else {
          SweetNotifyError({ message: "A ocurrido un error al cargar las imagenes" });
        }
      } catch (error) {
        console.error("Error de comunicacion con el servicio amazonas", error);
      }
    } else {
      getDatosPreview(data);
      onNext();
    }
  });

  async function registrarMedia(data: any, idAscl: any) {
    const datos = {
      idAcslGeneral: {
        idAscl: idAscl,
      },
      descripcionMedia: "N/A",
      accionMedia: data.accion,
      nesesidadMedia: data.necesidad,
      compromisoMedia: data.compromiso,
      statusMedia: "1",
    };
    //console.log(datos);
    try {
      let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/save-media`, datos, { auth: authCredentials });
      return response.data.status == "success" ? response.data.object : false;
    } catch (error) {
      console.error("Error de comunicacion con el servicio amazonas", error);
    }
  }

  async function registrarMediaDet(imagenes: any, idMedia: any, id: any) {
    const datos = imagenes.map((val: any) => ({
      s3Url: "/go-zami/ssa/opt/",
      nameImg: `${id}_${val.blobFile.name}`,
      idAllMedia: {
        idMedia: idMedia,
      },
    }));

    try {
      //console.log("datos imagenes: ", datos);
      let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/save-media-det`, datos, { auth: authCredentials });
      return response.data.status == "success" ? true : false;
    } catch (error) {
      console.error("Error de comunicacion con el servicio amazonas", error);
    }
  }

  type ImagesType = {
    blobFile: File;
  };
  const uploadImagesS3 = async (images: ImagesType[], id: any): Promise<void> => {
    images.map(async (val) => {
      try {
        const formData = new FormData();
        formData.append("image", val.blobFile);
        formData.append("ruta", "go-zami/ssa/opt/");
        formData.append("id", id);
        const headers = {
          "Content-Type": "multipart/form-data",
        };

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/s3`, formData, { headers });
        if (data.success) {
          console.log(data.message, data.data.url);
        }
      } catch (error) {
        console.log(error);
        SweetNotifyError({ message: "Error al comunicarse con s3: " + error });
      }
    });
  };

  function getDatosPreview(data: any) {
    //console.log("data: ", data);
    //console.log("lista proyectos", listaProyectos);
    let preview = [
      {
        key: "Programa",
        value: listaProgramas.find((obj) => obj.value === data.programa)?.label,
      },
      {
        key: "Fecha de la Reunion",
        value: data.fecha,
      },
      {
        key: "Proyecto",
        value: listaProyectos.find((obj) => obj.value === data.proyecto)?.label,
      },
      {
        key: "Área Responsable",
        value: listaAreas.find((obj) => obj.value === data.area)?.label,
      },
      {
        key: "Lugar de la observación",
        value: listaLugarObs.find((obj) => obj.value === data.lugarobs)?.label,
      },
      {
        key: "Turno",
        value: listaTurnos.find((obj) => obj.value === data.turno)?.label,
      },

      {
        key: "Actividad de Lideraszgo",
        value: "OPT (Observacion Planificada de Tareas)",
      },
    ];
    let preview2 = [
      {
        key: "Necesidad",
        value: data.necesidad,
      },
      {
        key: "Acción",
        value: data.accion,
      },
      {
        key: "Compromiso",
        value: data.compromiso,
      },
    ];
    setAlldatosForm(data);
    setImagesPreview(data.imagenes);
    setDatosPreview(preview);
    setDatosPreview2(preview2);
    //console.log("previer", preview);
    //console.log("imagespreview ", data.imagenes);
  }

  const showReporte = () => {
    new Promise(() => {
      setTimeout(() => {
        setShowReport(true);
      }, 1);
    });

    setShowReport(false);
  };

  const newRegister = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_HOST_URL}/pages/ssa/formopt `;
    //route.push("/pages/ssa/formopt");
  };

  return (
    <PageContainer title="SSA - Inspecciones" description="SSA - OPT (Observacion Planificada de Tareas)">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">SSA - OPT (Observacion Planificada de Tareas)</Typography>
        </Stack>
        <Divider sx={{ borderStyle: "revert", m: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="">
              <Stack spacing={3}>
                <div>
                  <Box
                    component="form"
                    onSubmit={registrarProceso}
                    sx={{
                      alignItems: "center",
                      maxWidth: 900,
                      mx: "auto",
                      mt: 2,
                    }}
                  >
                    <div>
                      <Steps current={step}>
                        <Steps.Item title={step === 0 ? "In Progress" : step === 1 ? "Finished" : "Waiting"} description="Información General" />
                        <Steps.Item title={step === 1 ? "In Progress" : step === 2 ? "Finished" : "Waiting"} description="Revisión y finalización" />
                      </Steps>

                      <hr />

                      <Panel header={<Typography>OPT (Observacion Planificada de Tareas) - Sección {step + 1 + namePanel}</Typography>}>
                        {showForm == 0 && (
                          <Box component="section">
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={12}>
                                <SelectCC
                                  _control={control}
                                  _setValue={setValue}
                                  label=" Programa"
                                  name="programa"
                                  size="small"
                                  required={true}
                                  errors={errors}
                                  listaData={listaProgramas}
                                />
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <DateCC _control={control} _setValue={setValue} label="Fechas" name="fecha" required={true} errors={errors} />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <SelectCC
                                  _control={control}
                                  _setValue={setValue}
                                  label=" Proyecto"
                                  name="proyecto"
                                  size="small"
                                  required={true}
                                  errors={errors}
                                  listaData={listaProyectos}
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <SelectCC
                                  _control={control}
                                  _setValue={setValue}
                                  label=" Areas"
                                  name="area"
                                  size="small"
                                  required={true}
                                  errors={errors}
                                  listaData={listaAreas}
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <SelectCC
                                  _control={control}
                                  _setValue={setValue}
                                  label=" Lugar de Observacion"
                                  name="lugarobs"
                                  size="small"
                                  required={true}
                                  errors={errors}
                                  listaData={listaLugarObs}
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <SelectCC
                                  _control={control}
                                  _setValue={setValue}
                                  label=" Turno"
                                  name="turno"
                                  size="small"
                                  required={true}
                                  errors={errors}
                                  listaData={listaTurnos}
                                />
                              </Grid>
                            </Grid>
                            <Divider sx={{ borderStyle: "revert", m: 2 }} />
                            {upLg ? (
                              <TableContainer component={Paper} style={{ border: "1px solid #EBEDEF", padding: "5px" }}>
                                <Table aria-label="a dense table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <Typography variant="h4">Necesidad identificada</Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="h4">Acción</Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Typography variant="h4">Compromiso</Typography>
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>
                                        <InputTextAreaCC
                                          register={register}
                                          label="Necesidad"
                                          icon={<FileCopy />}
                                          name="necesidad"
                                          required={true}
                                          errors={errors}
                                          rows={3}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <InputTextAreaCC
                                          register={register}
                                          label="Acción"
                                          icon={<FileCopy />}
                                          name="accion"
                                          required={true}
                                          errors={errors}
                                          rows={3}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <InputTextAreaCC
                                          register={register}
                                          label="Compromiso"
                                          icon={<FileCopy />}
                                          name="compromiso"
                                          required={true}
                                          errors={errors}
                                          rows={3}
                                        />
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell colSpan={3}>
                                        Adjuntar Fotografías
                                        <Grid item xs={12} md={12}>
                                          <UploaderMinCC
                                            _control={control}
                                            label=" Adjuntar fotografias"
                                            name="imagenes"
                                            required={true}
                                            multiple={true}
                                            errors={errors}
                                            shouldFocus={false}
                                          />
                                        </Grid>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            ) : (
                              <TableContainer component={Paper} style={{ border: "1px solid #EBEDEF", padding: "5px" }}>
                                <Table aria-label="a dense table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell colSpan={3}>
                                        <Typography variant="h4">Necesidad identificada - Acción- Compromiso</Typography>
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell colSpan={3}>
                                        <InputTextAreaCC
                                          register={register}
                                          label="Necesidad"
                                          icon={<FileCopy />}
                                          name="necesidad"
                                          required={true}
                                          errors={errors}
                                          rows={3}
                                        />
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell colSpan={3}>
                                        <InputTextAreaCC
                                          register={register}
                                          label="Acción"
                                          icon={<FileCopy />}
                                          name="accion"
                                          required={true}
                                          errors={errors}
                                          rows={3}
                                        />
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell colSpan={3}>
                                        <InputTextAreaCC
                                          register={register}
                                          label="Compromiso"
                                          icon={<FileCopy />}
                                          name="compromiso"
                                          required={true}
                                          errors={errors}
                                          rows={3}
                                        />
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell colSpan={3}>
                                        Adjuntar Fotografías
                                        <Grid item xs={12} md={12}>
                                          <UploaderMinCC
                                            _control={control}
                                            label=" Adjuntar fotografias"
                                            name="imagenes"
                                            required={true}
                                            multiple={true}
                                            errors={errors}
                                            shouldFocus={false}
                                          />
                                        </Grid>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            )}
                          </Box>
                        )}
                        {showForm == 1 && (
                          <Box component="section">
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                                <TableContainer component={Paper}>
                                  <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell width="350px">
                                          <Typography variant="h3">
                                            <CheckCircleOutline />
                                            Datos Generales
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {datospreview.map((val, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                              {val.key}:
                                            </TableCell>
                                            <TableCell>{val.value}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                  <br />
                                  <Table aria-label="a dense table" size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell width="350px">
                                          <Typography variant="h3">
                                            <CheckCircleOutline />
                                            Acciones
                                          </Typography>
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {datospreview2.map((val, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                              {val.key}:
                                            </TableCell>
                                            <TableCell>{val.value}</TableCell>
                                          </TableRow>
                                        );
                                      })}
                                      <TableRow>
                                        <TableCell colSpan={2}>
                                          <Grid container spacing={2} p={2}>
                                            {imagespreview.map((image, index) => (
                                              <Grid item key={index} xs={12} sm={6} md={4}>
                                                <CardMedia
                                                  component="img"
                                                  height="100"
                                                  image={URL.createObjectURL(image.blobFile)}
                                                  style={{ objectFit: "contain" }} // Esto asegura que la imagen se ajuste al tamaño especificado
                                                  alt={image.name}
                                                />
                                              </Grid>
                                            ))}
                                          </Grid>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                        {showForm == 2 && (
                          <Box sx={{ textAlign: "center", padding: 2 }}>
                            <TaskAlt sx={{ fontSize: 70, color: "#00A76F" }} />
                            <Typography variant="h3" color="#00A76F">
                              Programa Registrado exitosamente
                            </Typography>
                            <br />
                            <Task sx={{ fontSize: 200, color: "#566573" }} />
                            <br />
                            <Button onClick={showReporte} variant="contained" color="primary">
                              <Article />  Ver Reporte
                            </Button>
                            {showReport && <PreviewReport idPrograma={idPrograma} />}
                            <br />
                            <br />
                            <Button onClick={newRegister} variant="contained" color="success">
                              <NoteAdd />  Nuevo
                            </Button>
                          </Box>
                        )}
                        <br />
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          {showForm < 2 && (
                            <div>
                              <ButtonGroup>
                                <Button color="primary" onClick={onPrevious} disabled={step === 0} startIcon={<FirstPage />}>
                                  Previous
                                </Button>
                                <Button type="submit" color="primary" disabled={step === 1} endIcon={<LastPage />}>
                                  Next
                                </Button>
                              </ButtonGroup>
                            </div>
                          )}
                          <div>
                            {showForm == 1 && (
                              <Button color="primary" variant="contained" type="submit" startIcon={<Checklist />}>
                                Finalizar
                              </Button>
                            )}
                          </div>
                        </Box>
                      </Panel>
                    </div>
                  </Box>
                </div>
              </Stack>
            </BaseCard>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}
