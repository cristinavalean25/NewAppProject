import React from 'react';
import {Text, StyleSheet, TextStyle, ColorValue} from 'react-native';

interface ITypography {
  children: React.ReactNode;
  mode: 'extrasmall' | 'small' | 'large' | 'medium';
  align?: 'left' | 'center' | 'right';
  styles?: TextStyle;
  color?: ColorValue;
  fontWeight?: 'normal' | 'bold' | '500' | '600' | '700' | '800' | '900';
  margin?: number;
  padding?: number;
}

const Typography = ({
  children,
  mode,
  styles: otherStyles,
  align,
  color,
  fontWeight,
  margin,
  padding,
}: ITypography) => {
  return (
    <Text
      style={{
        ...styles.root,
        ...styles[mode],
        ...otherStyles,
        textAlign: align,
        color,
        fontWeight,
        margin,
        padding,
      }}>
      {children}
    </Text>
  );
};

Typography.defaultProps = {
  mode: 'medium',
  align: 'left',
  color: '#000',
  fontWeight: 'normal',
  margin: 0,
  padding: 0,
};

const styles = StyleSheet.create({
  root: {},
  extrasmall: {
    fontSize: 14,
  },
  small: {
    fontSize: 18,
  },
  medium: {
    fontSize: 24,
  },
  large: {
    fontSize: 28,
  },
});

export default Typography;
