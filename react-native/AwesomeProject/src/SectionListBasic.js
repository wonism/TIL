import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const sections = [
  {title: 'D', data: ['Devin']},
  {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
];

const renderItem = ({ item }) => (
  <Text
    key={item}
    style={styles.item}
  >
    {item}
  </Text>
);

const renderSectionHeader = ({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>;

const SectionListBasic = () => (
  <View style={styles.container}>
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  </View>
);

export default SectionListBasic;
