"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

let interval: NodeJS.Timeout | string | number | undefined;

type Card = {
  id: number;
  url: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 20;
  const SCALE_FACTOR = scaleFactor || 0.1;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  h-72 w-72 min-[1250px]:h-96 min-[1250px]:w-96">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute h-72 w-72 min-[1250px]:h-96 min-[1250px]:w-96 p-4 flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat rounded-3xl shadow-xl shadow-black/[0.1] border border-[#1E5233]"
              style={{ backgroundImage: `url(${card.url})` }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
