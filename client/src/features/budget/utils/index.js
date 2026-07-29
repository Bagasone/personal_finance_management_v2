export const statusIndicator = (value) => {
  const status_value = parseInt(value ?? 0);

  if (status_value <= 80)
    return {
      status_label: "On Track",
      status_cls: "bg-emerald-400/20 text-emerald-700",
      bar_cls: "bg-emerald-400",
    };

  if (status_value <= 100)
    return {
      status_label: "Warning",
      status_cls: "bg-amber-400/20 text-amber-700",
      bar_cls: "bg-amber-400",
    };

  return {
    status_label: "Over Budget",
    status_cls: "bg-rose-400/20 text-rose-700",
    bar_cls: "bg-rose-400",
  };
};
