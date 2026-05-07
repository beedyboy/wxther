import { Icon } from "./icons";

export function Empty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-12 py-32 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 outline outline-[0.5px] -outline-offset-[0.5px] outline-white/20">
        <Icon name="check" size={32} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-medium leading-8 tracking-wide">
          You&apos;re all set for now.
        </h2>
        <p className="font-rounded text-sm leading-5 tracking-tight text-white/90">
          we&apos;ll alert you if anything changes
        </p>
      </div>
    </div>
  );
}
