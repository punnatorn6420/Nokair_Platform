import * as React from "react"

import { cn } from "@/lib/utils"

type PopoverContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  triggerElement: HTMLElement | null
  setTriggerElement: (node: HTMLElement | null) => void
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Popover = ({ open, defaultOpen, onOpenChange, className, children, ...props }: PopoverProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null)

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

  return (
    <PopoverContext.Provider value={{ open: open ?? internalOpen, setOpen, triggerElement, setTriggerElement }}>
      <div className={cn("relative inline-block", className)} {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(PopoverContext)

    if (!context) throw new Error("Popover components must be used inside <Popover>")

    return (
      <button
        ref={(instance: HTMLButtonElement) => {
          if (typeof ref === "function") ref(instance)
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = instance
          context.setTriggerElement(instance)
        }}
        data-slot="popover-trigger"
        type="button"
        className={cn(className)}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) {
            context.setOpen(!context.open)
          }
        }}
        {...props}
      >
        {children}
      </button>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, children, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (!context?.open) return

      const handleClick = (event: MouseEvent) => {
        const target = event.target as Node
        if (!contentRef.current?.contains(target) && !context.triggerElement?.contains(target)) {
          context.setOpen(false)
        }
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") context.setOpen(false)
      }

      document.addEventListener("mousedown", handleClick)
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("mousedown", handleClick)
        document.removeEventListener("keydown", handleEscape)
      }
    }, [context])

    if (!context?.open) return null

    return (
      <div
        ref={contentRef}
        data-slot="popover-content"
        className={cn(
          "z-50 mt-2 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", 
          "animate-in fade-in-0 zoom-in-95", 
          className
        )}
        style={{ minWidth: 200, position: "absolute", top: "calc(100% + 0.5rem)", left: 0, ...style }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverContent, PopoverTrigger }
