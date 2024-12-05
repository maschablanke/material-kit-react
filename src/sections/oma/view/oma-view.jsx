import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { omaData } from 'src/_mock/oma';
import { EUNLDaylyClose } from 'src/_mock/EUNL';
import { xeonDEDaylyClose } from 'src/_mock/xeon.de';

import PieChart from '../pie-chart';
import OmaPortfolio from '../omaPortfolioBody';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../../overview/app-widget-summary';

// ----------------------------------------------------------------------
export default function AppView() {

  
  const [currentTotal, setCurrentTotal] = useState([]);
  console.log (setCurrentTotal);


  
  const [currentCash, setCurrentCash] = useState(omaData.status.account);
  console.log ('bargeld', omaData.status.account);
  console.log (setCurrentCash);
  

  // Anzahl an Shares
  const numXtracker = omaData.status.stock[1].value;
  console.log ('xtracker anzahl', numXtracker);
  
  // Anzahl an Shares
  const numMSCI = omaData.status.stock[0].value ;
  console.log ('msci world anzahl', omaData.status.stock[0].value)

// gets the most current value for the object
  const getLatestValue = (obj) => {
    const keys =  (Object.keys(obj));
    console.log ('keys', keys);
    const keysLength = keys.length;
    console.log ('lenghtOfKeyarray', keysLength)
    const lastKey = keys[keysLength-1];
    console.log ('lastValue', obj[lastKey]);
    return obj[lastKey];
  }


  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi Oma, willkommen zurück 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total"
            total={currentTotal}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>


        <Grid xs={12} sm={6} md={3}>
          <OmaPortfolio
          title="Oma Not invested"
          total={currentCash}
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>


        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
          // xeon
            title="xtracker"
            total={(getLatestValue(xeonDEDaylyClose)*numXtracker)}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
          // eunl
            title="MSCI World"
            total={(getLatestValue(EUNLDaylyClose)*numMSCI)}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Übersicht"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
              ],
              series: [
                {
                  name: 'Gesamt',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                // {
                //   name: 'Investiert',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                {
                  name: 'Festgeld',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <PieChart
            title="Übersicht"
            chart={{
              series: [
                 { id: 0,label: 'Invest', value: 100 },
                 { id: 1,label: 'Festgeld', value: 200 },
                 { id: 2,label: 'Total', value: 150 }
              ],
            }}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
