import { POST } from '../../../src/helpers';
import supabase from '../../../src/supabase';
import { json, error } from '../../../src/helpers/response';
export const config = { runtime: 'edge' };
export default POST(async request => {
	const { headers } = request;

	const jobId = headers.get('roblox-job');
	const placeId = headers.get('roblox-id');
	if (!jobId || !placeId)
		return error(400, 'INVALID_ID');

	const key = headers.get('x-access-key');
	if (!key)
		return error(400, 'INVALID_KEY');

	const instance = (await supabase.from('cloud_instances').select('id').eq('access_key', key)).data?.[0];
	if (!instance)
		return error(400, 'INVALID_KEY');

	// TODO: roblox server validation
	const ip = headers.get('x-real-ip') as string; 
	await supabase.from('active_servers').delete().eq('server_ip', ip);

	const { players }: { players: number } = await request.json();
	const { data } = await supabase.from('active_servers').insert({
		job_id: jobId,
		players: players || 0,
		place_id: parseInt(placeId),
		server_ip: ip,
		instance_id: instance.id
	}).select('id');
	if (!data)
		return error(500, 'UNKNOWN_ERROR');

	return json({
		id: data[0].id,
		success: true
	}, 200, 3600);
});