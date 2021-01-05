import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, Text, Body, Button, Title, Icon, Left, Right, Item, Input, Toast } from 'native-base';
import { createCourse } from './coursesSlice';

const CourseForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [titleField, setTitleField] = useState('');
  const [linkField, setLinkField] = useState('');

  const handleSubmit = async () => {
    if (!titleField || !linkField) {
      Toast.show({
        text: 'All fields are required',
        buttonText: 'Okay',
        type: 'danger'
      });
      return;
    }
    const response = await dispatch(createCourse({ title, link, courseCategoryId, languageId }));
    if (createCourse.fulfilled.match(response)) {
      Toast.show({
        text: 'Course was created successfully',
        buttonText: 'Okay',
        type: 'success',
        duration: 4000
      });
      navigation.navigate('Courses');
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
          <Title>Add course</Title>
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
              placeholder="Course title"
              autoCapitalize="none"
              autoCorrect={false}
              value={titleField}
              onChangeText={(newValue) => setTitleField(newValue)}
            />
          </Item>
          <Item regular style={styles.formItem}>
            <Input
              name="link"
              placeholder="Website"
              autoCapitalize="none"
              autoCorrect={false}
              value={linkField}
              onChangeText={(newValue) => setLinkField(newValue)}
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
  }
});

export default CourseForm;
