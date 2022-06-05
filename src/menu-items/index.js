import managment from './managment';
import blog from './blog';
import site from './site';
import data from './data';
import colleges from './colleges';

import parsePermissions from 'utils/parsePermissions';

// ==============================|| MENU ITEMS ||============================== //

const authenticatedItems = parsePermissions([managment, blog, colleges, site, data]);

const menuItems = {
    items: authenticatedItems
};

export default menuItems;
