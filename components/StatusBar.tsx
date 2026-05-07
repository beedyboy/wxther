export function StatusBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-[54px] items-center justify-between px-6 pt-5 text-white">
      <span className="text-[17px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="9" width="3" height="3" rx=".5" fill="currentColor" />
          <rect x="5" y="6" width="3" height="6" rx=".5" fill="currentColor" />
          <rect x="10" y="3" width="3" height="9" rx=".5" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx=".5" fill="currentColor" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 11.5 9.5 10c-.4-.4-.95-.6-1.5-.6s-1.1.2-1.5.6L8 11.5ZM5 8.5c.83-.83 1.92-1.29 3-1.29s2.17.46 3 1.29L12.5 7c-1.25-1.25-2.85-1.87-4.5-1.87S4.75 5.75 3.5 7L5 8.5ZM2 5.5c1.65-1.65 3.83-2.56 6-2.56s4.35.91 6 2.56L15.5 4C13.45 1.95 10.75.83 8 .83S2.55 1.95.5 4L2 5.5Z"
            fill="currentColor"
          />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x=".5" y=".5" width="22" height="11" rx="3" stroke="currentColor" strokeOpacity=".4" />
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
          <rect x="23.5" y="4" width="1.5" height="4" rx=".5" fill="currentColor" fillOpacity=".4" />
        </svg>
      </div>
    </div>
  );
}
