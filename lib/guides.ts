import IGuide from "../interfaces/IGuide";
import IGuideContent from "../interfaces/IGuideContent";
import { Database, supabase } from "../utils/supabase";

export const getGuides = async () => {
  try {
    const { data, error, status } = await supabase
      .from("guides")
      .select("id, titre, desc, link, image");
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
      return data 
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGuide = async (name: string) => {
  console.log(name);
  try {
    const { data, error, status } = await supabase
      .from("guides")
      .select("longTitle, content")
      .eq("link", name)
      .single();
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      var guide: IGuideContent = {
        title: data.longTitle,
        paragraphs: data.content,
      }

      console.log(guide);
      return guide;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
