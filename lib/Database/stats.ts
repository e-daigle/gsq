import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./supabase";

export const getLastMonthViews = async (supabase: SupabaseClient<Database>) => {
  try {
    const { data, error } = await supabase
      .from("views")
      .select("view_count")
      .order("month", { ascending: false })
      .limit(1);
    if (error) throw error;

    if (data && data[0]) {
      return data[0].view_count;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
