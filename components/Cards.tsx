"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Card, Category } from "@/types";
import { X, Bike, Shoe, Note, Sparkle, Drop } from "./icons";


const categoryIconMap: Record<Category, string> = {
  commute: "/icons/bike.svg",
  shoes: "/icons/shoe.svg",
  music: "/icons/note.svg",
  deal: "/icons/sparkle.svg",
  info: ""
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
  const iconPath = categoryIconMap[card.category] || "/icons/sparkle.svg";


  const fire = (intent: string) => {
    onAction(intent);
    onDismiss();
  };

  return (
    <div
      className="flex w-full flex-col gap-4 rounded-card p-3 backdrop-blur-md"
      style={{
        background:
          "linear-gradient(0deg, rgba(0,0,0,.15), rgba(0,0,0,.15)), rgba(255,255,255,.1)",
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
          {/* <Icon className="text-white" /> */}
          <img src={iconPath} alt={card.category} className="w-6 h-6" />
      
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-base font-medium">{card.title}</h3>
          <p className="font-rounded text-sm text-white/80">{card.body}</p>
        </div>

        <button
          onClick={onDismiss}
          className="shrink-0 text-white/60 hover:text-white/90"
          aria-label="Dismiss"
        >
          <X />
        </button>
      </div>

      {card.layout === "single" && (
        <Btn primary onClick={() => fire(card.primary.intent)}>
          {card.primary.label}
        </Btn>
      )}

      {card.layout === "ack" && (
        <Btn primary onClick={() => fire("ack")}>
          {card.primary.label}
        </Btn>
      )}

      {card.layout === "double" && (
        <div className="flex gap-4">
          <Btn primary onClick={() => fire(card.primary.intent)}>
            {card.primary.label}
          </Btn>
          <Btn onClick={() => fire(card.secondary.intent)}>
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
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex h-10 min-w-0 flex-1 items-center justify-center rounded-pill px-4 text-base font-medium whitespace-nowrap",
        primary ? "bg-white text-teal" : "bg-black/40 text-white",
        "active:scale-[0.98] transition-transform",
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
    <ul className="flex flex-col gap-4 px-4 pb-4 pt-4">
      <AnimatePresence mode="popLayout" initial={false}>
        {cards.map((c) => (
          <motion.li
            key={c.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.6 }}
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
