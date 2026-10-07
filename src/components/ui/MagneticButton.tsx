"use client";

import Link from "next/link";
import {
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { useMagnetic } from "@/animations/useMagnetic";
import styles from "./MagneticButton.module.css";

type Common = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "soft";
  className?: string;
  arrow?: boolean;
};

type InternalLinkProps = Common & {
  href: string;
  external?: false;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href">;

type ExternalLinkProps = Common & {
  href: string;
  external: true;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href">;

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
    external?: undefined;
  };

type Props = InternalLinkProps | ExternalLinkProps | ButtonProps;

export function MagneticButton(props: Props) {
  const { children, variant = "primary", className, arrow = true } = props;
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLink = "href" in props && Boolean(props.href);
  useMagnetic(isLink ? anchorRef : buttonRef, 0.32);

  const classes = [styles.btn, styles[variant], className].filter(Boolean).join(" ");
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow ? <span className={styles.arrow} aria-hidden="true">→</span> : null}
    </>
  );

  if (isLink && props.href) {
    if (props.external) {
      const { href, external: _e, variant: _v, className: _c, arrow: _a, children: _ch, ...rest } =
        props;
      return (
        <a
          ref={anchorRef}
          href={href}
          className={classes}
          data-cursor="action"
          target="_blank"
          rel="noreferrer"
          {...rest}
        >
          {content}
        </a>
      );
    }

    const { href, external: _e, variant: _v, className: _c, arrow: _a, children: _ch, ...rest } =
      props;
    return (
      <Link ref={anchorRef} href={href} className={classes} data-cursor="action" {...rest}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonProps;
  const { variant: _v, className: _c, arrow: _a, children: _ch, ...rest } = buttonProps;
  return (
    <button
      ref={buttonRef}
      type="button"
      className={classes}
      data-cursor="action"
      {...rest}
    >
      {content}
    </button>
  );
}
