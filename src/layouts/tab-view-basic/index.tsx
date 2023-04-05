import { Box, Pressable, useColorModeValue } from 'native-base';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

function TabViewBasic(props: any) {
  const [tabIndex, setTabIndex] = useState(0);

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (x: any, i: number) => i,
    );

    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const color =
            tabIndex === i
              ? useColorModeValue('#000', '#e5e5e5')
              : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor =
            tabIndex === i
              ? 'cyan.500'
              : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={route.key}>
              <Pressable
                onPress={() => {
                  console.log(i);
                  setTabIndex(i);
                }}>
                <Animated.Text
                  style={{
                    color,
                  }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index: tabIndex,
        routes: [
          { key: 'first', title: 'First' },
          { key: 'second', title: 'Second' },
          { key: 'three', title: 'First' },
          { key: 'fourrrr', title: 'Second' },
          { key: 'firee', title: 'First' },
          { key: 'xichh', title: 'Second' },
        ],
      }}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
      renderTabBar={renderTabBar}
      onIndexChange={index => setTabIndex(index)}
      initialLayout={{ width: Dimensions.get('window').width }}
      style={styles.container}
    />
  );
}

export default TabViewBasic;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
