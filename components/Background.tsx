export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-surface">
      <div
        className="absolute -inset-y-2 -inset-x-[20%] animate-drift-slow bg-cover bg-center"
   style={{ backgroundImage: "url('/bg/bg-layer-1.png')" }}
      />
      <div
        className="absolute -inset-y-2 -inset-x-[15%] animate-drift bg-cover bg-center opacity-70"
      style={{ backgroundImage: "url('/bg/bg-layer-2.png')" }}
      />
      <div className="absolute inset-0 bg-tealOverlay mix-blend-multiply" />
    </div>
  );
}
