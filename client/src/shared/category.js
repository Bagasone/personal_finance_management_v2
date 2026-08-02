import { EXPENSE_CATEGORIES } from "../constants";
import { CATEGORY_ICONS } from "../constants/icons";
import { calculate } from "../utils";

import { IconReceiptOff } from "@tabler/icons-react";

export const iconCategory = (key, fb = IconReceiptOff) => {
  return CATEGORY_ICONS[key] ?? fb;
};

export const labelCategory = (id, fb = "Other") => {
  return EXPENSE_CATEGORIES.find((c) => c.id === id)?.label ?? fb;
};

export const calculateByCategory = (data, category_id) =>
  calculate(data, "amount", { key: "category_id", value: category_id });
