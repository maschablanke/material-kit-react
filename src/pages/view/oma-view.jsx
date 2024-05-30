import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { omaData } from 'src/_mock/oma';

import OmaPortfolio from '../../sections/oma/omaPortfolioBody';
import AppCurrentVisits from '../../sections/oma/app-current-visits';
import AppWebsiteVisits from '../../sections/oma/app-website-visits';
import AppWidgetSummary from '../../sections/overview/app-widget-summary';

// ----------------------------------------------------------------------
export default function AppView() {

  
  const [currentTotal, setCurrentTotal] = useState([]);
  const [currentInvest, setCurrentInvest] = useState([]);
  const [currentInterest, setCurrentInterest] = useState([]);

  console.log('OmaData1', omaData.stock);
  console.log( omaData);
  console.log( 'OmaData', omaData);

  // const totalOma = (omaData) =>
  // data.flatMap(x => Object.keys(x)).filter((value, index, array) => array.indexOf(value) === index);
  // ;

  const showInfo = ["status", "account", "stock"];
  console.log(showInfo, 'showInfo');

  console.log ('bargeld', omaData.status.account)
  console.log ('msci world', omaData.status.stock[0].value)
  console.log ('festgeld', omaData.status.stock[1].value)

  // const festgeld = value mal tägliche preise 


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

{/* 
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Investiert"
            total={currentInvest}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid> */}

        <Grid xs={12} sm={6} md={4}>
          <OmaPortfolio
          title="Oma"
          />
        </Grid>


        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="Festgeld"
            total={currentInterest}
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
          <AppCurrentVisits
            title="Übersicht"
            chart={{
              series: [
                { label: 'Invest', value: currentInvest },
                { label: 'Festgeld', value: currentInterest },
              ],
            }}
          />
        </Grid>

      </Grid>
    </Container>
  );
}
