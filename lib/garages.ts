import IGarage from "../interfaces/IGarage";
import { supabase } from "../utils/supabase";

export const getGarages = async () => {
  try {
    const { data, error, status } = await supabase.from("garages").select("*");
    if (error && status !== 406) {
      throw error;
    }
    if(data)
    {
        return data
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
