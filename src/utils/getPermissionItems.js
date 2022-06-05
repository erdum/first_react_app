import menuItems from 'menu-items';

export default function getPermissionItems() {
	const items = [
		{ label: 'All', id: 'all' },
		{ label: 'None', id: 'none' }
	];
	menuItems.items.map((item) => {
		item.children.map((subItem) => {
			items.push({ label: subItem.title, id: subItem.id });
			return false;
		});
		return false;
	});

	return items;
}
