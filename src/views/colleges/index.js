import MFCD from 'ui-component/MFCD';

const arrayToValues = ({value}) => {
    let output = '';
    value.forEach((item, index) => {
        if (index + 1 === value.length) {
            output += item;
        } else {
            output += `${item}, `;
        }
    });
    return output;
};

const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Name', width: 450},
    {field: 'slug', headerName: 'Slug', width: 450},
    {field: 'estd', headerName: 'Established Date', width: 200, type: 'date'},
    {field: 'state', headerName: 'State', width: 200, type: 'search', options: '/state-list'},
    {field: 'city', headerName: 'City', width: 200, type: 'search', options: '/city-list'},
    {field: 'location', headerName: 'Location', width: 200},
    {field: 'website', headerName: 'Website', width: 200},
    {field: 'featuredImages', headerName: 'Featured Images', width: 200, type: 'file', multiple: true, hide: true},

    {
        field: 'college_type',
        headerName: 'College Type',
        width: 200,
        type: 'search',
        options: '/college-type-list',
        multiple: true,
        valueGetter: arrayToValues
    },
    {
        field: 'streams',
        headerName: 'Streams',
        width: 200,
        type: 'search',
        multiple: true,
        options: '/streams-list',
        valueGetter: arrayToValues
    },
    {
        field: 'affiliated',
        headerName: 'Affiliated To',
        width: 200,
        type: 'search',
        multiple: true,
        options: '/affiliated-list',
        valueGetter: arrayToValues
    },
    {
        field: 'program_types',
        headerName: 'Program Types',
        width: 200,
        type: 'search',
        multiple: true,
        options: '/program-type-list',
        valueGetter: arrayToValues
    },
    {
        field: 'course_types',
        headerName: 'Course Types',
        width: 200,
        type: 'search',
        multiple: true,
        options: '/course-type-list'
    },
    {
        field: 'entrance_exams',
        headerName: 'Entrance Exams',
        width: 200,
        type: 'search',
        multiple: true,
        options: '/entrance-exam-list',
        valueGetter: arrayToValues
    },
    {
        field: 'courses',
        headerName: 'Courses',
        width: 200,
        type: 'search',
        multiple: true,
        options: '/courses-list',
        valueGetter: arrayToValues
    }
];

const URL = `${process.env.REACT_APP_BASE_URL}/colleges`;

export default function Colleges() {
    return (
        <>
            <MFCD columns={columns} url={URL} title="Colleges" paginate serverFiltering/>
        </>
    );
}
