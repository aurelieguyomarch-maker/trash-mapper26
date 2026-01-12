import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Create a single instance of Supabase client to avoid multiple instances warning
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export { projectId, publicAnonKey };
