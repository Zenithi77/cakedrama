export type ProductCategory =
  | "castella"
  | "big_cake"
  | "roll_snack"
  | "donut"
  | "mini_donut"
  | "fatcaron";

export type ProductRow = {
  id: string;
  category: ProductCategory;
  name: string;
  image: string;
  images: string[];
  weight: string | null;
  packaging: string | null;
  storage: string | null;
  shelf_life: string | null;
  thawing: string | null;
  sort_order: number;
  created_at: string;
};

export type SpecialRow = {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description: string;
  sort_order: number;
  created_at: string;
};

export type PartnerRow = {
  id: string;
  name: string;
  logo: string;
  sort_order: number;
  created_at: string;
};

export type ContactMessageRow = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  created_at: string;
};

export type UserRole = "customer" | "admin";

export type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: Partial<ProductRow> & Pick<ProductRow, "category" | "name" | "image">;
        Update: Partial<ProductRow>;
        Relationships: [];
      };
      specials: {
        Row: SpecialRow;
        Insert: Partial<SpecialRow> & Pick<SpecialRow, "title" | "image" | "description">;
        Update: Partial<SpecialRow>;
        Relationships: [];
      };
      partners: {
        Row: PartnerRow;
        Insert: Partial<PartnerRow> & Pick<PartnerRow, "name" | "logo">;
        Update: Partial<PartnerRow>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: Partial<ContactMessageRow> & Pick<ContactMessageRow, "name" | "message">;
        Update: Partial<ContactMessageRow>;
        Relationships: [];
      };
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & Pick<ProfileRow, "id">;
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
