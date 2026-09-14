/* eslint-disable @typescript-eslint/no-explicit-any */
// Ambient type declarations for sonner to guarantee zero-error resolution across IDEs & tsserver
declare module "sonner" {
  import React from "react";

  export type ToastTypes =
    | "normal"
    | "action"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "loading"
    | "default";

  export interface ExternalToast {
    id?: number | string;
    description?: React.ReactNode;
    duration?: number;
    closeButton?: boolean;
    dismissible?: boolean;
    action?: {
      label: string;
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    };
    cancel?: {
      label: string;
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    };
    onDismiss?: (toast: any) => void;
    onAutoClose?: (toast: any) => void;
    className?: string;
    style?: React.CSSProperties;
    unstyled?: boolean;
  }

  export type TitleT = (() => React.ReactNode) | React.ReactNode;

  export interface ToastFunction {
    (message: TitleT, data?: ExternalToast): string | number;
    success: (message: TitleT, data?: ExternalToast) => string | number;
    info: (message: TitleT, data?: ExternalToast) => string | number;
    warning: (message: TitleT, data?: ExternalToast) => string | number;
    error: (message: TitleT, data?: ExternalToast) => string | number;
    custom: (
      jsx: (id: number | string) => React.ReactElement,
      data?: ExternalToast,
    ) => string | number;
    message: (message: TitleT, data?: ExternalToast) => string | number;
    promise: <T>(promise: Promise<T> | (() => Promise<T>), data?: any) => any;
    dismiss: (id?: number | string) => string | number;
    loading: (message: TitleT, data?: ExternalToast) => string | number;
    getHistory: () => any[];
    getToasts: () => any[];
  }

  export const toast: ToastFunction;
  export const Toaster: React.ForwardRefExoticComponent<any>;
  export function useSonner(): { toasts: any[] };
}
