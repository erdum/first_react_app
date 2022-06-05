// assets
import {IconBookmarks, IconBuildingBank, IconPhoto} from '@tabler/icons';

// ==============================|| colleges MENU ITEMS ||============================== //

const colleges = {
	id: 'colleges',
	title: 'Colleges',
	type: 'group',
	children: [
		{
			id: 'colleges',
			title: 'Colleges',
			type: 'item',
			url: '/admin/colleges',
			icon: IconBuildingBank,
			breadcrumbs: false
		},
		{
			id: 'subpage',
			title: 'Subpages',
			type: 'item',
			url: '/admin/subpages',
			icon: IconBookmarks,
			breadcrumbs: false
		},
		{
			id: 'logos',
			title: 'Colleges Logos',
			type: 'item',
			url: '/admin/logos',
			icon: IconPhoto,
			breadcrumbs: false
		}
	]
};

export default colleges;
