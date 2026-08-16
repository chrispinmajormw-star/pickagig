/* ============================================================
   PickAGig — supabaseClient.js
   Sets up and exports the single Supabase connection used
   everywhere else in the app.
   ============================================================ */

const supabaseUrl = 'https://gcrpoibvgfgnsqcitmof.supabase.co';
const supabaseKey = 'sb_publishable_nyGAPrUgP9ZYX-Z-8MI_sA_Z_gKzp5P';

export const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
