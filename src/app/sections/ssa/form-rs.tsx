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
    List,
    FileCopy,
    FormatListNumbered,
    Check,
    DoneAll,
    CheckCircleOutline,
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
import {Steps, Panel} from "rsuite";
import BaseCard from "../../components/shared/BaseCard";
import {UploaderCC} from "../../components/uploader";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import PageContainer from "../../components/container/PageContainer";
import {InputRadiotCC, InputTextAreaCC, InputTextCC} from "../../components/input";
import {DateCC, TimeCC} from "../../components/date-hour";
import {SelectCC} from "../../components/select-option";
import {GetProgramas, GetTurnos, GetLugarObs, GetProyectos, GetAreas, GetPreguntas} from "@/app/api/dataApiComponents";
import axios from "axios";
import {SweetNotifySuccess} from "@/app/components/sweet-notificacion";
import {Account} from "@/app/_mock/account";

//---------------------------------------------------------

export default function FormRS() {
    const account = Account();

    const authCredentials = {
        username: process.env.NEXT_PUBLIC_USER || "",
        password: process.env.NEXT_PUBLIC_PASS || "",
    };

    const [listaAreas, setlistaAreas] = useState<any[]>([]);
    const [listaProgramas, setlistaProgramas] = useState<any[]>([]);
    const [listaProyectos, setlistaProyectos] = useState<any[]>([]);
    const [listaTurnos, setlistaTurnos] = useState<any[]>([]);
    const [listaLugarObs, setlistaLugarObs] = useState<any[]>([]);
    const [preguntas, setlistaPreguntas] = useState<any[]>([]);
    //----------------------------------------------------------------
    const [datospreview, setDatosPreview] = useState<any[]>([]);
    const [imagespreview, setImagesPreview] = useState<any[]>([]);
    const [alldatosform, setAlldatosForm] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(0);
    const [step, setStep] = useState(0);
    const [namePanel, setnamePanel] = useState(" : Informacion General");

    const {
        register,
        control,
        setValue,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const onChange = (nextStep: any) => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
        setShowForm(nextStep);
        setnamePanel(nextStep === 0 ? " : Información General" : nextStep === 1 ? " : Información adicional" : " : Revisión y finalización");
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
        const preg = await GetPreguntas(1);
        setlistaAreas(areas);
        setlistaProgramas(programas);
        setlistaProyectos(proyectos);
        setlistaTurnos(turnos);
        setlistaLugarObs(lugares);
        setlistaPreguntas(preg);
    }

    const registrarProceso = handleSubmit(async (data: any) => {
        if (showForm === 2) {
            // console.log("datos a guardar en la db", data);

            const datos = {
                programa: {idPrograma: data.programa},
                fecha: data.fecha,
                duracion: data.duracion, //null
                proyecto: {idProyecto: data.proyecto},
                area: {idArea: data.area},
                lugarObservacion: {idLugarObser: data.lugarobs},
                turno: {idTurno: data.turno},
                areaEspecifica: data.areaespecifica, //null
                nroParticipantes: data.participantes, //null
                //-----------------------------------------
                tema: null, //null
                desarrolloInteraccion: null, //null

                //----staticos--------
                statusAscl: 2,
                acslGeneralAct: {idListActLiderazgo: 1},
                usuarios: {idUser: account.idUser},
            };
            try {
                //console.log("datos a guardar en la db", datos);
                let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/save-ascl`, datos, {auth: authCredentials});
                //alert(response.data.message);
                //console.log(response.data.object);
                await registrarPreguntas(data, response.data.object.idAscl);
                const responseMedia = await registrarMedia(data, response.data.object.idAscl);

                const responseMediaDet = await registrarMediaDet(data.imagenes, responseMedia.idMedia);

                if (responseMediaDet) {
                    SweetNotifySuccess({
                        message: "El proceso ha sido registrado exitosamente",
                        redirectUrl: "pages/ssa/formrs",
                        /*  cargo las imagenes ya sea a firebase o a s3 de amazon */
                        //await registrarUploadImages(data.imagenes);
                    });
                } else {
                    alert("A ocurrido un error al cargar las imagenes");
                }
            } catch (error) {
                console.error("Error de comunicacion con el servicio amazonas", error);
            }
        } else if (showForm === 1) {
            //console.log(data);
            getDatosPreview(data);
            onNext();
        } else {
            onNext();
        }
    });

    async function registrarPreguntas(data: any, idAscl: any) {
        const datos = preguntas.map((val: any) => ({
            idActLiderazgoAdicional: {
                idActLiderazAdic: val.id,
            },
            idAsclGeneral: {
                idAscl: idAscl,
            },
            checkOption: data[`preg_${val.id}`],
            comentarios: data[`coment_${val.id}`],
            statusAcslDet: 2,
        }));
        // console.log(datos);
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/save-ascl-det`, datos, {auth: authCredentials});
            return response.data.status == "success" ? true : false;
        } catch (error) {
            console.error("Error de comunicacion con el servicio amazonas", error);
        }
    }

    async function registrarMedia(data: any, idAscl: any) {
        const datos = {
            idAcslGeneral: {
                idAscl: idAscl,
            },
            descripcionMedia: "N/A",
            accionMedia: "N/A",
            nesesidadMedia: "N/A",
            compromisoMedia: "N/A",
            statusMedia: "1",
        };
        //console.log(datos);
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/save-media`, datos, {auth: authCredentials});
            return response.data.status == "success" ? response.data.object : false;
        } catch (error) {
            console.error("Error de comunicacion con el servicio amazonas", error);
        }
    }

    async function registrarMediaDet(imagenes: any, idMedia: any) {
        const datos = imagenes.map((val: any) => ({
            s3Url: "url//www.com",
            nameImg: val.blobFile.name,
            idAllMedia: {
                idMedia: idMedia,
            },
        }));

        try {
            //console.log("datos imagenes: ", datos);
            let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/save-media-det`, datos, {auth: authCredentials});
            return response.data.status == "success" ? true : false;
        } catch (error) {
            console.error("Error de comunicacion con el servicio amazonas", error);
        }
    }

    const registrarUploadImages = async (images: [{
        name: "string";
        fileKey: "string";
        blobFile: { name: "string" }
    }]) => {
        images.map((val) => {
            /*  val.blobFil trae los fatos del file esto se envia a guardar en firebase o s3 */
            console.log(val.blobFile.name);
        });
        // console.log("lista de images s3 ", images);
    };

    function getDatosPreview(data: any) {
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
                key: "Hora del la Reunion",
                value: data.duracion,
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
                key: "Área específica",
                value: data.areaespecifica,
            },
            {
                key: "Número de Participantes",
                value: data.participantes,
            },
            {
                key: "Actividad de Lideraszgo",
                value: "REUNIONES DE SEGUIMIENTO",
            },
            ,
        ];
        setAlldatosForm(data);
        setImagesPreview(data.imagenes);
        setDatosPreview(preview);
        //console.log("previer", preview);
        //console.log("imagespreview ", data.imagenes);
    }

    return (
        <PageContainer title="SSA - Reuniones" description="SSA - Reuniones de seguimiento">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">SSA - Reuniones de seguimiento</Typography>
                </Stack>
                <Divider sx={{borderStyle: "revert", m: 2}}/>

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
                                                <Steps.Item
                                                    title={step === 0 ? "In Progress" : step === 1 || 2 ? "Finished" : "Waiting"}
                                                    description="Información General"/>
                                                <Steps.Item
                                                    title={step === 1 ? "In Progress" : step === 2 ? "Finished" : "Waiting"}
                                                    description="Información adicional"/>
                                                <Steps.Item
                                                    title={step === 2 ? "In Progress" : step === 3 ? "Finished" : "Waiting"}
                                                    description="Revisión y finalización"/>
                                            </Steps>
                                            <hr/>

                                            <Panel header={<Typography>Reuniones de seguimiento -
                                                Sección {step + 1 + namePanel}</Typography>}>
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
                                                            <Grid item xs={12} md={6}>
                                                                <DateCC _control={control} _setValue={setValue}
                                                                        label="Fechas" name="fecha" required={true}
                                                                        errors={errors}/>
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <TimeCC _control={control} _setValue={setValue}
                                                                        label="Duracion" name="duracion" required={true}
                                                                        errors={errors}/>
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

                                                            <Grid item xs={12} md={9}>
                                                                <InputTextCC
                                                                    register={register}
                                                                    label=" Área especifica"
                                                                    icon={<FileCopy/>}
                                                                    type="text"
                                                                    name="areaespecifica"
                                                                    size="small"
                                                                    required={true}
                                                                    errors={errors}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <InputTextCC
                                                                    register={register}
                                                                    label=" # Participantes"
                                                                    icon={<FormatListNumbered/>}
                                                                    type="number"
                                                                    name="participantes"
                                                                    size="small"
                                                                    required={true}
                                                                    errors={errors}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                )}
                                                {showForm == 1 && (
                                                    <Box component="section">
                                                        <Grid container spacing={3}>
                                                            {preguntas.map((data, index) => {
                                                                return (
                                                                    <Grid item xs={12} md={12} key={index}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <InputRadiotCC
                                                                                register={register}
                                                                                label={data.label}
                                                                                icon={<FileCopy/>}
                                                                                name={"preg_" + data.id}
                                                                                required={true}
                                                                                errors={errors}
                                                                            />
                                                                            <InputTextAreaCC
                                                                                register={register}
                                                                                label="Comentarios"
                                                                                icon={<FileCopy/>}
                                                                                name={"coment_" + data.id}
                                                                                required={false}
                                                                                errors={errors}
                                                                                rows={1}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                );
                                                            })}

                                                            <Grid item xs={12} md={12}>
                                                                <UploaderCC
                                                                    _control={control}
                                                                    label=" Adjuntar fotografias"
                                                                    name="imagenes"
                                                                    required={true}
                                                                    multiple={true}
                                                                    errors={errors}
                                                                    shouldFocus={false}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                )}
                                                {showForm == 2 && (
                                                    <Box component="section">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12}>
                                                                <TableContainer component={Paper}>
                                                                    <Table size="small" aria-label="a dense table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell width="350px">
                                                                                    <Typography variant="h3">
                                                                                        <CheckCircleOutline/>
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
                                                                                        <TableCell component="th"
                                                                                                   scope="row">
                                                                                            {val.key}:
                                                                                        </TableCell>
                                                                                        <TableCell>{val.value}</TableCell>
                                                                                    </TableRow>
                                                                                );
                                                                            })}
                                                                        </TableBody>
                                                                    </Table>
                                                                    <br/>
                                                                    <Table aria-label="a dense table" size="small">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell width="700px">
                                                                                    <Typography variant="h3">
                                                                                        <CheckCircleOutline/>
                                                                                        Acciones
                                                                                    </Typography>
                                                                                </TableCell>
                                                                                <TableCell align="left"></TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {preguntas.map((val, index) => {
                                                                                return (
                                                                                    <TableRow key={index}>
                                                                                        <TableCell component="th"
                                                                                                   scope="row">
                                                                                            <Typography>
                                                                                                <Check/>
                                                                                                {val.label}:
                                                                                            </Typography>
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {alldatosform[`preg_${val.id}` as any] == "SI" ? (
                                                                                                <Badge
                                                                                                    badgeContent={alldatosform[`preg_${val.id}` as any]}
                                                                                                    color={"primary"}></Badge>
                                                                                            ) : (
                                                                                                ""
                                                                                            )}
                                                                                            {alldatosform[`preg_${val.id}` as any] == "NO" ? (
                                                                                                <Badge
                                                                                                    badgeContent={alldatosform[`preg_${val.id}` as any]}
                                                                                                    color={"error"}></Badge>
                                                                                            ) : (
                                                                                                ""
                                                                                            )}
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                );
                                                                            })}
                                                                            <TableRow>
                                                                                <TableCell colSpan={2}>
                                                                                    <Grid container spacing={2} p={2}>
                                                                                        {imagespreview.map((image, index) => (
                                                                                            <Grid item key={index}
                                                                                                  xs={12} sm={6} md={4}>
                                                                                                <CardMedia
                                                                                                    component="img"
                                                                                                    height="100"
                                                                                                    image={URL.createObjectURL(image.blobFile)}
                                                                                                    style={{
                                                                                                        objectFit: "contain",
                                                                                                    }} // Esto asegura que la imagen se ajuste al tamaño especificado
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
                                                <br/>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <div>
                                                        <ButtonGroup>
                                                            <Button color="primary" onClick={onPrevious}
                                                                    disabled={step === 0} startIcon={<FirstPage/>}>
                                                                Previous
                                                            </Button>
                                                            <Button type="submit" color="primary" disabled={step === 2}
                                                                    endIcon={<LastPage/>}>
                                                                Next
                                                            </Button>
                                                        </ButtonGroup>
                                                    </div>
                                                    <div>
                                                        {showForm == 2 && (
                                                            <Button color="primary" variant="contained" type="submit"
                                                                    startIcon={<Checklist/>}>
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
