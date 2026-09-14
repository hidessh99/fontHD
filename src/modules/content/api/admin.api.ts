// ==============================================================================
// GoVPN Content Admin API Client (11 Endpoints: Posts & Settings CRUD)
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { Post, SystemSetting } from "../types/content.types";
import {
  CreatePostDto,
  UpdatePostDto,
  UpdatePostStatusDto,
  AdminPostFilterParams,
  CreateSettingDto,
  UpdateSettingDto,
} from "../types/admin.types";

export const contentAdminApi = {
  // 1. GET /api/admin/post
  listPosts: (params?: AdminPostFilterParams): Promise<ApiResponse<Post[]>> =>
    apiClient.get<Post[]>("/api/admin/post", { params }),

  // 2. POST /api/admin/post
  createPost: (data: CreatePostDto): Promise<ApiResponse<Post>> =>
    apiClient.post<Post>("/api/admin/post", data),

  // 3. GET /api/admin/post/:id
  getPost: (id: string | number): Promise<ApiResponse<Post>> =>
    apiClient.get<Post>(`/api/admin/post/${id}`),

  // 4. PUT /api/admin/post/:id
  updatePost: (id: string | number, data: UpdatePostDto): Promise<ApiResponse<Post>> =>
    apiClient.put<Post>(`/api/admin/post/${id}`, data),

  // 5. DELETE /api/admin/post/:id
  deletePost: (id: string | number): Promise<ApiResponse<void>> =>
    apiClient.delete<void>(`/api/admin/post/${id}`),

  // 6. PATCH /api/admin/post/status
  updatePostStatus: (data: UpdatePostStatusDto): Promise<ApiResponse<Post>> =>
    apiClient.patch<Post>("/api/admin/post/status", data),

  // 7. GET /api/admin/settings
  listSettings: (): Promise<ApiResponse<SystemSetting[]>> =>
    apiClient.get<SystemSetting[]>("/api/admin/settings"),

  // 8. POST /api/admin/settings
  createSetting: (data: CreateSettingDto): Promise<ApiResponse<SystemSetting>> =>
    apiClient.post<SystemSetting>("/api/admin/settings", data),

  // 9. GET /api/admin/settings/:id
  getSetting: (id: string | number): Promise<ApiResponse<SystemSetting>> =>
    apiClient.get<SystemSetting>(`/api/admin/settings/${id}`),

  // 10. PUT /api/admin/settings/:id
  updateSetting: (
    id: string | number,
    data: UpdateSettingDto
  ): Promise<ApiResponse<SystemSetting>> =>
    apiClient.put<SystemSetting>(`/api/admin/settings/${id}`, data),

  // 11. DELETE /api/admin/settings/:id
  deleteSetting: (id: string | number): Promise<ApiResponse<void>> =>
    apiClient.delete<void>(`/api/admin/settings/${id}`),
};
