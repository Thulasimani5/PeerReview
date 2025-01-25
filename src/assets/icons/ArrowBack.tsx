import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const ArrowBack: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#2b4f87"
      {...props} // Spread the props for external customization
    >
      <Path d="M400-80L0-480l400-400 71 71-329 329 329 329-71 71z" />
    </Svg>
  );
};

export default ArrowBack;
