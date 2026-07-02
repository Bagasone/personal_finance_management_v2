import { CATEGORY_ICONS, SOURCE_ICONS } from "../constants/icons";

export const iconCategory = (key) => {
  return CATEGORY_ICONS[key] ?? CATEGORY_ICONS["other"];
};

export const iconSource = (key) => {
  return SOURCE_ICONS[key] ?? SOURCE_ICONS["other"];
};
