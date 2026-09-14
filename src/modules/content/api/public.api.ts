// ==============================================================================
// GoVPN Public Content API Client (Posts, Public Settings & Uploads)
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { Post, SystemSetting, UploadResult, PresignUploadResult } from "../types/content.types";
import { PublicPostFilterParams } from "../types/public.types";

export const contentPublicApi = {
  // 1. GET /api/posts
  getPosts: (params?: PublicPostFilterParams): Promise<ApiResponse<Post[]>> =>
    apiClient.get<Post[]>("/api/posts", { params }),

  // 2. GET /api/posts/:slug
  getPostBySlug: (slug: string): Promise<ApiResponse<Post>> =>
    apiClient.get<Post>(`/api/posts/${slug}`),

  // 3. GET /api/settings
  getPublicSettings: (): Promise<ApiResponse<SystemSetting[]>> =>
    apiClient.get<SystemSetting[]>("/api/settings"),

  // 4. POST /api/public/upload
  uploadPublic: (formData: FormData): Promise<ApiResponse<UploadResult>> =>
    apiClient.post<UploadResult>("/api/public/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // 5. GET /api/public/upload/presign
  presignPublicUpload: (
    fileName: string,
    mimeType: string
  ): Promise<ApiResponse<PresignUploadResult>> =>
    apiClient.get<PresignUploadResult>("/api/public/upload/presign", {
      params: { file_name: fileName, mime_type: mimeType },
    }),
};
