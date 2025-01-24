import React from 'react';
// SVG
import Svg, {Path} from 'react-native-svg';
// types
// utils

export const CheckIcon = ({
  size = 16,
  color = '#000',
  ...rest
}): JSX.Element => {
  return (
    <Svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      {...rest}>
      <Path
        d="M13 4.25l-6.875 6.875L3 8"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
