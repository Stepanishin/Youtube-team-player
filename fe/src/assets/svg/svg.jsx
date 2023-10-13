import { useContext, useState } from "react";
import Tooltip from "../../Components/UI/Tooltip/Tooltip";
import { ThemeContext } from "@/context/ThemeContext/ThemeContext";

export const VolumeIncreaseIcon = () => {
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="26"
        height="24"
        viewBox="0 0 26 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5857 24V21.1886C17.6429 20.5943 19.3 19.4514 20.5571 17.76C21.8143 16.0686 22.4429 14.1486 22.4429 12C22.4429 9.85143 21.8143 7.93143 20.5571 6.24C19.3 4.54857 17.6429 3.40571 15.5857 2.81143V0C18.42 0.64 20.7286 2.07429 22.5114 4.30286C24.2943 6.53143 25.1857 9.09714 25.1857 12C25.1857 14.9029 24.2943 17.4686 22.5114 19.6971C20.7286 21.9257 18.42 23.36 15.5857 24ZM0.5 16.1486V7.92H5.98571L12.8429 1.06286V23.0057L5.98571 16.1486H0.5ZM15.5857 17.52V6.48C16.66 6.98286 17.5 7.73714 18.1057 8.74286C18.7114 9.74857 19.0143 10.8457 19.0143 12.0343C19.0143 13.2 18.7114 14.28 18.1057 15.2743C17.5 16.2686 16.66 17.0171 15.5857 17.52Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export const VolumeDecreaseIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M0 16.5V7.5H6L13.5 0V24L6 16.5H0ZM16.5 18V5.925C17.625 6.45 18.5312 7.2625 19.2188 8.3625C19.9062 9.4625 20.25 10.675 20.25 12C20.25 13.325 19.9062 14.525 19.2188 15.6C18.5312 16.675 17.625 17.475 16.5 18Z"
          fill={color}
        />
      </svg>

      {showTooltip && <Tooltip>Mute</Tooltip>}
    </div>
  );
};

export const PlayIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path d="M0 20V0L15.7143 10L0 20Z" fill={color} />
      </svg>
      {showTooltip && <Tooltip>Play</Tooltip>}
    </div>
  );
};

export const PauseIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M11.4286 20V0H17.1429V20H11.4286ZM0 20V0H5.71429V20H0Z"
          fill={color}
        />
      </svg>

      {showTooltip && <Tooltip>Pause</Tooltip>}
    </div>
  );
};

export const NextAudioIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="23"
        height="20"
        viewBox="0 0 23 20"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M18.8537 20V0H22.2462V20H18.8537ZM0.195312 20V0L15.4613 10L0.195312 20Z"
          fill={color}
        />
      </svg>

      {showTooltip && <Tooltip>Next</Tooltip>}
    </div>
  );
};

export const PrevioustAudioIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="23"
        height="20"
        viewBox="0 0 23 20"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M0 20V0H3.39244V20H0ZM22.0509 20L6.78488 10L22.0509 0V20Z"
          fill={color}
        />
      </svg>

      {showTooltip && <Tooltip>Next</Tooltip>}
    </div>
  );
};

export const VolumeAnimatedIcon = () => (
  <span className="pulse">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
      <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
    </svg>
  </span>
);

export const VolumeXIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="25"
        viewBox="0 0 576 512"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          fill={color}
          d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"
        />
      </svg>
      {showTooltip && <Tooltip>Unmute</Tooltip>}
    </div>
  );
};

