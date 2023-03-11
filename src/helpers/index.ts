import { error } from './response';
export type Handler = (request: Request) => Response | Promise<Response>
export function handler(methods: string[], func: Handler): Handler {
	return (req: Request) => {
		if (!methods.includes(req.method))
			return error(405, 'METHOD_NOT_ALLOWED');
		return func(req);
	};
}

export function GET(func: Handler) {
	return handler(['GET'], func);
}
export function POST(func: Handler) {
	return handler(['POST'], func);
}