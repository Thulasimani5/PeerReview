import {StyleSheet} from 'react-native';
// types

export default (
  primary: boolean,
  border: boolean,
) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row', // Align items in a row
      alignItems: 'center',
      gap: 25, // Add spacing between checkbox and label
    },
    container: {
      width: 24,
      height: 24,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    unSelectedBox: {
      borderWidth: 1,
      borderColor: border
        ? 'gray'
        : 'blue',
      backgroundColor: 'white',
    },
    selectedBox: {
      backgroundColor: primary
        ? 'white'
        : 'blue',
    },
    labelContainer: {
      justifyContent: 'center', // Center label vertically
    },
  });
