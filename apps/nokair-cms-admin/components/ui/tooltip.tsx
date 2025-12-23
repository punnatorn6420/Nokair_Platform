import * as React from "react"

import { cn } from "@/lib/utils"

type TooltipContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  delayDuration?: number
}

const Tooltip = ({ children, delayDuration = 200 }: TooltipProps) => {
  const [open, setOpen] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration)
  }

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(false)
  }

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        className="relative inline-flex"
      >
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button ref={ref} data-slot="tooltip-trigger" className={cn(className)} type="button" {...props}>
      {children}
    </button>
  )
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(TooltipContext)

    if (!context?.open) return null

    return (
      <div
        ref={ref}
        role="tooltip"
        data-slot="tooltip-content"
        className={cn(
          "absolute left-1/2 top-full z-50 mt-2 w-max max-w-xs -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipContent, TooltipTrigger }
