import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Text, Body, Button, Title, Icon, Left, Right, Item, Input, Toast } from 'native-base';
import { createTag } from './courseTagsSlice';

const CourseTagForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [titleField, setTitleField] = useState('');

  const handleSubmit = async () => {
    if (!titleField) {
      Toast.show({
        text: 'All fields are mandatories',
        buttonText: 'Okay',
        type: 'danger'
      });
      return;
    }
    const response = await dispatch(createTag({ title: titleField }));
    if (createTag.fulfilled.match(response)) {
      Toast.show({
        text: 'Tag was created successfully',
        buttonText: 'Okay',
        type: 'success',
        duration: 4000
      });
      navigation.navigate('Tags');
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
          <Title>Add tag</Title>
        </Body>
        <Right />
      </Header>
    )
  };

  return (
    <Container>
      {renderHeader()}
      <Content padder>
        <Content>
          <Item regular style={styles.formItem}>
            <Input
              name="title"
              placeholder="Tag title"
              autoCapitalize="none"
              autoCorrect={false}
              value={titleField}
              onChangeText={(newValue) => setTitleField(newValue)}
            />
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

export default CourseTagForm;
