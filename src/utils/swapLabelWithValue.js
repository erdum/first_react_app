export default function swapLabelWithValue(item, options) {
	if (typeof item === 'object') return item?.id;

	if (typeof item === 'string' && options && options.length > 0) {
		const [ { id } ] = options.filter((opt) => (opt.label === item));
		return id;
	}
	return null
};