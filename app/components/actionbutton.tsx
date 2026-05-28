'use client';
import Link from "next/link";
import { ReactNode } from "react";

type ActionButtonProps = {
  onClick?: () => void;
  loading?: boolean;
  children: ReactNode;
  loadingChildren?: ReactNode;
  className?: string;
  loadingClassName?: string;
  disabled?: boolean;
  href?: string;
};

export default function ActionButton({
  onClick,
  loading = false,
  children,
  loadingChildren,
  className = "",
  loadingClassName = "",
  disabled = false,
  href
}: ActionButtonProps) {
  const isDisabled = loading || disabled;

  const childrenContent = loading ? (loadingChildren ?? children) : children;

  const style = `
    flex items-center justify-center gap-2
    transition-colors rounded-border-inner py-3 text-2xl font-bold
    ${loading ? loadingClassName : className}
    ${isDisabled ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
  `;

  if (href) {
    return (
      <Link href={href} className={style}>
        {childrenContent}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={style}
    >
      {childrenContent}
    </button>
  );
}