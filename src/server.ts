import { serve } from 'sift';

import v1 from './routes/v1/mod.ts';
serve({ ...v1 });