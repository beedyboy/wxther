import { Icon } from "./icons";

export function Empty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      {/* <Check className="text-white/90" /> */}
      <Icon name="check" size={24} className="text-white/90" />
      <h2 className="mt-6 text-2xl font-medium">You&apos;re all set for now.</h2>
      <p className="mt-2 font-rounded text-sm text-white/80">
        we&apos;ll alert you if anything changes
      </p>
    </div>
  );
}
