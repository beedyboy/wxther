export function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-surface">
      <div
        className="absolute inset-0 animate-drift-slow bg-cover bg-center"
        style={{ backgroundImage: "url('/mist-1.jpg')" }}
      />
      <div
        className="absolute inset-0 animate-drift bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('/mist-2.jpg')" }}
      />
      <div className="absolute inset-0 bg-tealOverlay mix-blend-multiply" />
    </div>
  );
}
