import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zejkbveigebqiiwvosrd.supabase.co';
const SUPABASE_KEY = 'sb_publishable__R1mWzUGZZQKrBT4L_1RhA_UC6vRa6E';

export const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
