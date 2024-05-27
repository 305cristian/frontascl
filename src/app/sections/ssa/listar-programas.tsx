/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

import { SelectStatusCC, SelectCC } from "@/app/components/select-option";
import { Box, Button, Dialog, DialogContent, Divider, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { DataRangeCC } from "@/app/components/date-hour";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { GetActividadLiderazgo, GetProgramas, GetTurnos, GetLugarObs, GetProyectos, GetAreas } from "@/app/api/dataApiComponents";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { SweetNotifyWarning } from "@/app/components/sweet-notificacion";
import { DocModal } from "@/app/sections/ssa/reports/modalview";
import Swal from "sweetalert2";
import { Account } from "@/app/_mock/account";

//-------------------------------------------------------------------

export default function ReportSSA() {
  const [showTable, setShowTable] = useState(false);
  const [listaProgramas, setlistaProgramas] = useState<any[]>([]);
  const [listaActividades, setlistaActividades] = useState<any[]>([]);
  const [listaAreas, setlistaAreas] = useState<any[]>([]);
  const [listaProyectos, setlistaProyectos] = useState<any[]>([]);
  const [listaTurnos, setlistaTurnos] = useState<any[]>([]);
  const [listaLugarObs, setlistaLugarObs] = useState<any[]>([]);

  const [datRows, setlistaRegistros] = useState<any[]>([]);

  const [listaGeneral, setListaGeneral] = useState<any[]>([]);
  const [listaPreguntas, setListaPreguntas] = useState<any[]>([]);
  const [listaImagenes, setListaImagenes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const authCredentials = {
    username: process.env.NEXT_PUBLIC_USER || "",
    password: process.env.NEXT_PUBLIC_PASS || "",
  };
  const account = Account();

  //const responsedata = ResponseData();
  const {
    control,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    loadDataApi();
  }, []);

  async function loadDataApi() {
    const areas = await GetAreas();
    const lugares = await GetLugarObs();
    const turnos = await GetTurnos();
    const proyectos = await GetProyectos();
    const programas = await GetProgramas();
    const actividad = await GetActividadLiderazgo();

    setlistaAreas(areas);
    setlistaProyectos(proyectos);
    setlistaTurnos(turnos);
    setlistaLugarObs(lugares);
    setlistaProgramas(programas);
    setlistaActividades(actividad);
  }

  /*   async function getAllRecords() {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-records`, { auth: authCredentials });
    if (response.data) {
      const listaData = response.data.object;

      setlistaRegistros(listaData);
    }
  }
 */
  const getRegistros = handleSubmit(async (data: any) => {
    //console.log(data);
    let datos: any = {};
    //TODO: EL KEY DE ESTO OBJETO DEBE SER EL MISMO QUE ESTA EN EL ENTITY DEL BACK (AQUI SE ESTA ARMNDO EL WHERE DATA)
    //SALVO LAS FECHAS POR EL BETWEEN
    if (data.actividad != undefined) {
      datos.acslGeneralAct = data.actividad;
    }
    if (data.area != undefined) {
      datos.area = data.area;
    }
    if (data.estado != undefined) {
      datos.statusAscl = data.estado;
    }
    if (data.lugobservacion != undefined) {
      datos.lugarObservacion = data.lugobservacion;
    }
    if (data.proyecto != undefined) {
      datos.proyecto = data.proyecto;
    }
    if (data.turno != undefined) {
      datos.turno = data.turno;
    }
    if (data.fechas) {
      datos.fDesde = data.fechas[0];
      datos.fHasta = data.fechas[1];
    }

    /*  const datos = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    ); */

    try {
      let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-records-params`, datos, { auth: authCredentials });
      if (response.data.status === "success") {
        setShowTable(true);
        const listaData = response.data.object;
        setlistaRegistros(listaData);
      } else {
        setShowTable(false);
        SweetNotifyWarning({
          message: response.data.message,
        });
        //console.log("sssss. ", response.data);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  });

  const zfill = (value: any, length: number) => {
    const str = value.toString();
    return str.padStart(length, "0");
  };

  const dataColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, renderCell: (params) => <>{zfill(params.value, 4)}</> },
    {
      field: "acslGeneralActividad",
      headerName: "ACTIVIDAD LIDERAZGO",
      width: 350,
      renderCell: (params) => (
        <>
          <Box sx={{ backgroundColor: params.row.colorActividad, padding: "8px", borderRadius: "5px", width: "100%" }}>
            <Typography>{params.value}</Typography>
          </Box>
        </>
      ),
    },
    { field: "fecha", headerName: "FECHA", width: 170 },
    { field: "area", headerName: "ÁREA", width: 200 },
    {
      field: "lugarObservacion",
      headerName: "LUGAR OBSERVACIÓN",
      width: 300,
    },
    { field: "turno", headerName: "TURNO", width: 120 },
    { field: "duracion", headerName: "DURACIÓN", width: 120 },

    {
      field: "actions",
      headerName: "ACCIONES",
      width: 150,
      sortable: false,
      renderCell: (parans) => (
        <>
          {parans.row.statusAscl == 2 && (
            <div>
              <Button color="info" variant="contained" onClick={() => viewReport(parans.row.id)}>
                <RemoveRedEyeIcon />
              </Button>
              {account.role == "root" || account.role == "admin" ? (
                <Button color="error" variant="contained" onClick={() => anularReport(parans.row.id)}>
                  <DeleteSweepIcon />
                </Button>
              ) : (
                ""
              )}
            </div>
          )}
          <Button color="error" variant="contained" onClick={() => viewReport(parans.row.id)}>
            <VisibilityOffIcon />
          </Button>
        </>
      ),
    },
  ];

  async function viewReport(id: any) {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-record-id/${id}`, { auth: authCredentials });

    if (response.data.status == "success") {
      const { listaDataGeneral, listaDataPreguntas, listaDataImages } = response.data.object;

      setListaGeneral(listaDataGeneral);
      setListaPreguntas(listaDataPreguntas);
      setListaImagenes(listaDataImages);
      handleOpen();
    }
  }
  function anularReport(id: any) {
    Swal.fire({
      title: "Atención?",
      html: "<h5>Esta seguro que desea anular el documento?</h5>",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
      icon: "question",
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/anular-doc/${id}`, "", { auth: authCredentials });
        if (response.data.status == "success") {
          Swal.fire("OK", response.data.message, "success");
        }
      }
    });
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogContent dividers>
            <DocModal listaGeneral={listaGeneral} listaPreguntas={listaPreguntas} listaImagenes={listaImagenes} />
          </DialogContent>
        </Dialog>
      </Modal>

      <Box my={3} component="form" onSubmit={getRegistros}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2} lg={2}>
            <SelectCC
              _control={control}
              _setValue={setValue}
              label=" Actividad de liderazgo"
              name="actividad"
              size="small"
              required={false}
              errors={errors}
              listaData={listaActividades}
            />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <DataRangeCC _setValue={setValue} label=" date" icon={<CalendarMonthIcon />} name="fechas" />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <SelectCC
              _control={control}
              _setValue={setValue}
              label=" Proyecto"
              name="proyecto"
              size="small"
              required={false}
              errors={errors}
              listaData={listaProyectos}
            />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <SelectCC
              _control={control}
              _setValue={setValue}
              label=" Área"
              name="area"
              size="small"
              required={false}
              errors={errors}
              listaData={listaAreas}
            />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <SelectCC
              _control={control}
              _setValue={setValue}
              label=" Turno"
              name="turno"
              size="small"
              required={false}
              errors={errors}
              listaData={listaTurnos}
            />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <SelectCC
              _control={control}
              _setValue={setValue}
              label=" Lugar de Observación"
              name="lugobservacion"
              size="small"
              required={false}
              errors={errors}
              listaData={listaLugarObs}
            />
          </Grid>

          <Grid item xs={12} md={2} lg={2}>
            <SelectStatusCC register={register} label=" Estado" name="estado" size="small" required={false} errors={errors} />
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <Button type="submit" variant="contained" color="primary">
              <ManageSearchIcon />
               Generar Reporte
            </Button>
          </Grid>
        </Grid>
      </Box>
      <hr />
      {showTable && (
        <Box
          sx={{
            overflowX: { xs: "auto", sm: "hidden" },
            overflowY: { xs: "hidden", sm: "auto" },
          }}
        >
          <DataGrid
            rows={datRows}
            columns={dataColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[7, 10]}
            autoHeight
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      )}
    </>
  );
}
