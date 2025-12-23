import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

type SheetSide = "top" | "right" | "bottom" | "left"

type SheetContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  side: SheetSide
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

interface SheetProps {
  children?: React.ReactNode
  side?: SheetSide
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Sheet = ({ children, side = "right", open, defaultOpen, onOpenChange }: SheetProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)

  const setOpen = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  React.useEffect(() => {
    if (open !== undefined) setInternalOpen(open)
  }, [open])

  return (
    <SheetContext.Provider value={{ open: open ?? internalOpen, setOpen, side }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const context = React.useContext(SheetContext)

    if (!context) throw new Error("Sheet components must be used within <Sheet>")

    return (
      <button
        ref={ref}
        type="button"
        data-slot="sheet-trigger"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) context.setOpen(true)
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SheetTrigger.displayName = "SheetTrigger"

const SheetPortal = ({ children }: { children: React.ReactNode }) =>
  typeof document !== "undefined" ? createPortal(children, document.body) : null

const SheetOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
)
SheetOverlay.displayName = "SheetOverlay"

const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { side?: SheetSide }>(
  ({ className, children, side = "right", ...props }, ref) => {
    const context = React.useContext(SheetContext)
    const resolvedSide = context?.side ?? side

    if (!context?.open) return null

    const sideClasses: Record<SheetSide, string> = {
      right: "inset-y-0 right-0 h-full w-80 translate-x-0",
      left: "inset-y-0 left-0 h-full w-80 translate-x-0",
      top: "inset-x-0 top-0 h-1/3 w-full",
      bottom: "inset-x-0 bottom-0 h-1/3 w-full",
    }

    return (
      <SheetPortal>
        <SheetOverlay data-state={context.open ? "open" : "closed"} />
        <div
          ref={ref}
          data-slot="sheet-content"
          data-side={resolvedSide}
          className={cn(
            "fixed z-50 border bg-background p-6 shadow-lg outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            resolvedSide === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            resolvedSide === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
            resolvedSide === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            resolvedSide === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            sideClasses[resolvedSide],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SheetPortal>
    )
  }
)
SheetContent.displayName = "SheetContent"

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="sheet-header" className={cn("mb-4 flex flex-col gap-1 text-left", className)} {...props} />
)

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="sheet-footer" className={cn("mt-6 flex flex-col gap-2", className)} {...props} />
)

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} data-slot="sheet-title" className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
)
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-slot="sheet-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
SheetDescription.displayName = "SheetDescription"

const SheetClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const context = React.useContext(SheetContext)
    if (!context) throw new Error("Sheet components must be used within <Sheet>")

    return (
      <button
        ref={ref}
        type="button"
        data-slot="sheet-close"
        onClick={(event) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) context.setOpen(false)
        }}
        {...props}
      >
        {children ?? <span className="sr-only">Close</span>}
      </button>
    )
  }
)
SheetClose.displayName = "SheetClose"

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
}
