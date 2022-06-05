export default function findChanges(obj1, obj2) {
	const list1 = Object.keys(obj1);
	const list2 = obj2;
	const result = {};

	if (list1.length === 0 && list2.length === 0) return null;

	list1.map((key) => {
		if (obj1[key] !== obj2[key]) result[key] = list2[key];
		return false;
	});

	return result;
}
