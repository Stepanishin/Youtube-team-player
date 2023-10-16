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
  const { mode } = useContext(ThemeContext);

  const color = mode === "dark" ? "#fff" : "#000";

  return (
    <div>
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <path
          d="M1.42801 11.4286C1.1042 11.4286 0.832775 11.319 0.613728 11.1C0.39468 10.881 0.285156 10.6095 0.285156 10.2857C0.285156 9.96191 0.39468 9.69048 0.613728 9.47143C0.832775 9.25238 1.1042 9.14286 1.42801 9.14286H7.1423C7.46611 9.14286 7.73754 9.25238 7.95658 9.47143C8.17563 9.69048 8.28516 9.96191 8.28516 10.2857C8.28516 10.6095 8.17563 10.881 7.95658 11.1C7.73754 11.319 7.46611 11.4286 7.1423 11.4286H1.42801ZM1.42801 6.85714C1.1042 6.85714 0.832775 6.74762 0.613728 6.52857C0.39468 6.30952 0.285156 6.0381 0.285156 5.71429C0.285156 5.39048 0.39468 5.11905 0.613728 4.9C0.832775 4.68095 1.1042 4.57143 1.42801 4.57143H11.7137C12.0375 4.57143 12.309 4.68095 12.528 4.9C12.7471 5.11905 12.8566 5.39048 12.8566 5.71429C12.8566 6.0381 12.7471 6.30952 12.528 6.52857C12.309 6.74762 12.0375 6.85714 11.7137 6.85714H1.42801ZM1.42801 2.28571C1.1042 2.28571 0.832775 2.17619 0.613728 1.95714C0.39468 1.7381 0.285156 1.46667 0.285156 1.14286C0.285156 0.819048 0.39468 0.547619 0.613728 0.328571C0.832775 0.109524 1.1042 0 1.42801 0H11.7137C12.0375 0 12.309 0.109524 12.528 0.328571C12.7471 0.547619 12.8566 0.819048 12.8566 1.14286C12.8566 1.46667 12.7471 1.7381 12.528 1.95714C12.309 2.17619 12.0375 2.28571 11.7137 2.28571H1.42801ZM16.2852 16C15.9613 16 15.6899 15.8905 15.4709 15.6714C15.2518 15.4524 15.1423 15.181 15.1423 14.8571V11.4286H11.7137C11.3899 11.4286 11.1185 11.319 10.8994 11.1C10.6804 10.881 10.5709 10.6095 10.5709 10.2857C10.5709 9.96191 10.6804 9.69048 10.8994 9.47143C11.1185 9.25238 11.3899 9.14286 11.7137 9.14286H15.1423V5.71429C15.1423 5.39048 15.2518 5.11905 15.4709 4.9C15.6899 4.68095 15.9613 4.57143 16.2852 4.57143C16.609 4.57143 16.8804 4.68095 17.0994 4.9C17.3185 5.11905 17.428 5.39048 17.428 5.71429V9.14286H20.8566C21.1804 9.14286 21.4518 9.25238 21.6709 9.47143C21.8899 9.69048 21.9994 9.96191 21.9994 10.2857C21.9994 10.6095 21.8899 10.881 21.6709 11.1C21.4518 11.319 21.1804 11.4286 20.8566 11.4286H17.428V14.8571C17.428 15.181 17.3185 15.4524 17.0994 15.6714C16.8804 15.8905 16.609 16 16.2852 16Z"
          fill={color}
        />
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

export const SearchIcon = ({ hover }) => {
  const { mode } = useContext(ThemeContext);

  let color = mode === "dark" ? "#fff" : "#000";

  if (hover) {
    color = "#098898";
  }

  return (
    <svg
      width="26"
      height="16"
      viewBox="0 0 26 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.52114 16C1.23735 16 0.99947 15.904 0.807494 15.7119C0.615519 15.5199 0.519531 15.2819 0.519531 14.998C0.519531 14.7141 0.615519 14.4762 0.807494 14.2845C0.99947 14.0927 1.23735 13.9968 1.52114 13.9968H12.5774C12.8612 13.9968 13.0991 14.0929 13.291 14.2849C13.483 14.477 13.579 14.715 13.579 14.9989C13.579 15.2828 13.483 15.5206 13.291 15.7124C13.0991 15.9041 12.8612 16 12.5774 16H1.52114ZM1.52114 9.46385C1.23735 9.46385 0.99947 9.36783 0.807494 9.17579C0.615519 8.98373 0.519531 8.74574 0.519531 8.46184C0.519531 8.17792 0.615519 7.94008 0.807494 7.74833C0.99947 7.55658 1.23735 7.4607 1.52114 7.4607H5.83578C6.11957 7.4607 6.35745 7.55672 6.54943 7.74876C6.74138 7.94083 6.83736 8.17882 6.83736 8.46274C6.83736 8.74665 6.74138 8.98447 6.54943 9.17623C6.35745 9.36798 6.11957 9.46385 5.83578 9.46385H1.52114ZM1.52114 2.92771C1.23735 2.92771 0.99947 2.83169 0.807494 2.63965C0.615519 2.44758 0.519531 2.2096 0.519531 1.9257C0.519531 1.64178 0.615519 1.40394 0.807494 1.21218C0.99947 1.02043 1.23735 0.924554 1.52114 0.924554H5.83578C6.11957 0.924554 6.35745 1.02059 6.54943 1.21265C6.74138 1.40469 6.83736 1.64268 6.83736 1.9266C6.83736 2.2105 6.74138 2.44833 6.54943 2.64008C6.35745 2.83183 6.11957 2.92771 5.83578 2.92771H1.52114ZM15.8261 12.0321C14.1528 12.0321 12.7265 11.4474 11.5471 10.278C10.3677 9.10861 9.77802 7.68795 9.77802 6.01604C9.77802 4.34415 10.368 2.9235 11.548 1.75409C12.728 0.584697 14.155 0 15.8292 0C17.5034 0 18.9294 0.584697 20.1074 1.75409C21.2853 2.9235 21.8743 4.34202 21.8743 6.00963C21.8743 6.62943 21.7776 7.23938 21.5841 7.83948C21.3906 8.4396 21.1047 8.98963 20.7263 9.48956L25.1899 13.9146C25.3834 14.0967 25.4801 14.3284 25.4801 14.6098C25.4801 14.8911 25.3834 15.1285 25.1899 15.322C25.0079 15.5069 24.7762 15.5994 24.4948 15.5994C24.2134 15.5994 23.976 15.5069 23.7825 15.322L19.3189 10.8969C18.8104 11.2668 18.2561 11.5484 17.656 11.7419C17.0559 11.9354 16.4459 12.0321 15.8261 12.0321ZM15.8261 10.0289C16.9498 10.0289 17.9048 9.63942 18.6914 8.86038C19.4779 8.08135 19.8711 7.13324 19.8711 6.01604C19.8711 4.89887 19.4779 3.95077 18.6914 3.17174C17.9048 2.3927 16.9498 2.00319 15.8261 2.00319C14.7026 2.00319 13.7475 2.3927 12.961 3.17174C12.1744 3.95077 11.7812 4.89887 11.7812 6.01604C11.7812 7.13324 12.1744 8.08135 12.961 8.86038C13.7475 9.63942 14.7026 10.0289 15.8261 10.0289Z"
        fill={color}
      />
    </svg>
  );
};

export const LikesIcon = ({ hover }) => {
  const { mode } = useContext(ThemeContext);

  let color = mode === "dark" ? "#fff" : "#000";

  if (hover) {
    color = "#098898";
  }

  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0016 16C9.79033 16 9.57534 15.9623 9.35657 15.8868C9.13781 15.8114 8.94545 15.6907 8.77949 15.5248L7.21796 14.099C5.61871 12.6355 4.17411 11.1834 2.88415 9.74257C1.5942 8.30174 0.949219 6.71381 0.949219 4.97878C0.949219 3.56058 1.42447 2.37624 2.37496 1.42574C3.32546 0.475248 4.5098 0 5.928 0C6.72762 0 7.48199 0.169731 8.19108 0.509194C8.90018 0.848656 9.50367 1.31259 10.0016 1.90099C10.4994 1.31259 11.1029 0.848656 11.812 0.509194C12.5211 0.169731 13.2755 0 14.0751 0C15.4933 0 16.6776 0.475248 17.6281 1.42574C18.5786 2.37624 19.0539 3.56058 19.0539 4.97878C19.0539 6.71381 18.4127 8.30552 17.1303 9.75389C15.8478 11.2023 14.3919 12.6582 12.7625 14.1216L11.2236 15.5248C11.0577 15.6907 10.8653 15.8114 10.6465 15.8868C10.4278 15.9623 10.2128 16 10.0016 16ZM9.14158 3.71146C8.70405 3.09288 8.23635 2.6214 7.73847 2.29703C7.24059 1.97265 6.6371 1.81047 5.928 1.81047C5.02277 1.81047 4.26841 2.11221 3.66492 2.7157C3.06143 3.31919 2.75969 4.07355 2.75969 4.97878C2.75969 5.76332 3.0388 6.59689 3.59703 7.47949C4.15525 8.36209 4.82286 9.21829 5.59985 10.0481C6.37685 10.8779 7.17647 11.6549 7.99872 12.3791C8.82098 13.1033 9.48859 13.6992 10.0016 14.1669C10.5145 13.6992 11.1821 13.1033 12.0044 12.3791C12.8266 11.6549 13.6263 10.8779 14.4032 10.0481C15.1802 9.21829 15.8478 8.36209 16.4061 7.47949C16.9643 6.59689 17.2434 5.76332 17.2434 4.97878C17.2434 4.07355 16.9417 3.31919 16.3382 2.7157C15.7347 2.11221 14.9803 1.81047 14.0751 1.81047C13.366 1.81047 12.7625 1.97265 12.2646 2.29703C11.7668 2.6214 11.2991 3.09288 10.8615 3.71146C10.7559 3.86233 10.6277 3.97548 10.4768 4.05092C10.3259 4.12636 10.1675 4.16407 10.0016 4.16407C9.83559 4.16407 9.67718 4.12636 9.5263 4.05092C9.37543 3.97548 9.24719 3.86233 9.14158 3.71146Z"
        fill={color}
      />
    </svg>
  );
};

