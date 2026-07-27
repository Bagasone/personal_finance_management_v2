const ProgressBar = ({ fill, color }) => {
  return (
    <div className="flex justify-start items-center rounded-sm bg-black-300 w-full h-3">
      <div
        style={{ width: `${fill ?? 0}%` }}
        className={`rounded-sm h-2.5 ${color}`}></div>
    </div>
  );
};

export default ProgressBar;
