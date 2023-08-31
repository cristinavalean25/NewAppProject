import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import Typography from '../Typography';

type CategoryProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const CategoryMenu = ({navigation}: CategoryProps) => {
  const redirectToCategory = (category: string) => {
    navigation.navigate('CategoryPage', {category});
  };

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://192.168.2.120:4000/category')
      .then(response => response.json())
      .then((data: string[]) => {
        setCategories(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          {categories.map((category, index) => (
            <View key={index} style={styles.row}>
              <TouchableOpacity
                onPress={() => redirectToCategory(category)}
                style={styles.category}>
                <Typography mode="small">{category.toUpperCase()}</Typography>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  row: {
    width: '48%',
    margin: 2,
    marginBottom: 10,
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E839F6',
    backgroundColor: '#fff',
  },
});

export default CategoryMenu;
