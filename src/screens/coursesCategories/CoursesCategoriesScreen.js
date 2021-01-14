import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Alert } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  ListItem,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Button,
  Toast,
} from 'native-base';
import { SwipeRow } from 'react-native-swipe-list-view';

import { fetchCategories, deleteCategory } from './courseCategoriesSlice';

const CoursesCategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.courseCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteItemAlert = (id, title) =>
    Alert.alert(
      'Delete Category',
      `Delete "${title}" category?`,
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
    const response = await dispatch(deleteCategory(id));
    if (deleteCategory.fulfilled.match(response)) {
      Toast.show({
        text: 'Category was deleted successfully',
        buttonText: 'Okay',
        type: 'success',
        duration: 4000
      });
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
          <Button transparent onPress={() => navigation.navigate('AddCategory')}>
            <Icon name='add-circle-sharp' />
          </Button>
        </Right>
      </Header>
    );
  };

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
        <ListItem style={styles.standaloneRowFront}>
          <Body>
            <Text>{item.title}</Text>
          </Body>
          <Right />
        </ListItem>
      </SwipeRow>
    );
  };

  return (
    <Container>
      {renderHeader()}
      <Content>
        <Card style={styles.subHeaderCard}>
          <Text style={styles.pageTitle}>Categories</Text>
        </Card>
        <Card>{data.map(item => renderItem(item))}</Card>
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
});

export default CoursesCategoriesScreen;
