import React from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  Icon,
} from 'native-base';

const CoursesMainScreen = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <Header>
        <Left />
        <Body>
          <Image
            source={require('../../../assets/10pearls.png')}
            style={{ width: 90, height: 50 }}
          />
        </Body>
        <Right />
      </Header>
    );
  };

  return (
    <Container>
      {renderHeader()}
      <Content>
        <Card style={styles.cardList}>
          <CardItem bordered button onPress={() => navigation.navigate('Courses')}>
            <Icon active name='library' style={{ color: 'blue' }} />
            <Text style={{ paddingLeft: 10 }}>List of Courses</Text>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </CardItem>

          <CardItem bordered button onPress={() => navigation.navigate('Categories')}>
            <Icon active name='book' style={{ color: 'blue' }} />
            <Text style={{ paddingLeft: 10 }}>List of Categories</Text>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </CardItem>

          <CardItem bordered button onPress={() => navigation.navigate('Tags')}>
            <Icon active name='pricetags' style={{ color: 'blue' }} />
            <Text style={{ paddingLeft: 10 }}>List of Tags</Text>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardList: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
});

export default CoursesMainScreen;