export const DeleteIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M18.6064 17.2071L16.1666 19.6469C15.9312 19.8823 15.6316 20 15.2678 20C14.9039 20 14.6043 19.8823 14.3689 19.6469C14.1335 19.4114 14.0157 19.1118 14.0157 18.748C14.0157 18.3842 14.1335 18.0845 14.3689 17.8491L16.8087 15.4093L14.3689 12.9695C14.1335 12.7341 14.0157 12.4345 14.0157 12.0706C14.0157 11.7068 14.1335 11.4072 14.3689 11.1717C14.6043 10.9363 14.9039 10.8186 15.2678 10.8186C15.6316 10.8186 15.9312 10.9363 16.1666 11.1717L18.6064 13.6116L21.0462 11.1717C21.2817 10.9363 21.5813 10.8186 21.9451 10.8186C22.309 10.8186 22.6086 10.9363 22.844 11.1717C23.0794 11.4072 23.1971 11.7068 23.1971 12.0706C23.1971 12.4345 23.0794 12.7341 22.844 12.9695L20.4042 15.4093L22.844 17.8491C23.0794 18.0845 23.1971 18.3842 23.1971 18.748C23.1971 19.1118 23.0794 19.4114 22.844 19.6469C22.6086 19.8823 22.309 20 21.9451 20C21.5813 20 21.2817 19.8823 21.0462 19.6469L18.6064 17.2071ZM1.91302 12.8411C1.54918 12.8411 1.24421 12.718 0.998088 12.4719C0.751967 12.2258 0.628906 11.9208 0.628906 11.557C0.628906 11.1932 0.751967 10.8882 0.998088 10.6421C1.24421 10.3959 1.54918 10.2729 1.91302 10.2729H8.33356C8.69739 10.2729 9.00237 10.3959 9.24849 10.6421C9.49461 10.8882 9.61767 11.1932 9.61767 11.557C9.61767 11.9208 9.49461 12.2258 9.24849 12.4719C9.00237 12.718 8.69739 12.8411 8.33356 12.8411H1.91302ZM1.91302 7.70465C1.54918 7.70465 1.24421 7.58159 0.998088 7.33547C0.751967 7.08935 0.628906 6.78438 0.628906 6.42055C0.628906 6.05671 0.751967 5.75174 0.998088 5.50562C1.24421 5.2595 1.54918 5.13644 1.91302 5.13644H13.47C13.8338 5.13644 14.1388 5.2595 14.3849 5.50562C14.631 5.75174 14.7541 6.05671 14.7541 6.42055C14.7541 6.78438 14.631 7.08935 14.3849 7.33547C14.1388 7.58159 13.8338 7.70465 13.47 7.70465H1.91302ZM1.91302 2.56822C1.54918 2.56822 1.24421 2.44516 0.998088 2.19904C0.751967 1.95292 0.628906 1.64794 0.628906 1.28411C0.628906 0.920278 0.751967 0.615302 0.998088 0.369181C1.24421 0.12306 1.54918 0 1.91302 0H13.47C13.8338 0 14.1388 0.12306 14.3849 0.369181C14.631 0.615302 14.7541 0.920278 14.7541 1.28411C14.7541 1.64794 14.631 1.95292 14.3849 2.19904C14.1388 2.44516 13.8338 2.56822 13.47 2.56822H1.91302Z"
          fill={color}
        />
      </svg>

      {showTooltip && <Tooltip>Delete</Tooltip>}
    </div>
  );
};

export const AddIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
      {showTooltip && <Tooltip>Add to PlayList</Tooltip>}
    </div>
  );
};
export const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
    fill="#ffffff"
    width="15"
    height="15"
  >
    <style></style>
    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
  </svg>
);

export const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
  </svg>
);

export const ShuffleIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        width="28"
        height="25"
      >
        <path
          fill={color}
          d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"
        />
      </svg>
      {showTooltip && <Tooltip>Shuffle playList</Tooltip>}
    </div>
  );
};

export const StarSolidIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div>
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M10.8992 20L9.3188 18.5831C7.48411 16.9301 5.9673 15.5041 4.76839 14.3052C3.56948 13.1063 2.6158 12.03 1.90736 11.0763C1.19891 10.1226 0.703906 9.24614 0.422343 8.44687C0.140781 7.64759 0 6.83015 0 5.99455C0 4.28701 0.572207 2.86104 1.71662 1.71662C2.86104 0.572207 4.28701 0 5.99455 0C6.93915 0 7.83833 0.199818 8.6921 0.599455C9.54587 0.999092 10.2816 1.56222 10.8992 2.28883C11.5168 1.56222 12.2525 0.999092 13.1063 0.599455C13.96 0.199818 14.8592 0 15.8038 0C17.5114 0 18.9373 0.572207 20.0817 1.71662C21.2262 2.86104 21.7984 4.28701 21.7984 5.99455C21.7984 6.83015 21.6576 7.64759 21.376 8.44687C21.0945 9.24614 20.5995 10.1226 19.891 11.0763C19.1826 12.03 18.2289 13.1063 17.03 14.3052C15.8311 15.5041 14.3143 16.9301 12.4796 18.5831L10.8992 20Z"
          fill="#EE4723"
        />
      </svg>

      {showTooltip && <Tooltip>Remove from Favorite</Tooltip>}
    </div>
  );
};

