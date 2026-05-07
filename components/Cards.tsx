"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Card, Category } from "@/types";
import { Icon } from "./icons";

const CAT_ICON: Record<Category, string> = {
  commute: "bike",
  shoes: "shoe",
  music: "note",
  deal: "coffee",
  info: "sparkle",
};

function CardView({
  card,
  onDismiss,
  onAction,
}: {
  card: Card;
  onDismiss: () => void;
  onAction: (intent: string) => void;
}) {
  const fire = (intent: string) => {
    onAction(intent);
    onDismiss();
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-3xl bg-black/20 p-3">
      <div className="flex w-full items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white outline outline-[0.5px] -outline-offset-[0.5px] outline-white/20">
          <Icon name={CAT_ICON[card.category]} size={20} alt={card.category} />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-base font-medium leading-6 tracking-tight">
            {card.title}
          </h3>
          <p className="font-rounded text-sm font-normal leading-5 tracking-wide text-white/80">
            {card.body}
          </p>
        </div>

        <button
          onClick={onDismiss}
          className="shrink-0 text-white opacity-60 hover:opacity-90"
          aria-label="Dismiss"
        >
          <Icon name="close" size={20} alt="" />
        </button>
      </div>

      {(card.layout === "single" || card.layout === "ack") && (
        <Btn
          variant="primary"
          onClick={() =>
            fire(card.layout === "ack" ? "ack" : card.primary.intent)
          }
        >
          {card.primary.label}
        </Btn>
      )}

      {card.layout === "double" && (
        <div className="flex w-full items-start gap-4">
          <Btn variant="primary" onClick={() => fire(card.primary.intent)}>
            {card.primary.label}
          </Btn>
          <Btn variant="secondary" onClick={() => fire(card.secondary.intent)}>
            {card.secondary.label}
          </Btn>
        </div>
      )}
    </div>
  );
}

function Btn({
  children,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex min-w-0 flex-1 items-center justify-center gap-2 self-stretch rounded-xl px-4 py-2",
        "text-base font-medium leading-6 tracking-tight whitespace-nowrap",
        "transition-transform active:scale-[0.98]",
        variant === "primary" ? "bg-white text-teal" : "bg-black/40 text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function Cards({
  cards,
  onDismiss,
  onAction,
}: {
  cards: Card[];
  onDismiss: (id: string) => void;
  onAction: (id: string, intent: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-4 px-4 pb-6 pt-2">
      <AnimatePresence mode="popLayout" initial={false}>
        {cards.map((c) => (
          <motion.li
            key={c.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 32,
              mass: 0.6,
            }}
          >
            <CardView
              card={c}
              onDismiss={() => onDismiss(c.id)}
              onAction={(intent) => onAction(c.id, intent)}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
