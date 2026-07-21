import {
  CATEGORY_ICONS,
  SIDEBAR_ICONS,
  SOURCE_ICONS,
  TYPE_ICONS,
} from "../constants/icons";
import { IoBanOutline } from "react-icons/io5";

export const iconCategory = (key, fb = IoBanOutline) => {
  return CATEGORY_ICONS[key] ?? fb;
};

export const iconSource = (key, fb = IoBanOutline) => {
  return SOURCE_ICONS[key] ?? fb;
};

export const iconType = (key, fb = IoBanOutline) => {
  return TYPE_ICONS[key] ?? fb;
};

export const iconSidebar = (key, fb = IoBanOutline) => {
  return SIDEBAR_ICONS[key] ?? fb;
};
