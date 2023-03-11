import { GET } from '../../src/helpers';
import { json } from '../../src/helpers/response';

export const config = { runtime: 'edge' };
export default GET(async ({ headers }) => {
	return json({
		ip: headers.get('x-real-ip'),
		headers: Object.fromEntries(headers.entries())
	});
});