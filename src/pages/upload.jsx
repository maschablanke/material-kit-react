import { Helmet } from 'react-helmet-async';

import { UploadView } from 'src/sections/upload/upload';

// ----------------------------------------------------------------------

export default function UploadPage() {
  return (
    <>
      <Helmet>
        <title> Upload </title>
      </Helmet>

      <UploadView />
    </>
  );
}
