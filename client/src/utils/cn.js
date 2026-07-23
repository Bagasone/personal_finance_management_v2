import { extendTailwindMerge } from "tailwind-merge";
import clsx from "clsx";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-xxs"],
      shadow: ["neo-shadow-sm", "neo-shadow-md", "neo-shadow-lg"],
      rounded: ["neo-border-sm", "neo-border-md", "neo-border-lg"],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
