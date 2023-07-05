import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  useWindowDimensions,
  Dimensions,
  View,
} from 'react-native';

import {CachedPoster} from '../../components/Poster';
import {PAGE1, PAGE2, PAGE3} from '../../utils/dummyData';
import {ImageSource} from '../../utils/imageSource';
import {HeaderWithSearchBar} from '../../components/HeaderWithSearchBar';

type P = {
  'poster-image': string;
  name: string;
};

const GUTTER_SIZE = 8;
const NUM_OF_COLUMNS = 3;

export const Home: React.FC = () => {
  const {width} = useWindowDimensions();

  const [contentData, setContentData] = useState<P[]>(
    PAGE1.page['content-items'].content,
  );

  const [filteredData, setFilteredData] = useState<P[]>([]);

  const currentPage = useRef(1);

  const maxHeight = useRef(0);

  const searchText = useRef('');

  const renderItem: ListRenderItem<P> = useCallback(
    ({item}) => {
      const w = Math.floor(
        (width - GUTTER_SIZE * (NUM_OF_COLUMNS + 1)) / NUM_OF_COLUMNS,
      );
      return (
        <CachedPoster
          width={w}
          name={item.name}
          maxHeightRef={maxHeight}
          source={ImageSource[item['poster-image']]}
        />
      );
    },
    [width],
  );

  const keyExtractor = useCallback(
    (item: P, index: number) => `${item.name}-${item['poster-image']}-${index}`,
    [],
  );

  const loadMoreContent = useCallback(() => {
    if (currentPage.current === 3) {
      return;
    }

    setContentData(prev => {
      if (currentPage.current === 1) {
        currentPage.current += 1;
        return [
          ...prev,
          ...PAGE2.page['content-items'].content.filter(i => {
            return i.name
              .toLowerCase()
              .includes(searchText.current.toLowerCase());
          }),
        ];
      }
      currentPage.current += 1;
      return [
        ...prev,
        ...PAGE3.page['content-items'].content.filter(i => {
          return i.name
            .toLowerCase()
            .includes(searchText.current.toLowerCase());
        }),
      ];
    });
  }, []);

  const onSearch = useCallback(
    (query: string) => {
      searchText.current = query;
      // Filter the content data based on the search query
      const filteredResults = contentData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filteredResults);
    },
    [contentData],
  );

  useEffect(() => {
    const unsubs = Dimensions.addEventListener('change', () => {
      // Reset the max height when the screen orientation changes
      maxHeight.current = 0;
    });

    return () => {
      unsubs.remove();
    };
  }, []);

  return (
    <View testID="homeComponent">
      <FlatList
        testID="flatList"
        data={searchText.current ? filteredData : contentData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={NUM_OF_COLUMNS}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <HeaderWithSearchBar title={PAGE1.page.title} onSearch={onSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  columnWrapper: {
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    paddingHorizontal: GUTTER_SIZE,
    paddingTop: 72,
  },
});
