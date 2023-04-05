import { HStack, Pressable, ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event;
    const index = Math.round(nativeEvent.contentOffset.x / (widthScreen - 20));
    setSelected(index);
  };

  return (
    <View>
      <ScrollView horizontal>
        <HStack>
          {tabs.map((tab: ITabViewItem, index: number) => {
            return (
              <Pressable key={index} onPress={() => setSelected(index)}>
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
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={onScroll}>
        {tabs.map((tab: ITabViewItem) => tab.element)}
      </ScrollView>
    </View>
  );
};

export default TabView;
