import Swal, { SweetAlertIcon } from "sweetalert2";

export function SweetNotifySuccess({ message, redirectUrl }: { message: string; redirectUrl: string }) {
  Swal.fire({
    icon: "success" as SweetAlertIcon,
    title: "OK",
    html: `<h5>${message}</h5>`,
    showConfirmButton: true,
    confirmButtonText: `✔ OK`,
    confirmButtonColor: "#3085d6",
    showCancelButton: true,
    cancelButtonText: "Ver Reporte",
    cancelButtonColor: "#808B96",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
      window.location.href = `${process.env.NEXT_PUBLIC_HOST_URL}/${redirectUrl} `;
    } else if (result.isDismissed) {
      alert("reporte");
      //RUTA PARA VER EL REPORTE
      //window.location.href = `${process.env.NEXT_PUBLIC_HOST_URL}/${redirectUrl} `;
    }
  });
}
//confirmButtonText:`CONTINUAR <i class="fa-solid fa-angles-right"></i>`,

export function SweetNotifyWarning({ message }: { message: string }) {
  Swal.fire({
    width: "30%",
    icon: "warning" as SweetAlertIcon,
    title: "!Atención",
    html: `<h5>${message}</h5>`,
    allowOutsideClick: false,
  });
}
export function SweetNotifyError({ message }: { message: string }) {
  Swal.fire({
    icon: "error" as SweetAlertIcon,
    title: "!Atención",
    html: `<h5>${message}</h5>`,
    allowOutsideClick: false,
  });
}
