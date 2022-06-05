import { IconReportSearch, IconTool } from '@tabler/icons';

// ==============================|| site POST MENU ITEMS ||=========================== //

const site = {
	id: 'site-settings',
	title: 'Site Settings',
	type: 'group',
	children: [
		{
			id: 'seo-settings',
			title: 'Seo Settings',
			type: 'item',
			url: '/admin/seo',
			icon: IconReportSearch,
			breadcrumbs: false
		},
		{
			id: 'main-page-settings',
			title: 'Main Page Settings',
			type: 'item',
			url: '/admin/settings',
			icon: IconTool,
			breadcrumbs: false
		}
	]
};

export default site;
