"use client";

import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn("container mx-auto px-4", className)} {...props}>
      {children}
    </div>
  );
}
