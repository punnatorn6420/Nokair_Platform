/* eslint-disable @next/next/no-img-element */
import * as React from "react"

import { cn } from "@/lib/utils"

type AvatarContextValue = {
  fallback?: React.ReactNode
  hasError: boolean
  setHasError: (value: boolean) => void
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null)

const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { fallback?: React.ReactNode }>(
  ({ className, fallback, children, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false)

    return (
      <AvatarContext.Provider value={{ fallback, hasError, setHasError }}>
        <div
          ref={ref}
          data-slot="avatar"
          className={cn("relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border", className)}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    )
  }
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { fallbackDelay?: number }
>(({ className, onError, onLoad, alt = "", ...props }, ref) => {
  const context = React.useContext(AvatarContext)

  if (!context) {
    return null
  }

  if (context.hasError) {
    return null
  }

  return (
    <img
      ref={ref}
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      alt={alt}
      onError={(event) => {
        context.setHasError(true)
        onError?.(event)
      }}
      onLoad={(event) => {
        context.setHasError(false)
        onLoad?.(event)
      }}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AvatarContext)

    return (
      <div
        ref={ref}
        aria-hidden
        data-slot="avatar-fallback"
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground",
          className
        )}
        {...props}
      >
        {context?.fallback ?? children}
      </div>
    )
  }
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback, AvatarImage }