export const ReadMeIcon = ({ hover }) => {
  const { mode } = useContext(ThemeContext);

  let color = mode === "dark" ? "#fff" : "#000";

  if (hover) {
    color = "#098898";
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.52942 12.4706H9.64704V11.0589H3.52942V12.4706ZM3.52942 8.70586H12.4706V7.29414H3.52942V8.70586ZM3.52942 4.94114H12.4706V3.52942H3.52942V4.94114ZM1.70137 16C1.22595 16 0.823532 15.8353 0.494119 15.5059C0.164706 15.1765 0 14.7741 0 14.2986V1.70137C0 1.22595 0.164706 0.823532 0.494119 0.494119C0.823532 0.164706 1.22595 0 1.70137 0H14.2986C14.774 0 15.1765 0.164706 15.5059 0.494119C15.8353 0.823532 16 1.22595 16 1.70137V14.2986C16 14.7741 15.8353 15.1765 15.5059 15.5059C15.1765 15.8353 14.774 16 14.2986 16H1.70137ZM1.70137 14.5883H14.2986C14.371 14.5883 14.4374 14.5581 14.4978 14.4978C14.5581 14.4374 14.5883 14.371 14.5883 14.2986V1.70137C14.5883 1.62896 14.5581 1.56259 14.4978 1.50224C14.4374 1.44191 14.371 1.41175 14.2986 1.41175H1.70137C1.62896 1.41175 1.56258 1.44191 1.50224 1.50224C1.44191 1.56259 1.41175 1.62896 1.41175 1.70137V14.2986C1.41175 14.371 1.44191 14.4374 1.50224 14.4978C1.56258 14.5581 1.62896 14.5883 1.70137 14.5883Z"
        fill={color}
      />
    </svg>
  );
};

