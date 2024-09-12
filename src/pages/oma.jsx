import { Helmet } from 'react-helmet-async';

import { OmaView } from 'src/sections/oma/view';



// ----------------------------------------------------------------------

export default function OmaPage() {
  return (
    <>
      <Helmet>
        <title> Oma </title>
      </Helmet>

      <OmaView />
    </>
  );
}
