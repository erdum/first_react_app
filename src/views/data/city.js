import MFCD from 'ui-component/MFCD';

const columns = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'name', headerName: 'Name', width: 220 },
	{ field: 'slug', headerName: 'Slug', width: 220 }
];

const URL = `${process.env.REACT_APP_BASE_URL}/data/city`;

export default function City() {
	return <MFCD columns={columns} url={URL} title="Cities" />;
}
