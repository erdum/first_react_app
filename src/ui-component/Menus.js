import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right'
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0'
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5)
			},
			'&:active': {
				backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
			}
		}
	}
}));

function CustomizedMenus({ options, selectedRow, destroy, setFields, openPage, setEditValues }) {
	// Menu states
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClickOpenDialog = () => {
		openPage(true);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (e) => {
		setAnchorEl(null);

		if (e?.target?.innerText?.slice(0, 4) === 'Edit') {
			if (selectedRow === null || selectedRow.length === 0) {
				alert('No Row Selceted');
			} else {
				setFields((prevState) => ({ ...prevState, isUpdate: true }));
				handleClickOpenDialog();
			}
		} else if (e.target.innerText.slice(0, 6) === 'Create') {
			setFields((prevState) => ({ ...prevState, isUpdate: false }));
			setEditValues(null);
			handleClickOpenDialog();
		} else if (e.target.innerText.slice(0, 6) === 'Delete') {
			if (selectedRow === null || selectedRow.length === 0) {
				alert('No Row Selceted');
			} else {
				destroy();
			}
		}
	};

	return (
		<>
			<Button
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
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
				endIcon={<KeyboardArrowDownIcon />}
			>
				Options
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button'
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{options.map((option, index) => (
					<MenuItem key={index} onClick={handleClose} disableRipple>
						{option.icon}
						{option.title}
					</MenuItem>
				))}
			</StyledMenu>
		</>
	);
}

export default CustomizedMenus;
