import { IconFileText } from '@tabler/icons';

// ==============================|| BLOG POST MENU ITEMS ||=========================== //

const blog = {
	id: 'blog',
	title: 'Blog',
	type: 'group',
	children: [
		{
			id: 'blogs',
			title: 'Blogs',
			type: 'item',
			url: '/admin/blogs',
			icon: IconFileText,
			breadcrumbs: false
		}
	]
};

export default blog;
