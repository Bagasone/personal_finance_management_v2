import { IconArrowUp, IconArrowDown, IconEqual, IconHash } from "@tabler/icons-react";
import { TREND_COLORS } from "../constants";

export const summaryIndicator = (value) => {
  switch (true) {
    case value > 0:
      return { label: "lebih tinggi dari bulan lalu", Icon: IconArrowUp };
    case value < 0:
      return { label: "lebih rendah dari bulan lalu", Icon: IconArrowDown };
    case value === 0:
      return { label: "tetap sama dari bulan lalu", Icon: IconEqual };
    default:
      return { label: "Belum ada data bulan lalu", Icon: IconHash };
  }
};
