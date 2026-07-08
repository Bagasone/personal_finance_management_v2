import { CATEGORY_ICONS, SOURCE_ICONS, TYPE_ICONS } from "../constants/icons";
import { IoBanOutline } from "react-icons/io5";

export const iconCategory = (key) => {
  return CATEGORY_ICONS[key] ?? IoBanOutline;
};

export const iconSource = (key) => {
  return SOURCE_ICONS[key] ?? IoBanOutline;
};

export const iconType = (key) => {
  return TYPE_ICONS[key] ?? IoBanOutline;
};
