import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Alert, Image } from 'react-native';
import { Container, Content, Header, Button, Icon, Card, ListItem, Text, Body, Left, Right, Title, Toast } from 'native-base';
import { SwipeRow } from 'react-native-swipe-list-view';
import { deleteChapter } from './coursesSlice';

const ChaptersScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    id: courseId,
    title,
    chapters,
    courseCategory: { title: category },
    language: { title: language }
  } = route.params.course;

  const deleteItemAlert = (id, title) =>
    Alert.alert(
      'Delete Chapter',
      `Delete "${title}" chapter?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => deleteItem(id)
        }
      ],
      { cancelable: false }
    );

  const deleteItem = async (id) => {
    const response = await dispatch(deleteChapter({id, courseId}));
    if (deleteChapter.fulfilled.match(response)) {
      Toast.show({
        text: 'Chapter was deleted successfully',
        buttonText: 'Okay',
        type: 'success',
        duration: 4000
      });
      navigation.navigate('Courses');
    }
  }

  const renderHeader = () => {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Image
            source={require('../../../assets/10pearls.png')}
            style={{ width: 90, height: 50 }}
          />
        </Body>
        <Right>
          <Button
            transparent
            onPress={() =>
              navigation.navigate('AddChapter', {
                course: route.params.course
              })
            }
          >
            <Icon name='add-circle-sharp' />
          </Button>
        </Right>
      </Header>
    )
  }

  const renderItem = item => {
    return (
      <SwipeRow leftOpenValue={56} rightOpenValue={-75} key={item.id}>
        <ListItem style={styles.standaloneRowBack} thumbnail>
          <Left>
            <Button style={{ backgroundColor: "#ff0000" }} onPress={() => deleteItemAlert(item.id, item.title)}>
              <Icon name="trash" />
            </Button>
          </Left>
          <Body />
          <Right>
            <Text>Right</Text>
          </Right>
        </ListItem>
        <ListItem bordered style={styles.standaloneRowFront}>
          <Body>
            <Text>{item.title}</Text>
          </Body>
          <Right>
            <Text note>{item.duration}</Text>
          </Right>
        </ListItem>
      </SwipeRow>
    )
  };

  return (
    <Container>
      {renderHeader()}
      <Content>
        <Card style={styles.subHeaderCard}>
          <Text style={styles.pageTitle}>Chapters</Text>
          <Text>{title}</Text>
          <Text style={styles.subtitle}>{category} | {language}</Text>
        </Card>
        {chapters.map(item => renderItem(item))}
      </Content>
    </Container>
  )
};

const styles = StyleSheet.create({
  subHeaderCard: {
    backgroundColor: '#f8f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    color: '#777',
    fontSize: 12
  },
  cardList: {
    marginLeft: 10,
    marginRight: 10,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    backgroundColor: 'rgba(255,255,255,1)',
    marginLeft: 0,
    marginRight: 0,
  },
  standaloneRowBack: {
    backgroundColor: '#ff0000',
    marginLeft: 0,
    marginRight: 0,
  },
})

export default ChaptersScreen;
