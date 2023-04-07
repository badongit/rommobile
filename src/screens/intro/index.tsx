/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { PropsWithChildren, useEffect, useState } from 'react';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useAuth } from 'src/hooks/useAuth';
import useFloor from 'src/hooks/useFloor';
import TabTables from 'src/layouts/tab-tables';
import { ITabViewItem } from 'src/layouts/tab-view';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function Intro(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const { userInfo } = useAuth();
  const { actions, items } = useFloor();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    actions.getList();
  }, []);

  return (
    //   <SafeAreaView style={backgroundStyle}>
    //     <StatusBar
    //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //       backgroundColor={backgroundStyle.backgroundColor}
    //     />
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       style={backgroundStyle}>
    //       <Header />
    //       <View
    //         style={{
    //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //         }}>
    //         <Section title="Step One">
    //           <Text style={styles.highlight}>{userInfo.name}</Text>
    //         </Section>
    //         <Section title="See Your Changes">
    //           <ReloadInstructions />
    //         </Section>
    //         <Section title="Debug">
    //           <DebugInstructions />
    //         </Section>
    //         <Section title="Learn More">
    //           Read the docs to discover what to do next:
    //         </Section>
    //         <LearnMoreLinks />
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    <View>
      {items.length !== 0 ? (
        <TabTables key={1} tables={items[0].tables} />
      ) : (
        <Section title="Learn More">
          Read the docs to discover what to do next:
        </Section>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Intro;
