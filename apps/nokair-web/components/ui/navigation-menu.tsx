"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type NavigationMenuContextValue = {
  activeItem: string | null;
  setActiveItem: (value: string | null) => void;
};

const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null);
const NavigationMenuItemContext = React.createContext<string | null>(null);

const NavigationMenu = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  return (
    <NavigationMenuContext.Provider value={{ activeItem, setActiveItem }}>
      <nav
        data-slot="navigation-menu"
        className={cn("relative z-10 flex justify-center", className)}
        {...props}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
};

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-slot="navigation-menu-list"
    className={cn("group inline-flex space-x-1 rounded-lg border bg-card p-1 shadow-sm", className)}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement> & { value?: string }
>(({ className, value, ...props }, ref) => {
  const generatedValue = React.useId();
  const itemValue = value ?? generatedValue;

  return (
    <NavigationMenuItemContext.Provider value={itemValue}>
      <li
        ref={ref}
        data-slot="navigation-menu-item"
        className={cn("relative list-none", className)}
        {...props}
      />
    </NavigationMenuItemContext.Provider>
  );
});
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ReactNode }
>(({ className, children, icon, ...props }, ref) => {
  const { activeItem, setActiveItem } = React.useContext(NavigationMenuContext) ?? {};
  const itemValue = React.useContext(NavigationMenuItemContext);

  if (!itemValue) {
    throw new Error("NavigationMenuTrigger must be used within NavigationMenuItem");
  }

  const isActive = activeItem === itemValue;

  return (
    <button
      ref={ref}
      type="button"
      data-slot="navigation-menu-trigger"
      aria-expanded={isActive}
      className={cn(
        "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isActive ? "bg-accent text-foreground" : "hover:bg-muted",
        className
      )}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented && setActiveItem) {
          setActiveItem(isActive ? null : itemValue);
        }
      }}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { activeItem } = React.useContext(NavigationMenuContext) ?? {};
  const itemValue = React.useContext(NavigationMenuItemContext);

  if (!itemValue || activeItem !== itemValue) return null;

  return (
    <div
      ref={ref}
      data-slot="navigation-menu-content"
      className={cn(
        "absolute left-0 top-[calc(100%+0.5rem)] min-w-[200px] rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  );
});
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    data-slot="navigation-menu-link"
    className={cn("block rounded-md px-2 py-1 text-sm hover:bg-muted", className)}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
};
