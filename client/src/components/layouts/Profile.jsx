import PROFILE_IMAGE from "../../assets/profile.png";

import { cn } from "../../utils/";

const Profile = ({ username }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <div
        className={cn(
          "neo-shadow-sm shadow-black-200 neo-border-lg border-black-200",
          "size-12 overflow-hidden",
          "cursor-pointer transition-all",
          "active:shadow-none active:translate-x-.75 active:translate-y-.75",
        )}>
        <img
          src={PROFILE_IMAGE}
          alt={`${username} profile`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col justify-center items-start">
        <p className="text-xs text-black-400 font-light">Welcome,</p>
        <p className="text-xl text-black-200 font-bold uppercase space-x-0">{username}</p>
      </div>
    </div>
  );
};

export default Profile;
