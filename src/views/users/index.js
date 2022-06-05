import MFCD from 'ui-component/MFCD';

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'name', headerName: 'Name', width: 200 },
	{ field: 'email', headerName: 'Email', width: 160 },
	{ field: 'password', headerName: 'Password', width: 120 },
	{ field: 'roles', headerName: 'Roles', width: 130, type: 'search', options: '/roles-list' },
	{
		field: 'status',
		headerName: 'Active',
		type: 'boolean',
		width: 90
	}
];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/users`;

export default function Users() {
	return <MFCD columns={columns} url={URL} title="Users" />;
}
