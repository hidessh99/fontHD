// ==============================================================================
// GoVPN User Content API Client (Authenticated Media Uploads)
// ==============================================================================

import { apiClient, ApiResponse } from "@/lib/api/http-client";
import { UploadResult, PresignUploadResult } from "../types/content.types";

export const contentUserApi = {
  // 1. POST /api/upload
  uploadMedia: (formData: FormData): Promise<ApiResponse<UploadResult>> =>
    apiClient.post<UploadResult>("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // 2. GET /api/upload/presign
  presignUpload: (
    fileName: string,
    mimeType: string
  ): Promise<ApiResponse<PresignUploadResult>> =>
    apiClient.get<PresignUploadResult>("/api/upload/presign", {
      params: { file_name: fileName, mime_type: mimeType },
    }),
};
