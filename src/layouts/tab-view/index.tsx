import { HStack, Pressable, ScrollView, Text, View } from 'native-base';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

const widthScreen = Dimensions.get('screen').width;

export interface ITabViewProps {
  tabs: ITabViewItem[];
}

export interface ITabViewItem {
  title: string;
  element?: JSX.Element;
}

const TabView = (props: any) => {
  const { tabs } = props;
  const [selected, setSelected] = useState(0);
  const refScrollContent: MutableRefObject<any> = useRef(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event;
    const index = Math.round(nativeEvent.contentOffset.x / (widthScreen - 20));
    setSelected(index);
  };

  const onPressNavItem = (index: number) => {
    refScrollContent?.current?.scrollTo({
      x: widthScreen * index,
      y: 0,
    });
  };

  return (
    <View>
      <ScrollView horizontal scrollEnabled={false}>
        <HStack w="full">
          {tabs.map((tab: ITabViewItem, index: number) => {
            return (
              <Pressable
                key={index}
                onPress={() => onPressNavItem(index)}
                flexBasis="1">
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  px={4}
                  py={2}
                  color={selected === index ? 'red.500' : 'dark.50'}>
                  {tab.title}
                </Text>
                {selected === index && (
                  <View
                    w="100%"
                    h="1"
                    borderRadius="2px"
                    backgroundColor="red.500"
                  />
                )}
              </Pressable>
            );
          })}
        </HStack>
      </ScrollView>
      <ScrollView
        horizontal
        pagingEnabled
        ref={refScrollContent}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}>
        {tabs.map((tab: ITabViewItem, index: number) => (
          <View key={index} style={styles.itemScroll}>
            {tab.element}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabView;
const styles = StyleSheet.create({
  itemScroll: {
    width: widthScreen,
  },
});
