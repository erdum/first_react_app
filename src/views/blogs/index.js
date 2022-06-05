import MFCD from 'ui-component/MFCD';

const columns = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'title', headerName: 'Title', width: 300 },
	{ field: 'slug', headerName: 'Slug', width: 300 },
	{ field: 'meta_title', headerName: 'Meta Title', width: 400 },
	{ field: 'meta_description', headerName: 'Meta Description', width: 400 },
	{ field: 'visits', headerName: 'Visits', width: 100, lock: true },
	{ field: 'cover_image', headerName: 'Cover Images', type: 'file', hide: true },
	{ field: 'body', headerName: 'Body', type: 'freeText', width: 400 }
];

const URL = `${process.env.REACT_APP_BASE_URL}/blog`;

export default function Blogs() {
	return <MFCD columns={columns} url={URL} title="Blogs" />;
}
