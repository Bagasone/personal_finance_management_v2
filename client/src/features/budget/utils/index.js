export const status = (percent) => {
  switch (true) {
    case percent < 80:
      return { status_label: "On Track", status_key: "on_track" };
    case percent < 100:
      return { status_label: "Warning", status_key: "warning" };
    default:
      return { status_label: "Over Budget", status_key: "over" };
  }
};
