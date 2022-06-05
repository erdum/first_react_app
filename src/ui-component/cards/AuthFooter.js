// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="mailto:erdumadnan@gmail.com" target="_blank" underline="hover">
            Adnan & Son IT Group Pakistan
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://colleg.studywoo.com" target="_blank" underline="hover">
            &copy; college.studywoo.com
        </Typography>
    </Stack>
);

export default AuthFooter;
