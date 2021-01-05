import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, Text, Body, Button, Title, Icon, Left, Right, Item, Input, Toast } from 'native-base';
import { createChapter } from './coursesSlice';

const ChapterForm = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [titleField, setTitleField] = useState('');
  const [durationField, setDurationField] = useState('');

  const {
    id: courseId,
    title,
    courseCategory: { title: category },
    language: { title: language }
  } = route.params.course;

  const handleSubmit = async () => {
    if (!titleField || !durationField) {
      Toast.show({
        text: 'All fields are mandatories',
        buttonText: 'Okay',
        type: 'danger'
      });
      return;
    }
    const response = await dispatch(createChapter({ title: titleField, duration: durationField, courseId }));
    if (createChapter.fulfilled.match(response)) {
      Toast.show({
        text: 'Chapter was created successfully',
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
          <Title>Add chapter</Title>
        </Body>
        <Right />
      </Header>
    )
  }

  return (
    <Container>
      {renderHeader()}
      <Content padder>
        <Card style={styles.subHeaderCard}>
          <Text>{title}</Text>
          <Text style={styles.subtitle}>{category} | {language}</Text>
        </Card>
        <Content>
          <Item regular style={styles.formItem}>
            <Input
              name="title"
              placeholder="Chapter title"
              autoCapitalize="none"
              autoCorrect={false}
              value={titleField}
              onChangeText={(newValue) => setTitleField(newValue)}
            />
          </Item>
          <Item regular style={styles.formItem}>
            <Input
              name="duration"
              placeholder="Duration"
              autoCapitalize="none"
              autoCorrect={false}
              value={durationField}
              onChangeText={(newValue) => setDurationField(newValue)}
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

export default ChapterForm;
