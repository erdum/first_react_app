import MFCD from 'ui-component/MFCD';

// icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const options = [
	{
		title: 'Create New Faq',
		icon: <AddIcon />
	},
	{
		title: 'Delete Faq',
		icon: <DeleteIcon />
	},
	{
		title: 'Edit Faq',
		icon: <EditIcon />
	}
];

const columns = [
	{ field: 'id', headerName: 'ID', width: 80 },
	{ field: 'posted_on', headerName: 'Posted On', width: 200, type: 'search', options: '/page-list', lazyLoad: true },
	{ field: 'question', headerName: 'Question', width: 200 },
	{ field: 'answer', headerName: 'Answer', width: 200 },
];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/faq`;

export default function Faq() {
	return <MFCD columns={columns} options={options} url={URL} title="Faqs" />;
}
