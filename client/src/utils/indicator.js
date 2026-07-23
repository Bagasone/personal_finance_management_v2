import { FaArrowUp, FaArrowDown, FaEquals, FaHashtag } from "react-icons/fa6";
import { TREND_COLORS } from "../constants";

export const summaryIndicator = (value) => {
  switch (true) {
    case value > 0:
      return { label: "lebih tinggi dari bulan lalu", Icon: FaArrowUp };
    case value < 0:
      return { label: "lebih rendah dari bulan lalu", Icon: FaArrowDown };
    case value === 0:
      return { label: "tetap sama dari bulan lalu", Icon: FaEquals };
    default:
      return { label: "Belum ada data bulan lalu", Icon: FaHashtag };
  }
};
