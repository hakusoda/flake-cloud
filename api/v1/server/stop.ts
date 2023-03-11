import { POST } from '../../../src/helpers';
import supabase from '../../../src/supabase';
import { error } from '../../../src/helpers/response';
export const config = { runtime: 'edge' };
export default POST(async ({ headers }) => {
	const jobId = headers.get('roblox-id2');
	const placeId = headers.get('roblox-id');
	if (!jobId || !placeId)
		return error(400, 'INVALID_ID');

	const key = headers.get('x-access-key');
	if (!key)
		return error(400, 'INVALID_KEY');

	const instance = (await supabase.from('cloud_instances').select('id').eq('access_key', key)).data?.[0];
	if (!instance)
		return error(400, 'INVALID_KEY');

	const ip = headers.get('x-real-ip') as string; 
	await supabase.from('active_servers').delete().eq('server_ip', ip);

	return new Response();
});