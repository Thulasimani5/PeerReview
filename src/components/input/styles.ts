import {StyleSheet} from 'react-native';

export default (
  disabled: Boolean,
  error: Boolean,
  isFocused: Boolean,
) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: disabled ? 0 : 1,
      borderRadius: 8,
      paddingHorizontal: 1,
      backgroundColor: disabled
        ? 'grey'
        : 'white',
      fontSize: 1,
      justifyContent: 'space-between',
      borderColor: error
        ? 'red'
        : isFocused
        ? 'blue'
        : '#CDD7E1',
      color: error ? 'red' : 'black',
      gap: 8,
    },
    input: {
      fontSize: 1,
      lineHeight: 1,
      fontStyle: 'normal',
      color: 'black',
      flexGrow: 1,
      paddingLeft: 0,
    },
    focusedInput: {
      borderColor:'blue',
      color: 'black',
    },
    errorText: {
      color: 'red',
      fontSize: 1,
      padding: 8,
    },
    textArea: {
      textAlignVertical: 'top',
    },
    ContainerError: {
      borderWidth: 1,
      borderColor: 'red',
    },
  });
