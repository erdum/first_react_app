import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import { gridSpacing } from 'store/constant';
import getToken from 'utils/getToken';
import checkAuthorization from 'utils/checkAuthorization';

// assets
import { faSchool, faBookOpen, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const URL = `${process.env.REACT_APP_BASE_URL}/managment/dashboard`;

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    fetch(URL, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json'
      }
    })
      .then((res) => checkAuthorization(res))
      .then((data) => setDashboardData(data));
  }, []);

  useEffect(() => {
    if (dashboardData) {
      setLoading(false);
    }
  }, [dashboardData]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} title="Total Colleges" data={dashboardData?.totalColleges} icon={faSchool} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
            <EarningCard
              isLoading={isLoading}
              title="Total Courses"
              data={dashboardData?.totalCourses}
              icon={faBookOpen}
              bgColor={theme.palette.primary.main}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
            <EarningCard
              isLoading={isLoading}
              title="Registerd Users"
              data={dashboardData?.totalUsers}
              icon={faUsers}
              bgColor={theme.palette.warning.dark}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                {/* <TotalIncomeLightCard isLoading={isLoading} /> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PopularCard isLoading={isLoading} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
