export const statusIndicator = (value) => {
  const status_value = parseInt(value);

  if (status_value <= 80)
    return {
      status_label: "On Track",
      status_cls: "bg-emerald-500/5 text-emerald-700",
      bar_cls: "bg-emerald-500",
    };

  if (status_value <= 100)
    return {
      status_label: "Warning",
      status_cls: "bg-amber-500/5 text-amber-700",
      bar_cls: "bg-amber-500",
    };

  return {
    status_label: "Over Budget",
    status_cls: "bg-rose-500/5 text-rose-700",
    bar_cls: "bg-rose-500",
  };
};
