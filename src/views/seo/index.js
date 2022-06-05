import MFCD from 'ui-component/MFCD';

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{ field: 'title', headerName: 'Title', width: 200 },
	{ field: 'meta_description', headerName: 'Meta Description', width: 200 },
	{ field: 'meta_keywords', headerName: 'Meta Keywords', width: 200 },
	{ field: 'page_id', headerName: 'Slug', width: 200, type: 'lock' },
	{ field: 'page', headerName: 'Page', width: 200, type: 'search', hide: true, options: '/page-list', lazyLoad: true }
];

const URL = `${process.env.REACT_APP_BASE_URL}/site/seo`;

export default function Seo() {
	return <MFCD columns={columns} url={URL} title="Seo" />;
}
