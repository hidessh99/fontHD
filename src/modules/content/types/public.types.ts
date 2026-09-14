// ==============================================================================
// GoVPN Public & Guest Content Contracts (3 Endpoints + Uploads)
// ==============================================================================

export interface PublicPostFilterParams {
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
}

export type PublicSettingsMap = Record<string, string>;
