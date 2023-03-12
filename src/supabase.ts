import type { Player } from './types';
import { createClient } from '@supabase/supabase-js';
export interface Database {
	flake: {
		Views: {}
		Tables: {
			active_servers: {
				Row: {
					id: number
					job_id: string
					players: Player[]
					place_id: number
					server_ip: string
					created_at: string
					instance_id: number
					flake_version?: string
				}
				Insert: {
					job_id: string
					players: Player[]
					place_id: number
					server_ip: string
					instance_id: number
					flake_version?: string
				}
				Update: {
					players: Player[]
				}
			}
			cloud_instances: {
				Row: {
					id: number
					owner: string
					access_key: string
					created_at: string
				}
				Insert: {}
				Update: {}
			}
		}
		Functions: {}
	}
}
export default createClient<Database>(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_KEY as string,
	{ db: { schema: 'flake' as any } }
);