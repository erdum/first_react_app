import MFCD from 'ui-component/MFCD';

const ratings = [
	{
		label: '1',
		id: 1
	},
	{
		label: '2',
		id: 2
	},
	{
		label: '3',
		id: 3
	},
	{
		label: '4',
		id: 4
	},
	{
		label: '5',
		id: 5
	}
];

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{ field: 'posted_on', headerName: 'Posted On', width: 160, type: 'search', options: '/page-list', lazyLoad: true },
	{ field: 'posted_by', headerName: 'Posted By', width: 160, type: 'search', options: '/users-list' },
	{ field: 'body', headerName: 'Body', width: 160 },
	{ field: 'rating', headerName: 'Rating', width: 80, type: 'search', options: ratings },
	{ field: 'approved', headerName: 'Approved', width: 140, type: 'boolean' }
];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/reviews`;

export default function Reviews() {
	return <MFCD columns={columns} url={URL} title="Reviews" />;
}