export const StarEmptyIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div>
      <svg
        width="23"
        height="20"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M11.3154 20C11.0514 20 10.7826 19.9529 10.5092 19.8586C10.2357 19.7643 9.99529 19.6134 9.78784 19.4059L7.83593 17.6238C5.83687 15.7944 4.03112 13.9793 2.41867 12.1782C0.806223 10.3772 0 8.39227 0 6.22348C0 4.45073 0.594059 2.9703 1.78218 1.78218C2.9703 0.594059 4.45073 0 6.22348 0C7.22301 0 8.16596 0.212164 9.05233 0.636492C9.93871 1.06082 10.6931 1.64074 11.3154 2.37624C11.9378 1.64074 12.6921 1.06082 13.5785 0.636492C14.4649 0.212164 15.4078 0 16.4074 0C18.1801 0 19.6605 0.594059 20.8487 1.78218C22.0368 2.9703 22.6308 4.45073 22.6308 6.22348C22.6308 8.39227 21.8293 10.3819 20.2263 12.1924C18.6233 14.0028 16.8034 15.8227 14.7666 17.6521L12.843 19.4059C12.6355 19.6134 12.3951 19.7643 12.1216 19.8586C11.8482 19.9529 11.5794 20 11.3154 20ZM10.2405 4.63932C9.69354 3.8661 9.10891 3.27676 8.48656 2.87129C7.86421 2.46582 7.10985 2.26308 6.22348 2.26308C5.09194 2.26308 4.14899 2.64026 3.39462 3.39463C2.64026 4.14899 2.26308 5.09194 2.26308 6.22348C2.26308 7.20415 2.61198 8.24611 3.30976 9.34936C4.00754 10.4526 4.84206 11.5229 5.8133 12.5601C6.78453 13.5974 7.78406 14.5686 8.81188 15.4738C9.8397 16.3791 10.6742 17.124 11.3154 17.7086C11.9566 17.124 12.7911 16.3791 13.819 15.4738C14.8468 14.5686 15.8463 13.5974 16.8175 12.5601C17.7888 11.5229 18.6233 10.4526 19.3211 9.34936C20.0189 8.24611 20.3677 7.20415 20.3677 6.22348C20.3677 5.09194 19.9906 4.14899 19.2362 3.39463C18.4818 2.64026 17.5389 2.26308 16.4074 2.26308C15.521 2.26308 14.7666 2.46582 14.1443 2.87129C13.5219 3.27676 12.9373 3.8661 12.3904 4.63932C12.2584 4.82791 12.0981 4.96935 11.9095 5.06365C11.7209 5.15794 11.5229 5.20509 11.3154 5.20509C11.108 5.20509 10.9099 5.15794 10.7214 5.06365C10.5328 4.96935 10.3725 4.82791 10.2405 4.63932Z"
          fill="#EE4723"
        />
      </svg>

      {showTooltip && <Tooltip>Add to Favorite</Tooltip>}
    </div>
  );
};

export const DragAndDropIcon = () => {
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        width="23"
        viewBox="0 0 320 512"
      >
        <path
          fill={color}
          d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"
        />
      </svg>
    </div>
  );
};

