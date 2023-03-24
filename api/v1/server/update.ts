import { POST } from '../../../src/helpers';
import supabase from '../../../src/supabase';
import { json, error } from '../../../src/helpers/response';
import type { UpdateBody } from '../../../src/types';
export const config = { runtime: 'edge', regions: ['iad1'] };
export default POST(async request => {
	const { headers } = request;

	const jobId = headers.get('roblox-job');
	const placeId = headers.get('roblox-id');
	const universeId = headers.get('roblox-uni');
	if (!jobId || !placeId || !universeId)
		return error(400, 'INVALID_ID');

	const key = headers.get('x-access-key');
	if (!key)
		return error(400, 'INVALID_KEY');

	const instance = (await supabase.from('cloud_instances').select('id').eq('access_key', key)).data?.[0];
	if (!instance)
		return error(400, 'INVALID_KEY');

	const ip = headers.get('x-real-ip') as string;

	const { players }: UpdateBody = await request.json();
	const data = await supabase
		.from('active_servers')
		.update({ players })
		.eq('job_id', jobId)
		.eq('place_id', placeId)
		.eq('server_ip', ip)
		.eq('universe_id', universeId)
		.eq('instance_id', instance.id);
	if (data.error)
		return error(500, data.error.message);

	return json({ success: true });
});