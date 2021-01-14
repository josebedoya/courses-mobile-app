import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Text, Body, Button, Title, Icon, Left, Right, Item, Input, Toast, Picker } from 'native-base';
import { createCategory } from './courseCategoriesSlice';

const CourseCategoryForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [titleField, setTitleField] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const typePickerOnChange = value => {
    console.log(value);
    setSelectedType(value);
  }

  const handleSubmit = async () => {
    if (!titleField || !selectedType) {
      Toast.show({
        text: 'All fields are mandatories',
        buttonText: 'Okay',
        type: 'danger'
      });
      return;
    }
    const response = await dispatch(createCategory({ title: titleField, type: selectedType }));
    if (createCategory.fulfilled.match(response)) {
      Toast.show({
        text: 'Category was created successfully',
        buttonText: 'Okay',
        type: 'success',
        duration: 4000
      });
      navigation.navigate('Categories');
    }
  };

  const renderHeader = () => {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Add category</Title>
        </Body>
        <Right />
      </Header>
    )
  }

  return (
    <Container>
      {renderHeader()}
      <Content padder>
        <Content>
          <Item regular style={styles.formItem}>
            <Input
              name="title"
              placeholder="Category title"
              autoCapitalize="none"
              autoCorrect={false}
              value={titleField}
              onChangeText={(newValue) => setTitleField(newValue)}
            />
          </Item>
          <Item picker regular>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="chevron-down" />}
              style={styles.picker}
              placeholderStyle={{ color: "#ccc" }}
              placeholderIconColor="#007aff"
              placeholder="Select type"
              selectedValue={selectedType}
              onValueChange={typePickerOnChange}
            >
              <Picker.Item label="Programming Language" value="Programming Language" />
              <Picker.Item label="Softskill" value="Softskill" />
              <Picker.Item label="Framework" value="Framework" />
              <Picker.Item label="Library" value="Library" />
              <Picker.Item label="DevOps" value="DevOps" />
              <Picker.Item label="Testing" value="Testing" />
              <Picker.Item label="Security" value="Security" />
              <Picker.Item label="Version Control" value="Version Control" />
              <Picker.Item label="Platforms" value="Platforms" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </Item>
          <Button block style={styles.button} onPress={() => handleSubmit()}>
            <Text>Save</Text>
          </Button>
        </Content>
      </Content>
    </Container>
  )
};

const styles = StyleSheet.create({
  subHeaderCard: {
    backgroundColor: '#f8f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  subtitle: {
    color: '#777',
    fontSize: 12
  },
  formItem: {
    marginVertical: 5,
  },
  button: {
    marginTop: 20
  },
  picker: {
    width: '84%',
  }
});

export default CourseCategoryForm;
