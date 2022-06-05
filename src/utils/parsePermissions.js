export default function parsePermissions(items) {
    const permissions = JSON.parse(sessionStorage.getItem('permissions'));

    if (!permissions) return [];
    if (permissions?.includes('all')) return items;
    if (permissions?.includes('None')) return [{
        id: "you_do_not_have_permission",
        title: 'You do not have permissions',
        type: 'group',
        children: []
    }];

    const output = items.map(({id, children, type, title}) => {
        const childs = children.filter(({id}) => permissions.includes(id));
        return {id, title, type, children: childs};
    });

    return output;
}