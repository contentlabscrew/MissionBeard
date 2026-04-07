"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
}

const TabsValueContext = React.createContext<string>("")
const TabsChangeContext = React.createContext<((v: string) => void) | undefined>(undefined)

function Tabs({ value, onValueChange, className, children, ...props }: TabsProps) {
  return (
    <TabsValueContext.Provider value={value}>
      <TabsChangeContext.Provider value={onValueChange}>
        <div className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsChangeContext.Provider>
    </TabsValueContext.Provider>
  )
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
        className
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "value"> {
  value: string
}

function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const activeValue = React.useContext(TabsValueContext)
  const onValueChange = React.useContext(TabsChangeContext)
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        activeValue === value
          ? "bg-white text-foreground shadow-sm"
          : "hover:text-foreground",
        className
      )}
      onClick={() => onValueChange?.(value)}
      {...props}
    />
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function TabsContent({ className, value: tabValue, ...props }: TabsContentProps) {
  const activeValue = React.useContext(TabsValueContext)
  if (activeValue !== tabValue) return null
  return <div className={cn("mt-2", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
