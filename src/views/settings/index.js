import { useState } from 'react';
import { Grid, Typography, Card, TextField, Button, Box, CircularProgress } from '@mui/material';
import { gridSpacing } from 'store/constant';

import uploadFiles from 'utils/uploadFiles';
import getToken from 'utils/getToken';

export default function SettingsPage() {
	const [images, setImages] = useState([]);
	const [lock, setLock] = useState(false);

	const handleUpload = async () => {
		if (images) {
			setLock(true);
			const filesNames = await uploadFiles(images);
			const res = await fetch(`${process.env.REACT_APP_BASE_URL}/site/change-images`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${getToken()}`,
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ names: filesNames })
			});

			if (res.status !== 200) {
				setLock(false);
				alert('Unexpected error ocurred');
			} else {
				setLock(false);
				alert('Images successfuly changed');
			}
		}
	};

	return (
		<Grid container direction="column" spacing={gridSpacing}>
			<Grid item container justifyContent="space-between" xs={12}>
				<Typography
					sx={{
						color: 'secondary.main',
						marginLeft: 4
					}}
					variant="h1"
				>
					Home Page Settings
				</Typography>
			</Grid>
			<Grid item>
				<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', p: 4 }}>
					<div>
						<Typography
							sx={{
								color: 'gray',
								mb: 2
							}}
							variant="h4"
						>
							Change Home Page Carousel Images
						</Typography>
						<TextField
							onChange={(event) => {
								setImages(event.target.files);
							}}
							helperText="Upload Images"
							variant="outlined"
							type="file"
							inputProps={{ accept: 'image/*', multiple: true }}
						/>
						<Box sx={{ mt: 2, position: 'relative' }}>
							<Button disabled={lock} sx={{ color: 'white' }} onClick={handleUpload} variant="contained">
								Save
							</Button>
							{lock && (
								<CircularProgress
									size={24}
									sx={{
										position: 'absolute',
										top: '50%',
										left: '20px',
										marginTop: '-12px'
									}}
								/>
							)}
						</Box>
					</div>
				</Card>
			</Grid>
		</Grid>
	);
}
