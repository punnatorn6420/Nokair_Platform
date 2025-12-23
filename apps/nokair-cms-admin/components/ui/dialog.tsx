import * as React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

type DialogContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const Dialog = ({ open, defaultOpen, onOpenChange, children }: DialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)

  const setOpen = React.useCallback(
    (next: boolean) => {
      setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  React.useEffect(() => {
    if (open !== undefined) {
      setInternalOpen(open)
    }
  }, [open])

  return <DialogContext.Provider value={{ open: open ?? internalOpen, setOpen }}>{children}</DialogContext.Provider>
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const context = React.useContext(DialogContext)

    if (!context) throw new Error("Dialog components must be used within <Dialog>")

    return (
      <button
        ref={ref}
        data-slot="dialog-trigger"
        type="button"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) {
            context.setOpen(true)
          }
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DialogTrigger.displayName = "DialogTrigger"

const DialogPortal = ({ children }: { children: React.ReactNode }) =>
  typeof document !== "undefined" ? createPortal(children, document.body) : null

const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
)
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DialogContext)

    React.useEffect(() => {
      if (!context?.open) return
      const handler = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          context.setOpen(false)
        }
      }
      document.addEventListener("keydown", handler)
      return () => document.removeEventListener("keydown", handler)
    }, [context])

    if (!context?.open) return null

    return (
      <DialogPortal>
        <DialogOverlay data-state={context.open ? "open" : "closed"} />
        <div
          ref={ref}
          role="dialog"
          aria-modal
          data-slot="dialog-content"
          data-state={context.open ? "open" : "closed"}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background p-6 shadow-lg outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-header" className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
)

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} data-slot="dialog-title" className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} data-slot="dialog-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
DialogDescription.displayName = "DialogDescription"

const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const context = React.useContext(DialogContext)
    if (!context) throw new Error("Dialog components must be used within <Dialog>")

    return (
      <button
        ref={ref}
        type="button"
        data-slot="dialog-close"
        onClick={(event) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) {
            context.setOpen(false)
          }
        }}
        {...props}
      >
        {children ?? <span className="sr-only">Close</span>}
      </button>
    )
  }
)
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
}
