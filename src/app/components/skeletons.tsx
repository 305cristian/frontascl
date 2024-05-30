/*
 * Created on Thu May 30 2024
 *
 * Copyright (c) 2024 CC
 *
 * Author: Cristian R. Paz
 */

import { Box, CircularProgress, Divider, Grid, Skeleton, Stack } from "@mui/material";

export function CardSkeleton() {
  return (
    <>
      <Skeleton width="30%" />
      <Box mt={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1}>
              <Skeleton variant="rounded" width={350} height={150} />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={1}>
              <Skeleton variant="rounded" width={350} height={150} />
            </Stack>
          </Grid>

          <Divider sx={{ borderStyle: "revert", m: 2 }} />

          <Grid item xs={12} md={6} lg={8}>
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              <Skeleton variant="rounded" width={1000} height={200} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              <Skeleton variant="rounded" width={500} height={200} />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              <Skeleton variant="rounded" width={500} height={200} />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              <Skeleton variant="rounded" width={1000} height={200} />
            </Stack>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={1}>
              <Skeleton variant="rounded" width={500} height={200} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Stack spacing={1}>
              <Skeleton variant="rounded" width={500} height={200} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Stack spacing={1}>
              <Skeleton variant="rounded" width={500} height={200} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