export const UsersIcon = ({ hover }) => {
  const { mode } = useContext(ThemeContext);

  let color = mode === "dark" ? "#fff" : "#000";

  if (hover) {
    color = "#098898";
  }

  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.832031 15.0105V13.5663C0.832031 13.0021 0.97765 12.4986 1.26889 12.0558C1.56011 11.613 1.94903 11.2685 2.43567 11.0223C3.47605 10.5134 4.52221 10.1211 5.57413 9.8453C6.62607 9.56951 7.78222 9.43162 9.04258 9.43162C10.3029 9.43162 11.4591 9.56951 12.511 9.8453C13.5629 10.1211 14.6091 10.5134 15.6495 11.0223C16.1361 11.2685 16.525 11.613 16.8163 12.0558C17.1075 12.4986 17.2531 13.0021 17.2531 13.5663V15.0105C17.2531 15.2909 17.1583 15.5259 16.9686 15.7155C16.779 15.9052 16.544 16 16.2636 16H1.82151C1.54117 16 1.30616 15.9052 1.1165 15.7155C0.926854 15.5259 0.832031 15.2909 0.832031 15.0105ZM19.0173 16C19.1516 15.8855 19.2561 15.7423 19.3307 15.5705C19.4053 15.3987 19.4426 15.2064 19.4426 14.9937V13.4316C19.4426 12.713 19.2666 12.0282 18.9147 11.3771C18.5628 10.726 18.0637 10.1673 17.4174 9.70109C18.1514 9.81057 18.8482 9.98004 19.5079 10.2095C20.1675 10.439 20.797 10.7102 21.3963 11.0232C21.9619 11.3249 22.3987 11.6806 22.7068 12.0901C23.0149 12.4997 23.1689 12.9468 23.1689 13.4316V15.0105C23.1689 15.2909 23.0741 15.5259 22.8844 15.7155C22.6948 15.9052 22.4598 16 22.1794 16H19.0173ZM9.04258 7.66312C7.98891 7.66312 7.08689 7.28795 6.33654 6.53761C5.58618 5.78726 5.211 4.88525 5.211 3.83157C5.211 2.77788 5.58618 1.87587 6.33654 1.12553C7.08689 0.375178 7.98891 0 9.04258 0C10.0962 0 10.9983 0.375178 11.7486 1.12553C12.499 1.87587 12.8741 2.77788 12.8741 3.83157C12.8741 4.88525 12.499 5.78726 11.7486 6.53761C10.9983 7.28795 10.0962 7.66312 9.04258 7.66312ZM18.4952 3.83157C18.4952 4.88525 18.12 5.78726 17.3696 6.53761C16.6193 7.28795 15.7173 7.66312 14.6636 7.66312C14.5401 7.66312 14.3829 7.64909 14.192 7.62103C14.0012 7.59297 13.844 7.56209 13.7205 7.52841C14.1522 7.00938 14.484 6.43357 14.7158 5.80099C14.9477 5.16841 15.0636 4.5115 15.0636 3.83026C15.0636 3.14904 14.9454 2.49474 14.7089 1.86736C14.4724 1.24 14.1429 0.662457 13.7205 0.134736C13.8777 0.0785944 14.0348 0.0421029 14.192 0.0252621C14.3492 0.00842135 14.5064 0 14.6636 0C15.7173 0 16.6193 0.375178 17.3696 1.12553C18.12 1.87587 18.4952 2.77788 18.4952 3.83157ZM2.47412 14.3579H15.611V13.5663C15.611 13.3376 15.5538 13.1341 15.4395 12.9558C15.3251 12.7775 15.1437 12.6218 14.8952 12.4884C13.9942 12.0239 13.0665 11.6719 12.1121 11.4326C11.1577 11.1933 10.1345 11.0737 9.04258 11.0737C7.95064 11.0737 6.92748 11.1933 5.97308 11.4326C5.0187 11.6719 4.09098 12.0239 3.18992 12.4884C2.9415 12.6218 2.76009 12.7775 2.64569 12.9558C2.53131 13.1341 2.47412 13.3376 2.47412 13.5663V14.3579ZM9.04258 6.02106C9.64469 6.02106 10.1601 5.80667 10.5889 5.3779C11.0177 4.94912 11.2321 4.43368 11.2321 3.83157C11.2321 3.22947 11.0177 2.71402 10.5889 2.28525C10.1601 1.85647 9.64469 1.64209 9.04258 1.64209C8.44047 1.64209 7.92503 1.85647 7.49625 2.28525C7.06748 2.71402 6.85309 3.22947 6.85309 3.83157C6.85309 4.43368 7.06748 4.94912 7.49625 5.3779C7.92503 5.80667 8.44047 6.02106 9.04258 6.02106Z"
        fill={color}
      />
    </svg>
  );
};
