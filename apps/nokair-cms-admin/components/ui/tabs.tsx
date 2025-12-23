import * as React from "react"

import { cn } from "@/lib/utils"

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const Tabs = ({ value, defaultValue, onValueChange, className, children, ...props }: TabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const currentValue = value ?? internalValue

  const setValue = React.useCallback(
    (next: string) => {
      setInternalValue(next)
      onValueChange?.(next)
    },
    [onValueChange]
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div data-slot="tabs" className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      data-slot="tabs-list"
      className={cn("inline-flex items-center justify-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground", className)}
      {...props}
    />
  )
)
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)

  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>")
  }

  const isActive = context.value === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      data-slot="tabs-trigger"
      data-state={isActive ? "active" : "inactive"}
      aria-selected={isActive}
      className={cn(
        "inline-flex min-w-20 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isActive ? "bg-background text-foreground shadow" : "hover:text-foreground",
        className
      )}
      onClick={(event) => {
        props.onClick?.(event)
        if (!event.defaultPrevented) {
          context.setValue(value)
        }
      }}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext)

    if (!context) {
      throw new Error("Tabs components must be used within <Tabs>")
    }

    if (context.value !== value) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-slot="tabs-content"
        className={cn("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className)}
        {...props}
      />
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsContent, TabsList, TabsTrigger }
