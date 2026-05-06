import Image from 'next/image';
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;


interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon = ({ name, className, size = 20 }: IconProps) => (
  <Image 
    src={`/icons/${name}.svg`} 
    alt={`${name} icon`}
    width={size}
    height={size}
    className={className}
    priority
  />
);


export function Pin(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1c2.5 0 5 1.5 6 4 .9 2.2.4 4.2-.7 5.8-.9 1.4-2.1 2.6-3.2 3.7l-.9.9a1.7 1.7 0 0 1-2.4 0l-.9-.8C6.7 13.3 5.4 12.1 4.5 10.8 3.4 9.2 2.9 7.3 3.7 5c1-2.4 3.5-4 6.3-4Zm0 4c-1.4 0-2.5 1.1-2.5 2.5S8.6 10 10 10s2.5-1.1 2.5-2.5S11.4 5 10 5Z"
        fill="currentColor"
      />
      <path
        d="M5 15.6c.4 0 .8.4.8.8.1.1.4.3.9.5.8.3 2 .4 3.3.4 1.3 0 2.5-.1 3.3-.4.5-.2.7-.4.9-.5 0-.4.4-.8.8-.8.4 0 .8.4.8.8 0 .6-.4 1-.7 1.3-.4.3-.9.5-1.4.7-1 .3-2.4.5-3.7.5s-2.8-.2-3.8-.5c-.5-.2-1-.4-1.3-.7-.4-.3-.7-.7-.7-1.3 0-.4.4-.8.8-.8Z"
        fill="currentColor"
      />
    </svg>
  );
}


export function X(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="m5.6 14.4 4.4-4.4 4.4 4.4M14.4 5.6 10 10 5.6 5.6" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

export function Drop(props: P) {
  // also used for "rain" in the header
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 11.7v1.6M10 16.7v1.6M6.7 15v1.7M13.3 15v1.7M16.7 14.7c1.2-.5 2.5-1.6 2.5-3.9 0-3.3-2.8-4.2-4.2-4.2 0-1.6 0-5-5-5s-5 3.4-5 5C3.6 6.7.8 7.5.8 10.8c0 2.3 1.3 3.4 2.5 3.9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Cloud(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M9.8 4.2c-5 0-5 3.3-5 5C3.4 9.2.6 10 .6 13.3s2.8 4.2 4.2 4.2h10c1.4 0 4.2-.8 4.2-4.2s-2.8-4.2-4.2-4.2c0-1.6 0-5-5-5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sun(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M18.3 10h.9M10 1.7V.8M10 19.2v-.9M16.7 16.7l-.9-.9M16.7 3.3l-.9.9M3.3 16.7l.9-.9M3.3 3.3l.9.9M.8 10h.9M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PartCloud(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M5 10.8c-1.4 0-4.2.8-4.2 4.2s2.8 4.2 4.2 4.2h10c1.4 0 4.2-.8 4.2-4.2s-2.8-4.2-4.2-4.2M15.8 7.5h.9M10 1.7V.8M15.4 2.9l-.8.9M4.6 2.9l.8.9M3.3 7.5h.9M10 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// card category icons
export function Bike(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="m9.6 15 1.3-3.3-4.1-1.7 2.5-2.9 2.5 2.1h2.9M11.7 5.8a1.7 1.7 0 1 0 0-3.3 1.7 1.7 0 0 0 0 3.3ZM15 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM5 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Shoe(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.5 13.75s1.25 0 2.5.83c1.25.84 2.5.84 3.75.84h7.5a1.67 1.67 0 0 0 1.67-1.67v-.83a.83.83 0 0 0-.84-.84h-3.33L11.67 9.17l-2.09.83-1.25-2.08-1.66.83v2.5a.83.83 0 0 1-.84.83h-2.5a.83.83 0 0 0-.83.83v.84ZM5 17.5h10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Note(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M8.3 14.6a2.1 2.1 0 1 1-4.1 0 2.1 2.1 0 0 1 4.1 0Zm0 0V5.8L16.7 3.75v8.75m0 0a2.1 2.1 0 1 1-4.2 0 2.1 2.1 0 0 1 4.2 0Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 2.5 11.5 7.5 16.5 9 11.5 10.5 10 15.5 8.5 10.5 3.5 9 8.5 7.5 10 2.5ZM15.8 13.3l.7 1.5 1.4.6-1.4.6-.7 1.5-.6-1.5-1.5-.6 1.5-.6.6-1.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
