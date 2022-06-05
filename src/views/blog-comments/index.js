import MFCD from 'ui-component/MFCD';

const columns = [
    {field: 'id', headerName: 'ID', width: 60},
    {field: 'posted_by', headerName: 'Posted By', width: 200, type: 'lock'},
    {field: 'posted_on', headerName: 'Posted On', width: 200, type: 'lock'},
    {field: 'body', headerName: 'Comment', width: 200, type: 'lock'},
    {field: 'reply', headerName: 'Reply', width: 200},
    {field: 'created_at', headerName: 'Posted At', width: 120, type: 'lock'},
    {field: 'approved', headerName: 'Approved', width: 100, type: 'boolean'}
];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/comments`;

export default function BlogComments() {
    return <MFCD columns={columns} url={URL} title="Comments" create={false}/>;
}
