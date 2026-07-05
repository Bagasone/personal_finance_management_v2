export const variations = (value) => {
  const int = parseInt(value);
  if (int <= 80)
    return {
      label: "On Track",
      classLabel: "bg-emerald-500/5 text-emerald-700",
      classBar: "bg-emerald-500",
    };

  if (int <= 100)
    return {
      label: "Warning",
      classLabel: "bg-amber-500/5 text-amber-700",
      classBar: "bg-amber-500",
    };

  return {
    label: "Over Budget",
    classLabel: "bg-rose-500/5 text-rose-700",
    classBar: "bg-rose-500",
  };
};
