import { ScrollView, View } from 'native-base';
import { MutableRefObject, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import { IMenuCustomItemProps } from '../menu';
import DefaultMenu from '../menu/DefaultMenu';

const widthScreen = Dimensions.get('screen').width;

export interface ITabViewProps {
  tabs: ITabViewItem[];
  MenuView?: any;
}

export interface ITabViewItem {
  title: string;
  image?: string;
  element?: JSX.Element;
}

const TabView = (props: ITabViewProps) => {
  const { tabs, MenuView } = props;
  const menuItems: IMenuCustomItemProps[] = [
    ...tabs.map((tab, index) => ({
      title: tab.title,
      image: tab.image,
      onPress: () => setSelected(index),
    })),
  ];
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
      {MenuView ? (
        <MenuView items={menuItems} isScrollable={true} selected={selected} />
      ) : (
        <DefaultMenu
          items={menuItems}
          isScrollable={true}
          selected={selected}
        />
      )}
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
