import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "inverse" | "text";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium text-sm md:text-base px-5 py-2.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-plum text-white hover:bg-plum-dark",
  secondary: "border border-plum text-plum bg-transparent hover:bg-blush",
  inverse: "bg-white text-plum hover:bg-blush",
  text: "text-plum underline-offset-4 hover:underline px-0 py-0",
};

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
}

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
