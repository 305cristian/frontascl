/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

import { IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser } from "@tabler/icons-react";
import { uniqueId } from "lodash";
import { usePathname } from "next/navigation";

const itemsssa = [
  {
    id: uniqueId(),
    title: "Home",
    icon: IconHome,
    href: "/pages/ssa",
  },
  {
    id: uniqueId(),
    title: "Reuniones de Segumiento",
    icon: IconCircleDot,
    href: "/pages/ssa/formrs",
    subheader: "hola",
  },
  {
    id: uniqueId(),
    title: "Inspecciones Planificadas",
    icon: IconTable,
    href: "/pages/ssa/formip",
  },
  {
    id: uniqueId(),
    title: "OPT",
    icon: IconLayoutGrid,
    href: "/pages/ssa/formopt",
  },
  {
    id: uniqueId(),
    title: "STL",
    icon: IconStar,
    href: "/pages/ssa/formstl",
  },
  {
    id: uniqueId(),
    title: "REPORTES",
    icon: IconLayout,
    href: "/pages/ssa/reportes",
  },
];

const itemsqa = [
  {
    id: uniqueId(),
    title: "Home",
    icon: IconHome,
    href: "/pages/qa",
  },

  /*  {
    id: uniqueId(),
    title: "Images",
    icon: IconPhoto,
    href: "/pages/images",
  }, */
];

function GetMenuitems() {
  const pathname = usePathname();
  if (pathname.startsWith("/pages/ssa")) {
    return itemsssa;
  } else if (pathname.startsWith("/pages/qa")) {
    return itemsqa;
  } else {
    return [];
  }
}

export default GetMenuitems;
