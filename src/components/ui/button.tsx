import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all duration-150 ease-out outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // GoVPN Tactical Primary
        default:
          "bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover active:scale-[0.98] shadow-md shadow-primary/20",
        primary:
          "bg-primary text-primary-foreground rounded-xl hover:bg-primary-hover active:scale-[0.98] shadow-md shadow-primary/20",
        primaryPill:
          "bg-primary text-primary-foreground rounded-full hover:bg-primary-hover active:scale-[0.98] shadow-md shadow-primary/20",

        // Secondary
        secondary:
          "bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 active:scale-[0.98]",
        secondaryPill:
          "bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 active:scale-[0.98]",

        // Outline
        outline:
          "border border-border bg-background/50 hover:bg-muted text-foreground rounded-xl hover:border-primary/50 active:scale-[0.98]",
        outlinePill:
          "border border-border bg-background/50 hover:bg-muted text-foreground rounded-full hover:border-primary/50 active:scale-[0.98]",

        // Destructive / Danger
        destructive:
          "bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 active:scale-[0.98]",
        dangerPill:
          "bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 active:scale-[0.98]",

        // Ghost & Link
        ghost:
          "hover:bg-muted hover:text-foreground rounded-xl active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 text-sm gap-2",
        xs: "h-6 px-2 text-xs gap-1 rounded-lg",
        sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
        lg: "h-11 px-6 text-base gap-2.5 rounded-xl",
        xl: "h-13 px-8 text-lg gap-3 rounded-2xl",
        icon: "size-9 rounded-xl",
        "icon-xs": "size-6 rounded-md [&_svg]:size-3",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "default", asChild = false, children, ...props },
    ref,
  ) => {
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(buttonVariants({ variant, size, className }), child.props.className),
        ...props,
      });
    }

    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </ButtonPrimitive>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
