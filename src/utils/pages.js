export const getPagesCount = (tatalCount, limit) => {
	return Math.ceil(tatalCount / limit);
}