export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "user" | "operator" | "admin";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price_cents: number;
          currency: string;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          stripe_session_id: string | null;
          status: "pending" | "complete" | "cancelled" | "refunded";
          amount_cents: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
