import MFCD from 'ui-component/MFCD';

const columns = [
    {field: 'id', headerName: 'ID', width: 80},
    {field: 'full_name', headerName: 'Applicant Name', width: 300},
    {field: 'college_name', headerName: 'Applied College', width: 400},
    {field: 'course_name', headerName: 'Applied Course', width: 400},
    {field: 'email', headerName: 'Applicant Email', width: 200},
    {field: 'mobile_number', headerName: 'Applicant Phone', width: 200},
    {field: 'created_at', headerName: 'Applied Date', type: 'date', width: 160}
];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/applications`;

export default  function Applications() {
    return <MFCD url={URL} columns={columns} title="Users Applications" create={false} edit={false} />;
};