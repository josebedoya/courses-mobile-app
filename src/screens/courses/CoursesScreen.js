import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Left, Right, Icon, Button, Title } from 'native-base';

import { fetchCourses } from './coursesSlice';

const CoursesScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const renderHeader = () => {
    return (
      <Header>
        <Left />
        <Body>
          <Title>Courses</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() =>
              navigation.navigate('AddCourse')
            }
          >
            <Icon name='add-circle-sharp' />
          </Button>
        </Right>
      </Header>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <CardItem
        bordered
        button
        onPress={() =>
          navigation.navigate('Chapter', {
            course: item
          })
        }
      >
        <Body>
          <Text>{item.title}</Text>
          <Text style={styles.subtitle}>{item.courseCategory.title} | {item.language.title}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </CardItem>
    )
  };

  return (
    <Container>
      {renderHeader()}
      <Content>
        <Card style={styles.cardList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(data) => data.id.toString()}
            data={data}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </Card>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    color: '#777',
    fontSize: 11
  },
  cardList: {
    marginLeft: 10,
    marginRight: 10,
  }
});

export default CoursesScreen;
