import * as React from "react"

import { cn } from "@/lib/utils"

type SelectOption = {
  value: string
  label?: React.ReactNode
  disabled?: boolean
}

type SelectContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  value: string | undefined
  setValue: (value: string) => void
  options: React.MutableRefObject<Map<string, SelectOption>>
  placeholder?: string
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  children?: React.ReactNode
}

const Select = ({ value, defaultValue, onValueChange, placeholder, children }: SelectProps) => {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const options = React.useRef(new Map<string, SelectOption>())

  const setValue = React.useCallback(
    (next: string) => {
      setInternalValue(next)
      onValueChange?.(next)
      setOpen(false)
    },
    [onValueChange]
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <SelectContext.Provider value={{ open, setOpen, value: value ?? internalValue, setValue, options, placeholder }}>
      <div className="relative inline-block min-w-48">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)

    if (!context) throw new Error("Select components must be used within <Select>")

    return (
      <button
        ref={ref}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={context.open}
        data-slot="select-trigger"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow]",
          "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive",
          className
        )}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          props.onClick?.(event)
          if (!event.defaultPrevented) {
            context.setOpen(!context.open)
          }
        }}
        {...props}
      >
        {children ?? <SelectValue />}
        <span className="ml-2 text-muted-foreground">▾</span>
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(SelectContext)
    const contentRef = React.useRef<HTMLDivElement | null>(null)

    React.useImperativeHandle(ref, () => contentRef.current as HTMLDivElement)

    React.useEffect(() => {
      if (!context?.open) return
      const handleClick = (event: MouseEvent) => {
        const target = event.target as Node
        if (!contentRef.current?.contains(target)) {
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
        role="listbox"
        data-slot="select-content"
        className={cn(
          "absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
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
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; disabled?: boolean }
>(({ className, children, value, disabled, ...props }, ref) => {
  const context = React.useContext(SelectContext)

  if (!context) throw new Error("Select components must be used within <Select>")

  React.useEffect(() => {
    context.options.current.set(value, { value, label: children, disabled })
    return () => {
      context.options.current.delete(value)
    }
  }, [children, context.options, disabled, value])

  const isSelected = context.value === value

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      data-slot="select-item"
      data-state={isSelected ? "checked" : "unchecked"}
      data-disabled={disabled ? "true" : undefined}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none transition-colors",
        isSelected && "bg-accent text-accent-foreground",
        disabled ? "pointer-events-none opacity-50" : "hover:bg-muted",
        className
      )}
      onClick={(event) => {
        props.onClick?.(event)
        if (!event.defaultPrevented && !disabled) {
          context.setValue(value)
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = React.useContext(SelectContext)
  if (!context) return null

  const selected = context.value ? context.options.current.get(context.value) : undefined

  return (
    <span data-slot="select-value" className={cn("flex-1 text-left", !selected && "text-muted-foreground")}>
      {selected?.label ?? placeholder ?? context.placeholder ?? "Select"}
    </span>
  )
}

const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="select-label" className={cn("px-3 py-2 text-xs font-medium text-muted-foreground", className)} {...props} />
  )
)
SelectLabel.displayName = "SelectLabel"

const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="select-group" className={cn("space-y-1", className)} {...props} />
  )
)
SelectGroup.displayName = "SelectGroup"

const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("my-1 h-px bg-border", className)} {...props} />
  )
)
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
