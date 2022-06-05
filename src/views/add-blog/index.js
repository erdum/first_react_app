import { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Editor } from '@tinymce/tinymce-react';
import ActionItem from 'ui-component/ActionItem';
import { gridSpacing } from 'store/constant';
import uploadFiles from 'utils/uploadFiles';
import getToken from 'utils/getToken';

const columns = [
	{ field: 'title', headerName: 'Title', width: 180 },
	{ field: 'slug', headerName: 'Slug', width: 180 },
	{ field: 'posted_by', headerName: 'Posted By', width: 180, type: 'search', options: '/users-list' },
	{ field: 'meta_description', headerName: 'Meta Description', width: 180 },
	{ field: 'cover_image', headerName: 'Cover Images', type: 'file', hide: true }
];

export default function AddBlog() {
	const [lock, setLock] = useState(false);
	const [isEditorLoading, setEditorLoading] = useState(true);
	const [fields, setFields] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const editorRef = useRef(null);

	const handleClick = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleSubmit = async () => {
		if (fields) {
			setLock(true);

			if (fields.cover_image) {
				fields.cover_image = await uploadFiles(fields.cover_image);

				if (!fields.cover_image) {
					setLock(false);
					alert('File upload failed');
				}
			}

			const res = await fetch(`${process.env.REACT_APP_BASE_URL}/blog`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${getToken()}`,
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(fields)
			});

			if (res.status === 200) {
				setLock(false);
				setOpenDialog(false);
			} else {
				setLock(false);
				alert('Unexpected error ocurred');
			}
		}
	};

	return (
		<Grid container direction="column" spacing={gridSpacing}>
			<Grid item container justifyContent="space-between" xs={12}>
				<Typography
					sx={{
						color: 'secondary.main',
						marginLeft: 1
					}}
					variant="h1"
				>
					Add Blog
				</Typography>
				<Button
					id="demo-customized-button"
					aria-controls="demo-customized-menu"
					aria-haspopup="true"
					variant="contained"
					onClick={handleClick}
					sx={{
						backgroundColor: 'secondary.main',
						'&:hover': {
							backgroundColor: 'secondary.main',
							color: 'white',
							boxShadow: 0
						}
					}}
				>
					Create Blog
				</Button>
				<Dialog open={openDialog} onClose={handleCloseDialog}>
					<DialogTitle>
						<Typography variant="h4" color="secondary.dark">
							Create Blog
						</Typography>
					</DialogTitle>
					<DialogContent sx={{ backgroundColor: 'primary.light' }}>
						<List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
							{columns.map((row) => {
								if (row.field !== 'id' && row.type !== 'lock') {
									return <ActionItem key={row.field} row={row} setFields={setFields} fields={fields} />;
								}
								return null;
							})}
						</List>
					</DialogContent>
					<DialogActions>
						<Button
							disabled={lock}
							sx={{ color: 'secondary.dark', '&:hover': { backgroundColor: 'secondary.light' } }}
							onClick={handleCloseDialog}
						>
							Cancel
						</Button>
						<Box sx={{ m: 1, position: 'relative' }}>
							<Button
								disabled={lock}
								sx={{ color: 'secondary.dark', '&:hover': { backgroundColor: 'secondary.light' } }}
								onClick={handleSubmit}
							>
								Create
							</Button>
							{lock && (
								<CircularProgress
									size={24}
									sx={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										marginTop: '-12px',
										marginLeft: '-12px'
									}}
								/>
							)}
						</Box>
					</DialogActions>
				</Dialog>
			</Grid>
			<Grid item>
				{isEditorLoading && <EarningCard />}
				<Editor
					apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
					onInit={(evt, editor) => {
						setEditorLoading(false);
						editorRef.current = editor;
					}}
					onEditorChange={(text) => {
						setFields((prevState) => ({ ...prevState, body: text }));
					}}
					value={fields?.body ?? "<h3 style='text-align: center;'>Developed By Adnan & Son IT Group Pakistan</h3>"}
					init={{
						mobile: {
							menubar: true,
							toolbar_mode: 'sliding',
							theme: 'mobile'
						},
						selector: 'textarea#image-tools',
						height: 500,
						convert_urls: false,
						plugins: [
							'advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table paste imagetools wordcount'
						],
						toolbar:
							'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
						content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
					}}
				/>
			</Grid>
		</Grid>
	);
}
