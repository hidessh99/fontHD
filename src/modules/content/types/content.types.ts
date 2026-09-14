// ==============================================================================
// GoVPN Content & CMS Core Domain Types (18 Endpoints)
// Synchronized with backendv2 Post, Setting & Media Domain
// ==============================================================================

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Post {
  id: string | number;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  featured_image?: string;
  author_name?: string;
  status: PostStatus;
  tags?: string[];
  views_count?: number;
  published_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface SystemSetting {
  id: string | number;
  key: string;
  value: string;
  description?: string;
  group?: string; // e.g., "GENERAL", "PAYMENT", "BRANDING", "SECURITY"
  is_public: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UploadResult {
  file_url: string;
  file_name: string;
  file_size?: number;
  mime_type?: string;
}

export interface PresignUploadResult {
  upload_url: string;
  file_url: string;
  file_key: string;
}
