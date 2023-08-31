import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';

function NewProduct() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productGender, setProductGender] = useState('');

  const addProduct = async () => {
    try {
      const response = await axios.post('http://192.168.2.120:4000/products', {
        title: productTitle,
        price: parseFloat(productPrice),
        image: productImage,
        category: productCategory,
        brand: productBrand,
        gender: productGender,
        description: productDescription,
      });
      console.log('Produs adaugat:', response.data);
    } catch (error) {
      console.error('Eroare la adaugarea produsului:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={productTitle}
        onChangeText={text => setProductTitle(text)}
      />
      <TextInput
        placeholder="Name"
        value={productName}
        onChangeText={text => setProductName(text)}
      />
      <TextInput
        placeholder="Price"
        value={productPrice}
        onChangeText={text => setProductPrice(text)}
      />
      <TextInput
        placeholder="Images"
        value={productImage}
        onChangeText={text => setProductImage(text)}
      />
      <TextInput
        placeholder="Category"
        value={productCategory}
        onChangeText={text => setProductCategory(text)}
      />
      <TextInput
        placeholder="Gender"
        value={productGender}
        onChangeText={text => setProductGender(text)}
      />
      <TextInput
        placeholder="Brand "
        value={productBrand}
        onChangeText={text => setProductBrand(text)}
      />
      <TextInput
        placeholder="Description"
        value={productDescription}
        onChangeText={text => setProductDescription(text)}
        style={styles.descriptionInput}
        multiline
        numberOfLines={4}
      />
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionInput: {
    width: '100%',
    height: 50,
    maxHeight: 200,
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
  },
});
export default NewProduct;
