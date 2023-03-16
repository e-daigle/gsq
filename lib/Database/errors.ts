import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database, supabase } from "./supabase";

export const addError = async (
  errorMessage: string,
  page: string
) => {
  try {
    const { error } = await supabase
      .from("errors")
      .insert({ error: errorMessage, page: page });
    if (error) throw error;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getErrorsCount = async (supabase: SupabaseClient<Database>) => {
  try {
    const { data, error } = await supabase.rpc("lastmonth_errors")
    if (error) {
      throw error;
    }
    if(data) return data 
    return null
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUnHandledErrors = async (supabase: SupabaseClient<Database>) => {
  try {
    const { data, error } = await supabase
      .from("errors")
      .select("*").eq("handled", false);
    if (error) {
      throw error;
    }
    return data
  } catch (error) {
    throw error
  }
};
