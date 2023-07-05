import React, {useMemo} from 'react';
import {Image, StyleSheet, ImageSourcePropType, View} from 'react-native';
import {Label} from './Label';

type P = {
  width: number;
  source: ImageSourcePropType;
  name: string;
  maxHeightRef: React.MutableRefObject<number>;
};

export const Poster: React.FC<P> = ({source, name, width, maxHeightRef}) => {
  // Calculate the height of the poster image
  const height = useMemo(() => {
    const {height: imageHeight, width: imageWidth} =
      Image.resolveAssetSource(source);

    const desiredWidth = Math.min(width, imageWidth);

    // Calculate the aspect ratio (width / height)
    const aspectRatio = imageWidth / imageHeight;

    // Calculate the desired height based on the aspect ratio
    const desiredHeight = desiredWidth / aspectRatio;

    // Check if the desired height exceeds the maximum height reference
    if (maxHeightRef.current !== 0 && desiredHeight > maxHeightRef.current) {
      return maxHeightRef.current; // Use the maximum height reference
    }

    // Update the maximum height reference with the desired height
    maxHeightRef.current = desiredHeight;

    return desiredHeight;
  }, [maxHeightRef, source, width]);

  // Define the container and image styles to avoid unnecessary re-rendering
  const {containerStyle, imageStyle} = useMemo(() => {
    return {
      containerStyle: {width},
      imageStyle: {width, height},
    };
  }, [height, width]);

  return (
    <View style={containerStyle}>
      <Image source={source} style={imageStyle} resizeMode="cover" />
      <Label style={styles.labelStyle} numberOfLines={1}>
        {name}
      </Label>
    </View>
  );
};

// Memoize the CachedPoster component to prevent unnecessary re-renders
export const CachedPoster = React.memo(Poster);

const styles = StyleSheet.create({
  labelStyle: {
    marginTop: 8,
  },
});
