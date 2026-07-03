const ProgressBar = ({ fill, color }) => {
  return (
    <div className="flex justify-start items-center rounded-sm bg-black-300 w-full h-3">
      <div
        style={{ width: fill }}
        className={`rounded-sm h-3 ${color}`}></div>
    </div>
  );
};

export default ProgressBar;
