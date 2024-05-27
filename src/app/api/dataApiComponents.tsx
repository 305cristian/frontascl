import axios from "axios";

//---------------------------------------------------------------

const authCredentials = {
  username: process.env.NEXT_PUBLIC_USER || "",
  password: process.env.NEXT_PUBLIC_PASS || "",
};

export async function GetProgramas() {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-programas`, { auth: authCredentials });
    if (response.data) {
      const data = response.data.object;
      //alimento la constante lista
      const lista = data.map(({ idPrograma, descriptionPrograma }: { idPrograma: number; descriptionPrograma: string }) => ({
        label: descriptionPrograma,
        value: idPrograma.toString(),
      }));
      return lista;
    }
  } catch (error) {
    console.error("Error de comunicacion con el servicio ", error);
  }
}

export async function GetAreas() {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-areas`, { auth: authCredentials });
    if (response.data) {
      const data = response.data.object;
      //alimento la constante lista
      const lista = data.map(({ idArea, nameArea }: { idArea: number; nameArea: string }) => ({
        label: nameArea,
        value: idArea.toString(),
      }));
      return lista;
    }
  } catch (error) {
    console.error("Error de comunicacion con el servicio", error);
  }
}

export async function GetProyectos() {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-proyectos`, { auth: authCredentials });
    if (response.data) {
      const data = response.data.object;
      //alimento la constante lista
      const lista = data.map(({ idProyecto, nameProyecto }: { idProyecto: number; nameProyecto: string }) => ({
        label: nameProyecto,
        value: idProyecto.toString(),
      }));
      return lista;
    }
  } catch (error) {
    console.error("Error de comunicacion con el servicio ", error);
  }
}

export async function GetTurnos() {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-turno`, { auth: authCredentials });
    if (response.data) {
      const data = response.data.object;
      //alimento la constante lista
      const lista = data.map(({ idTurno, nameTurno }: { idTurno: number; nameTurno: string }) => ({
        label: nameTurno,
        value: idTurno.toString(),
      }));
      return lista;
    }
  } catch (error) {
    console.error("Error de comunicacion con el servicio ", error);
  }
}

export async function GetLugarObs() {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-place`, { auth: authCredentials });
    if (response.data) {
      const data = response.data.object;
      //alimento la constante lista
      const lista = data.map(({ idLugarObser, nameLugarObservacion }: { idLugarObser: number; nameLugarObservacion: string }) => ({
        label: nameLugarObservacion,
        value: idLugarObser.toString(),
      }));
      return lista;
    }
  } catch (error) {
    console.error("Error de comunicacion con el servicio ", error);
  }
}

export async function GetPreguntas(id: any) {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-act-adicionales/${id}`, { auth: authCredentials });
    if (response.data) {
      const data = response.data.object;
      //alimento la constante lista
      const lista = data.map(
        ({ idActLiderazAdic, descriptionActLiderazgoAdic }: { idActLiderazAdic: number; descriptionActLiderazgoAdic: string }) => ({
          label: descriptionActLiderazgoAdic,
          id: idActLiderazAdic.toString(),
        })
      );
      return lista;
    }
  } catch (error) {
    console.error("Error de comunicacion con el servicio ", error);
  }
}

export async function GetActividadLiderazgo() {
  try {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/show-all-act-liderazgo`, { auth: authCredentials });
    if (response.data) {
      const data = response.data.object;
      //alimento la constante lista
      const lista = data.map(({ idListActLiderazgo, nameListActLiderazgo }: { idListActLiderazgo: number; nameListActLiderazgo: string }) => ({
        label: nameListActLiderazgo,
        value: idListActLiderazgo.toString(),
      }));
      return lista;
    }
  } catch (error) {
    console.error("Error de comunicacion con el servicio ", error);
  }
}
