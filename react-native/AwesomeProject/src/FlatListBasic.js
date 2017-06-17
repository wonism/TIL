import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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

const data = [
  {key: 'Devin'},
  {key: 'Jackson'},
  {key: 'James'},
  {key: 'Joel'},
  {key: 'John'},
  {key: 'Jillian'},
  {key: 'Jimmy'},
  {key: 'Julie'},
];

const renderItem = ({ item }) => <Text style={styles.item}>{item.key}</Text>;

const FlatListBasic = () => (
  <View style={styles.container}>
    <FlatList
      data={data}
      renderItem={renderItem}
    />
  </View>
);

export default FlatListBasic;
