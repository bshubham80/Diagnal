import React from 'react';
import {
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

type P = {
  onPress: () => void;
  source: ImageSourcePropType;
};

export const IconButton: React.FC<P> = ({source, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={source} style={styles.backIcon} resizeMode="center" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    width: 24,
    height: 24,
  },
});
