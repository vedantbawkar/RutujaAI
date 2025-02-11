import React from "react";
import { cn } from "@/lib/utils";

const DropdownMenu = ({ className = "", children, ...props }) => {
  return (
    <div className={cn("relative inline-block text-left", className)} {...props}>
      {children}
    </div>
  );
};

const DropdownMenuTrigger = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white text-gray-900 border border-gray-300 px-4 py-2 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = ({ className = "", children, ...props }) => {
  return (
    <div
      className={cn(
        "absolute mt-2 w-56 rounded-md shadow-lg bg-white border border-gray-200 z-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-teal-100 focus:outline-none focus:bg-teal-200",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
