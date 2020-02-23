import React, { useEffect, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';
import { toogleBooked, removePost } from '../store/actions/post';

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { postId, date } = route.params;

  const post = useSelector(state =>
    state.post.allPosts.find(p => p.id === postId)
  );

  const booked = useSelector(state =>
    state.post.bookedPosts.some(post => post.id === postId)
  );

  useEffect(() => {
    navigation.setOptions({ booked });
  }, [booked]);

  const toogleHandler = useCallback(() => {
    dispatch(toogleBooked(post));
  }, [dispatch, post]);

  useEffect(() => {
    navigation.setOptions({ toogleHandler });
  }, [toogleHandler]);

  navigation.setOptions({
    headerTitle: 'Post from ' + new Date(date).toLocaleDateString(),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName={booked ? 'ios-star' : 'ios-star-outline'}
          onPress={() => toogleHandler()}
        />
      </HeaderButtons>
    )
  });

  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => {
            navigation.navigate('Main');
            dispatch(removePost(postId));
          }
        }
      ],
      { cancelable: false }
    );
  };

  if (!post) {
    return null;
  }

  return (
    <ScrollView style={styles.center}>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title='Delete'
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
});
