import React, {memo} from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
// Context
// Styles
import useStyles from './styles';
// Types
import {TCheckBox} from './types';
// Icons
import {CheckIcon} from '../../assets/icons/Check';
// Text Component

export const Checkbox: React.FC<TCheckBox> = memo(
  ({selected = false, disabled = false, onPress, label}) => {
    // Memoize the primary value
    const primary = selected && !disabled ? false : true;
    //border color in boolean
    const border = !selected && !disabled ? false : true;
    const styles = useStyles(primary, border);

    // Memoize check icon  color
    const check =
      selected && !disabled
        ? 'white'
        : 'gray';
    //handlepress function to select and unselect checbox
    const handlePress = () => {
      if (!disabled && onPress) {
        onPress(!selected);
      }
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        style={styles.wrapper}>
        <View
          style={[
            styles.container,
            !selected ? styles.unSelectedBox : styles.selectedBox,
          ]}>
          {selected && <CheckIcon color={check} />}
        </View>
        {label && (
          <View style={styles.labelContainer}>
            {typeof label === 'string' ? (
             <Text>{label}</Text>
            ) : (
              label
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  },
);

Checkbox.displayName = 'Checkbox';
