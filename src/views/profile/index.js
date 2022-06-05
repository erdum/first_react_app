import MFCD from 'ui-component/MFCD';
import Avatar from '@mui/material/Avatar';

const parseAvatar = (params) => <Avatar
	src={params.value ? `${process.env.REACT_APP_PUBLIC_URL}photos/${params.value}.webp` : `https://ui-avatars.com/api/?name=${params.row?.name}`}/>;

const columns = [{field: 'id', headerName: 'ID', width: 70, type: 'lock'}, {
	field: 'avatar',
	headerName: 'Avatar',
	width: 80,
	type: 'file',
	renderCell: parseAvatar
}, {field: 'name', headerName: 'Name', width: 200}, {
	field: 'email',
	headerName: 'Email',
	width: 160,
	type: 'lock'
}, {field: 'password', headerName: 'Password', width: 200}, {
	field: 'gender', headerName: 'Gender', width: 160, type: 'search', options: [{
		id: 'Male', label: 'Male'
	}, {id: 'Female', label: 'Female'}, {id: 'Other', label: 'Other'}]
}, {field: 'date_of_birth', headerName: 'Date Of Birth', width: 160, type: 'date'}, {
	field: 'about',
	headerName: 'About',
	type: 'freeText',
	width: 200
}, {field: 'facebook', headerName: 'Facebook', width: 200}, {
	field: 'instagram',
	headerName: 'Instagram',
	width: 200
}, {field: 'twitter', headerName: 'Twitter', width: 200}, {
	field: 'linkedin',
	headerName: 'Linkedin',
	width: 200
}, {field: 'youtube', headerName: 'Youtube', width: 200}];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/user-profile`;

export default function Users() {
	return <MFCD columns={columns} url={URL} title="Your Profile" create={false} destroy={false}/>;
}
