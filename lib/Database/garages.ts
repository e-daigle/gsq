import IGarage from "../../interfaces/IGarage";
import { supabase } from "./supabase";

export const getGarages = async () => {
  try {
    const { data, error, status } = await supabase
      .from("garages")
      .select("id, image, name, link, image, phone, address, marker, pos");
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return data as IGarage[];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGaragesCount = async () => {
  try {
    const { error, status, count } = await supabase.from("garages").select("*", { count: 'exact', head: true });

    if (error && status !== 406) {
      throw error;
    }
    if (count !== null) return count;

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
