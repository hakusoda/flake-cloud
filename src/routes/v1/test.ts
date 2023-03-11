import { json, Handler } from 'sift';
export default (({ headers, referrer }) => json({ headers, referrer })) satisfies Handler