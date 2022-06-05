import MFCD from 'ui-component/MFCD';

// icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const options = [
    {
        title: 'Create New Category',
        icon: <AddIcon />
    },
    {
        title: 'Delete Category',
        icon: <DeleteIcon />
    },
    {
        title: 'Edit Category',
        icon: <EditIcon />
    }
];

console.log(options)

const columns = [
    { field: 'id', headerName: 'ID', width: 140 },
    { field: 'title', headerName: 'Category', width: 240 },
];

const URL = `${process.env.REACT_APP_BASE_URL}/blog/categories`;

export default function BlogCategories() {
    return <MFCD columns={columns} options={options} url={URL} />;
}
