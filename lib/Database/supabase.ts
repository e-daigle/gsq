import { createClient } from "@supabase/supabase-js";
import IGuideContent from "../../interfaces/IGuideContent";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]
  | IGuideContent["paragraphs"];

export type Database = {
  public: {
    Tables: {
      errors: {
        Row: {
          created_at: string;
          error: string | null;
          handled: boolean;
          id: number;
          page: string | null;
        };
        Insert: {
          created_at?: string;
          error?: string | null;
          handled?: boolean;
          id?: number;
          page?: string | null;
        };
        Update: {
          created_at?: string;
          error?: string | null;
          handled?: boolean;
          id?: number;
          page?: string | null;
        };
        Relationships: [];
      };
      garages: {
        Row: {
          active: boolean;
          address: string;
          created_at: string | null;
          id: number;
          image: string;
          lat: number | null;
          link: string;
          lng: number | null;
          marker: string;
          name: string;
          phone: string;
          pos: Json;
        };
        Insert: {
          active?: boolean;
          address?: string;
          created_at?: string | null;
          id?: number;
          image?: string;
          lat?: number | null;
          link?: string;
          lng?: number | null;
          marker?: string;
          name?: string;
          phone?: string;
          pos: Json;
        };
        Update: {
          active?: boolean;
          address?: string;
          created_at?: string | null;
          id?: number;
          image?: string;
          lat?: number | null;
          link?: string;
          lng?: number | null;
          marker?: string;
          name?: string;
          phone?: string;
          pos?: Json;
        };
        Relationships: [];
      };
      guides: {
        Row: {
          content: IGuideContent["paragraphs"];
          created_at: string | null;
          desc: string;
          id: number;
          image: string;
          link: string;
          longTitle: string;
          modified_at: string;
          titre: string;
        };
        Insert: {
          content: Json;
          created_at?: string | null;
          desc?: string;
          id?: number;
          image?: string;
          link?: string;
          longTitle?: string;
          modified_at?: string;
          titre?: string;
        };
        Update: {
          content?: Json;
          created_at?: string | null;
          desc?: string;
          id?: number;
          image?: string;
          link?: string;
          longTitle?: string;
          modified_at?: string;
          titre?: string;
        };
        Relationships: [];
      };
      views: {
        Row: {
          id: number;
          month: string;
          updated_at: string;
          view_count: number;
        };
        Insert: {
          id?: number;
          month: string;
          updated_at?: string;
          view_count?: number;
        };
        Update: {
          id?: number;
          month?: string;
          updated_at?: string;
          view_count?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      lastmonth_errors: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      update_views: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
