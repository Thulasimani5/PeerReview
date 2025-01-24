
export type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  width?: number;
  height?: number;
  renderEndIcon?: React.ReactNode; // Added prop for the end icon
  renderStartIcon?:React.ReactNode; // Added prop for the start icon
  multiline?: boolean;
  style?:string,
  numberofline?:number,
}

