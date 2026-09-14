// ==============================================================================
// GoVPN IAM Components Barrel Export
// Synchronized with Pola C: Role-Partitioned Architecture
// ==============================================================================

// Shared
export * from "./shared/IamSkeleton";
export * from "./shared/RoleBadge";
export * from "./shared/SessionDeviceItem";

// Guest
export * from "./guest/LoginForm";
export * from "./guest/RegisterForm";
export * from "./guest/ForgotPasswordModal";
export * from "./guest/VerifyEmailBanner";

// User
export * from "./user/ProfileCard";
export * from "./user/ChangePasswordModal";
export * from "./user/TwoFactorSetupModal";
export * from "./user/UserSessionManager";
export * from "./user/AddressManager";

// Admin
export * from "./admin/AdminUserTable";
export * from "./admin/AdminBalanceAdjustModal";
export * from "./admin/AdminRoleManager";
export * from "./admin/AdminUserActivityTable";
