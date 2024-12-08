import { createClient } from "@supabase/supabase-js";
const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_anon_key = import.meta.env.VITE_SUPABASE_ANAON_KEY;

export const supabase = createClient(supabase_url, supabase_anon_key);
export const formatDateToDDMMYYYY = (date: Date): number =>
  parseInt(
    `${String(date.getDate()).padStart(2, "0")}${String(date.getMonth() + 1).padStart(2, "0")}${date.getFullYear()}`,
  );
