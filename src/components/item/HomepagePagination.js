import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function HomepagePagination() {
  return (
    <Stack spacing={2}>
      <Pagination count={13} />
    </Stack>
  );
}
