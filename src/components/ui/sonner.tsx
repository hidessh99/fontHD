"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-sans"
      position="top-right"
      visibleToasts={3}
      duration={3500}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface dark:group-[.toaster]:bg-popover group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-md font-semibold text-sm",
          description: "group-[.toast]:text-foreground-secondary text-xs",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-bold rounded-full text-xs",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-foreground-secondary font-semibold rounded-full text-xs",
          closeButton:
            "group-[.toast]:border-border group-[.toast]:bg-surface dark:group-[.toast]:bg-popover group-[.toast]:text-foreground-muted hover:group-[.toast]:text-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
