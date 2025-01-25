// types
import type {TouchableOpacityProps} from 'react-native';

export type TCheckBox = Omit<TouchableOpacityProps, 'onPress'> & {
  // state of button selected or not
  selected?: boolean;
  // state of button disabled or enabled
  disabled?: boolean;
  // onpress function to enable or disable radiobutton
  onPress?: (state: boolean) => void;
  // Label as a string or custom component
  label?: string | React.ReactNode;
  name:string;
  rollNo : string;
};
