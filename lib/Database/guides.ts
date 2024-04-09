import IGuide from "../../interfaces/IGuide";
import IGuideContent from "../../interfaces/IGuideContent";
import { Database, supabase } from "./supabase";

export const getGuides = async () => {
  try {
    const { data, error, status } = await supabase
      .from("guides")
      .select("id, titre, desc, link, image, modified_at");
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data as IGuide[];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGuidesPaths = async () => {
  try {
    const { data, error, status } = await supabase
      .from("guides")
      .select("link");
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGuide = async (name: string) => {
  try {
    const { data, error, status } = await supabase
      .from("guides")
      .select("longTitle, content, desc, modified_at, created_at")
      .eq("link", name)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      var guide: IGuideContent = {
        title: data.longTitle,
        paragraphs: data.content,
        description: data.desc,
        created_at: data.created_at??data.modified_at,
        modified_at: data.modified_at
      };
      return guide;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGuidesCount = async () => {
  try {
    const { error, status, count } = await supabase.from("guides").select("*", { count: 'exact', head: true });

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
