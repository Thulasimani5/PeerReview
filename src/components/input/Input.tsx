import React, { useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {InputProps} from './types';
import useStyles from './styles';

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value = '',
  onChangeText,
  disabled = false,
  error = false,
  errorMessage = '',
  width,
  height = 40,
  renderEndIcon, // New prop for the end icon
  multiline = false,
  numberofline = 2,
  renderStartIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = useStyles( disabled, error, isFocused);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={[{width: width ? width : 'auto'}]}>
      {label && <Text>{label}</Text>}
      <View style={[styles.inputContainer, {height}]}>
        {renderStartIcon && <View>{renderStartIcon}</View>}
        <TextInput
          style={[styles.input, multiline && styles.textArea]}
          placeholder={placeholder}
          placeholderTextColor={
            error ? 'red' : 'grey'
          }
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberofline : undefined}
        />
        {renderEndIcon && <View>{renderEndIcon}</View>}
      </View>
      {error && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};
Input.displayName = 'Input';
