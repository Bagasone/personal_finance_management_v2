import { extendTailwindMerge } from "tailwind-merge";
import clsx from "clsx";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-xxs"],
      shadow: ["shadow-neo-sm", "shadow-neo-md", "shadow-neo-lg", "shadow-neo-xl"],    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
