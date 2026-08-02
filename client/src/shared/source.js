import { INCOME_SOURCES } from "../constants";
import { SOURCE_ICONS } from "../constants/icons";
import { calculate } from "../utils";

import { IconCashBanknoteOff } from "@tabler/icons-react";

export const iconSource = (key, fb = IconCashBanknoteOff) => {
  return SOURCE_ICONS[key] ?? fb;
};

export const labelSource = (id, fb = "Other") => {
  return INCOME_SOURCES.find((c) => c.id === id)?.label ?? fb;
};

export const calculateBySource = (data, source_id) =>
  calculate(data, "amount", { key: "source_id", value: source_id });