export const CurrentyPlaying = () => {
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8608 5.45981C15.7749 4.31699 15.4283 3.24004 14.8268 2.26048C14.5375 1.79075 14.1938 1.35252 13.8014 0.962989C13.6353 0.796864 13.4262 0.710938 13.2114 0.710938C13.0854 0.710938 12.9565 0.73958 12.8333 0.802592C12.5211 0.95726 12.3464 1.29237 12.3865 1.65327C12.4123 1.87954 12.544 2.03993 12.7015 2.21465C14.1766 3.84439 14.5833 5.73478 13.9074 7.83139C13.6725 8.55603 13.2515 9.22912 12.6156 9.89076C12.2948 10.223 12.3006 10.7357 12.6299 11.0536C12.9593 11.3744 13.472 11.3716 13.7957 11.0479C14.844 9.99674 15.5085 8.71929 15.7691 7.25568C15.8035 7.06664 15.8264 6.86901 15.8493 6.67997C15.8608 6.59118 15.8694 6.50525 15.8808 6.41646L15.8751 5.55433C15.8694 5.52283 15.8636 5.49132 15.8608 5.45981Z"
          fill={`${color}`}
        />
        <path
          d="M3.1621 9.77389L3.12773 9.73379C1.98204 8.47067 1.50371 6.97841 1.70994 5.29425C1.85601 4.08269 2.38303 3.01433 3.27094 2.1207C3.45998 1.93166 3.53731 1.70539 3.50294 1.44761C3.45711 1.10103 3.26235 0.863304 2.93582 0.754464C2.61217 0.648488 2.32575 0.720093 2.07942 0.969281C0.736104 2.33551 0.0372348 3.9853 0 5.87569C0.0114569 7.28775 0.335113 8.51363 0.985291 9.62782C1.29176 10.152 1.66125 10.6274 2.08229 11.0456C2.34579 11.3062 2.72674 11.3664 3.05039 11.2003C3.37119 11.0341 3.54304 10.6904 3.48862 10.321C3.45998 10.0975 3.31677 9.94002 3.1621 9.77389Z"
          fill={`${color}`}
        />
        <path
          d="M12.1976 5.25425C12.0458 4.41217 11.6591 3.67893 11.0519 3.07744C10.8915 2.91705 10.6882 2.83398 10.4733 2.83398C10.4504 2.83398 10.4275 2.83398 10.4017 2.83685C10.1611 2.8569 9.9406 2.98579 9.79738 3.18628C9.55393 3.52999 9.59402 3.94817 9.90622 4.27469C10.333 4.72151 10.565 5.24852 10.5994 5.84141C10.6423 6.56606 10.4017 7.21051 9.88045 7.76044C9.71719 7.93229 9.63126 8.15284 9.63699 8.37338C9.64272 8.5882 9.73723 8.79156 9.9005 8.9405C10.2499 9.26416 10.7483 9.24411 11.0863 8.89181C11.8768 8.06978 12.252 7.11313 12.2663 5.88438C12.2635 5.84714 12.2577 5.80418 12.2549 5.75262C12.2434 5.61514 12.2291 5.42897 12.1976 5.25425Z"
          fill={`${color}`}
        />
        <path
          d="M5.70074 3.06366C5.35417 2.73714 4.85293 2.75719 4.50636 3.11522C3.73302 3.92006 3.34922 4.88244 3.33203 6.05391C3.3349 6.08828 3.33776 6.12838 3.34062 6.1742C3.34635 6.28591 3.35494 6.41193 3.37213 6.5351C3.49816 7.48315 3.90201 8.29086 4.56651 8.93818C4.76987 9.13581 5.05629 9.21028 5.33126 9.14153C5.61195 9.06993 5.83249 8.86371 5.91842 8.58874C6.01867 8.26795 5.94133 7.98153 5.68069 7.70942C5.26824 7.28266 5.04197 6.7671 5.00187 6.17993C4.95318 5.44669 5.19091 4.79938 5.70647 4.25804C5.87546 4.08046 5.96711 3.85705 5.96138 3.63078C5.95566 3.41882 5.864 3.21833 5.70074 3.06366Z"
          fill={`${color}`}
        />
        <path
          d="M7.80612 4.87109C7.80325 4.87109 7.80039 4.87109 7.79753 4.87109C7.17599 4.87396 6.66902 5.38379 6.67189 6.00246C6.67189 6.624 7.17885 7.13096 7.80039 7.13383C7.80039 7.13383 7.80325 7.13383 7.80612 7.13383C8.42479 7.13383 8.92889 6.62972 8.93462 6.00819C8.93748 5.71031 8.82005 5.42389 8.60237 5.20621C8.38183 4.98853 8.10113 4.87109 7.80612 4.87109Z"
          fill={`${color}`}
        />
        <path
          d="M7.79619 4.72673C7.09446 4.73246 6.52734 5.30244 6.52734 6.00131C6.52734 6.70018 7.09732 7.27303 7.79906 7.27589C7.80192 7.27589 7.80192 7.27589 7.80479 7.27589C8.50079 7.27589 9.07077 6.70877 9.0765 6.00704C9.07936 5.66906 8.94474 5.34827 8.70129 5.10481C8.45496 4.85849 8.13703 4.72101 7.79619 4.72673ZM7.79619 7.20142C7.14029 7.19856 6.59608 6.65436 6.59608 5.99845C6.59608 5.34254 7.13742 4.79834 7.79333 4.79548C8.4521 4.78975 9.00489 5.34541 8.99916 6.00418C8.9963 6.66295 8.4521 7.20428 7.79619 7.20142Z"
          fill="#EE4723"
        />
        <path
          d="M7.79491 4.79887C7.13901 4.8046 6.5948 5.3488 6.59767 6.00184C6.59767 6.65775 7.14187 7.20195 7.79777 7.20482C8.45082 7.20768 8.99788 6.66634 9.00361 6.00757C9.00648 5.3488 8.45368 4.79314 7.79491 4.79887ZM7.80064 7.13035C7.80064 7.13035 7.79778 7.13035 7.79491 7.13035C7.17338 7.12748 6.66641 6.62052 6.66641 5.99898C6.66641 5.37744 7.17051 4.87048 7.79205 4.86761C7.79491 4.86761 7.79777 4.86761 7.80064 4.86761C8.09852 4.86761 8.37921 4.98791 8.59403 5.20273C8.81171 5.42041 8.92914 5.70397 8.92628 6.00471C8.92341 6.62624 8.41931 7.13035 7.80064 7.13035Z"
          fill="#EE4723"
        />
      </svg>
    </div>
  );
};
