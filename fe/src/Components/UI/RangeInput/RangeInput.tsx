import React from "react";
import { Range, getTrackBackground } from "react-range";

const RangeInput: React.FC<any> = ({ volume, handleVolumeChange }) => {
  const [values, setValues] = React.useState([volume]);
  return (
    <Range
      step={1}
      min={0}
      max={100}
      values={values}
      onChange={(values) => {
        setValues(values);
        handleVolumeChange(values[0]);
      }}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: values,
                colors: ["#098898", "#C9E3E8"],
                min: 0,
                max: 100,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "16px",
            width: "16px",
            borderRadius: "50%",
            backgroundColor: "#098898",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    />
  );
};

export default RangeInput;
