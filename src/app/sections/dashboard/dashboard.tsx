/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

import { Grid, Box, Divider } from "@mui/material";
import DailyActivity from "@/app/components/dashboard/DailyActivity";
import ProductPerformance from "@/app/components/dashboard/ProductPerformance";
import BlogCard from "@/app/components/dashboard/Blog";
import AppWidgetSummary from "@/app/components/container/app-widget-summary";
import Link from "next/link";
import Image from "next/image";
import AppWebsiteVisits from "@/app/components/dashboard/app-website-visits";
import AppCurrentVisits from "@/app/components/dashboard/app-current-visits";

//---------------------------------------------------------------------

const Dashboard = () => {
  return (
    <>
      <h3>Hi, Welcome Modules ZAMI 👋</h3>
      <Box mt={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Link href={"/pages/ssa"} style={{ textDecoration: "none" }}>
              <AppWidgetSummary
                title="SSA"
                legend="Module"
                color="success"
                icon={<Image alt="icon" src="/assets/icons/glass/ic_glass_bag.png" width={50} height={50} />}
              />
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Link href={"/pages/qa"} style={{ textDecoration: "none" }}>
              <AppWidgetSummary
                title="QA"
                legend="Module"
                color="info"
                icon={<Image alt="icon" src="/assets/icons/glass/ic_glass_message.png" width={50} height={50} />}
              />
            </Link>
          </Grid>
          <Divider sx={{ borderStyle: "revert", m: 2 }} />
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chart={{
                labels: [
                  "01/01/2003",
                  "02/01/2003",
                  "03/01/2003",
                  "04/01/2003",
                  "05/01/2003",
                  "06/01/2003",
                  "07/01/2003",
                  "08/01/2003",
                  "09/01/2003",
                  "10/01/2003",
                  "11/01/2003",
                ],
                series: [
                  {
                    name: "Team A",
                    type: "column",
                    fill: "solid",
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: "Team B",
                    type: "area",
                    fill: "gradient",
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: "Team C",
                    type: "line",
                    fill: "solid",
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/*   <SalesOverview /> */}
            <AppCurrentVisits
              title="Current Visits"
              chart={{
                series: [
                  { label: "America", value: 4344 },
                  { label: "Asia", value: 5435 },
                  { label: "Europe", value: 1443 },
                  { label: "Africa", value: 4443 },
                ],
              }}
              subheader={undefined}
            />
          </Grid>

          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <DailyActivity />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BlogCard />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
