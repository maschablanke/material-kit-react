import { Helmet } from 'react-helmet-async';

import {  TradeRepublicView, AnalysedFieldsView} from 'src/sections/upload/view';



// ----------------------------------------------------------------------

export default function UploadPage() {
  return (
    <>
      <Helmet>
        <title> Upload </title>
      </Helmet>

      <AnalysedFieldsView />
      <TradeRepublicView />
    </>
  );
}
