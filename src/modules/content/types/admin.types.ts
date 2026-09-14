// ==============================================================================
// GoVPN Content Admin Role Contracts (11 Endpoints)
// ==============================================================================

import { PostStatus } from "./content.types";

export interface CreatePostDto {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  featured_image?: string;
  status: PostStatus;
  tags?: string[];
}

export interface UpdatePostDto {
  title?: string;
  slug?: string;
  summary?: string;
  content?: string;
  featured_image?: string;
  status?: PostStatus;
  tags?: string[];
}

export interface UpdatePostStatusDto {
  post_id?: string | number;
  status: PostStatus;
}

export interface AdminPostFilterParams {
  status?: PostStatus | "ALL";
  search?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface CreateSettingDto {
  key: string;
  value: string;
  description?: string;
  group?: string;
  is_public?: boolean;
}

export interface UpdateSettingDto {
  key?: string;
  value?: string;
  description?: string;
  group?: string;
  is_public?: boolean;
}
