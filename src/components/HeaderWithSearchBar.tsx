import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  TextInput,
} from 'react-native';
import {ImageSource} from '../utils/imageSource';
import {Title} from './Title';
import {IconButton} from './IconButton';

type P = {
  title: string;
  onSearch: (text: string) => void;
};

export const HeaderWithSearchBar: React.FC<P> = ({title, onSearch}) => {
  const [showSearchBar, setShowBar] = useState(false);
  const onPress = useCallback(() => {
    setShowBar(true);
  }, []);

  const onBackPress = useCallback(() => {
    setShowBar(false);
    onSearch('');
  }, [onSearch]);

  const renderHeaderElement = useCallback(() => {
    if (!showSearchBar) {
      return <Title>{title}</Title>;
    }

    return (
      <TextInput
        maxLength={50}
        style={styles.input}
        placeholder="Enter poster name..."
        placeholderTextColor="#999999"
        underlineColorAndroid="#999999"
        onSubmitEditing={e => onSearch(e.nativeEvent.text)}
      />
    );
  }, [onSearch, showSearchBar, title]);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={ImageSource.header}>
      <View style={styles.row}>
        <IconButton onPress={onBackPress} source={ImageSource.back} />
        <View style={styles.titleContainer}>{renderHeaderElement()}</View>
        <IconButton onPress={onPress} source={ImageSource.search} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  background: {
    width: '100%',
    height: StatusBar.currentHeight ? StatusBar.currentHeight + 56 : 56,
    position: 'absolute',
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  input: {
    fontFamily: 'TitilliumWebRegular',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
  },
});
