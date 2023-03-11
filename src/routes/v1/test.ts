import { json, Handler } from 'sift';
export default (({ headers }, c) => json({ ip: c.remoteAddr, headers: Object.fromEntries(headers.entries()) })) satisfies Handler