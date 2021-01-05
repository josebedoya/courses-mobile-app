import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Content, Header, Button, Icon, Card, CardItem, Text, Body, Left, Right, Title } from 'native-base';

const ChaptersScreen = ({ route, navigation }) => {
  const {
    title,
    chapters,
    courseCategory: { title: category },
    language: { title: language }
  } = route.params.course;

  const renderHeader = () => {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Chapters</Title>
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

  const renderItem = ({ item }) => {
    return (
      <CardItem bordered>
        <Body>
          <Text>{item.title}</Text>
        </Body>
        <Right>
          <Text note>{item.duration}</Text>
        </Right>
      </CardItem>
    )
  };

  return (
    <Container>
      {renderHeader()}
      <Content>
        <Card style={styles.subHeaderCard}>
          <Text>{title}</Text>
          <Text style={styles.subtitle}>{category} | {language}</Text>
        </Card>
        <Card style={styles.cardList}>
          <FlatList
            keyExtractor={(chapters) => chapters.id.toString()}
            data={chapters}
            renderItem={renderItem}
          />
        </Card>
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
  subtitle: {
    color: '#777',
    fontSize: 12
  },
  cardList: {
    marginLeft: 10,
    marginRight: 10,
  }
})

export default ChaptersScreen;
