import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ActionItem from 'ui-component/ActionItem';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { createRecord, deleteRecord } from 'utils/crud';
import findChanges from 'utils/findChanges';

const SubpageItem = ({ collegeId, row, columns, url, isUpdate = false, close }) => {
	const [open, setOpen] = useState(false);
	const [fields, setFields] = useState({ isUpdate, ...row, college_id: collegeId[0] });
	const [lock, setLock] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleSubmit = async () => {
		if (fields?.isUpdate) {
			const data = findChanges(row, fields);
			console.log(row);
			createRecord(url, { ...data, rows: [row.id] }, columns, [row.id], setLock, null, close);
		} else {
			createRecord(url, fields, columns, null, setLock, null, close);
		}
	};

	const handleDelete = () => {
		deleteRecord(url, [row.id], setLock, null, close);
	};

	return (
		<div style={{ margin: '4rem 0' }}>
			<ListItem
				secondaryAction={
					<IconButton onClick={handleDelete} edge="end" aria-label="comments">
						<DeleteIcon />
					</IconButton>
				}
			>
				<ListItemButton onClick={handleClick}>
					<ListItemText primary={row.title} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{columns?.map((column) => {
						if (column.field !== 'id' && column.type !== 'lock') {
							return <ActionItem key={column.field} row={column} setFields={setFields} fields={fields} />;
						}
						return null;
					})}
				</List>
				<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<Button
						disabled={lock}
						sx={{
							color: 'secondary.dark',
							backgroundColor: 'white',
							position: 'relative',
							my: 2,
							'&:hover': { backgroundColor: 'secondary.dark', color: 'white' }
						}}
						onClick={handleSubmit}
					>
						Save
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
					</Button>
				</div>
			</Collapse>
		</div>
	);
};

export default function Subpages({ columns, row, subpagesURL }) {
	const [data, setData] = useState(null);

	useEffect(() => {
		if (data !== null) return null;
		(async () => {
			let res = await fetch(`${subpagesURL}?id=${row}`);
			if (res.status !== 200) return null;
			res = await res.json();
			setData(res);
			return true;
		})();
		return true;
	}, [data]);

	const close = () => {
		setData(null);
	};

	return (
		<Box sx={{ width: '100%', mt: 8 }}>
			<Typography sx={{ mb: 4, color: 'secondary.main' }} variant="h1">
				Subpages
			</Typography>
			{data === null ? (
				<>
					<Skeleton variant="text" />
					<Skeleton variant="text" />
					<Skeleton variant="text" />
					<Skeleton variant="rectangular" sx={{ height: 400, my: 2 }} />
				</>
			) : (
				<List sx={{ width: '100%', bgcolor: 'transparent' }} aria-labelledby="nested-list-subheader">
					<SubpageItem collegeId={row} row={{ title: 'Create New Subpage' }} columns={columns} url={subpagesURL} close={close} />
					{data?.map((row) => (
						<SubpageItem key={row.id} collegeId={row.id} row={row} columns={columns} url={subpagesURL} isUpdate close={close} />
					))}
				</List>
			)}
		</Box>
	);
}
