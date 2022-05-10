import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RestaurantHeader from '../components/Header/RestaurantHeader';
import {fonts} from '../assets/theme/colors';
import colors from '../assets/theme/colors';
import {restauratsData, menu} from '../assets/theme/Data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabView, TabBar} from 'react-native-tab-view';
import MenuScreen from './RestaurantTabs/MenuScreen';
import Api from '../api/Api';

const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = SCREEN_WIDTH;

const RestaurantHomeScreen = ({navigation, route, id}) => {
  const [routes2] = useState(menu);
  const [routes] = useState([
    {key: 'first', title: 'MENU'},
    {key: 'second', title: 'INFO'},
    {key: 'third', title: 'REVIEWS'},
    {key: 'fourth', title: 'GALLERY'},
  ]);

  const [index, setIndex] = useState(0);

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    getRestaurant();
    getRestaurantAllFroduct();
  }, [route.params]);
  console.log(route);
  console.log(id,'xfcgvh');
  function getRestaurant() {
    Api.get(`get/restaurant/product/${route.params.id}`)
      .then(async function (response) {
        // console.log(response.data, '==========Restaurant product=============')
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function getRestaurantAllFroduct() {
    Api.get(`get/restaurant/${route.params.id}`)
      .then(async function (response) {
        // console.log(response.data, '==========Restaurant product=============')
        setData1(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.cardbackground}}
      tabStyle={styles.tabStyle}
      scrollEnabled={true}
      style={styles.tab}
      labelStyle={styles.tabLabel}
      contentContainerStyle={styles.tabContainer}
    />
  );

  const UpdateRoute1 = () => {
    return <View></View>;
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 10,
      }}>
      <View>
        <FlatList
          style={{borderBottomWidth: 0.2}}
          data={data1}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <View style={styles.container}>
              <RestaurantHeader item={item} navigation={navigation} />
              {item.discount && (
                <View style={styles.view1}>
                  <Text style={styles.text1}>
                    GET {item.discount}% OFF ON FOOD TOTAL
                  </Text>
                </View>
              )}
              <View style={styles.view2}>
                <View style={styles.view3}>
                  <Text style={styles.text2}>{item.RestaurantName}</Text>
                  <Text style={styles.text3}>{item.footType}</Text>
                  <View style={styles.view4}>
                    <Ionicons name="star" color={colors.grey3} size={15} />
                    <Text style={styles.text4}>{item.averageReview}</Text>
                    <Text style={styles.text5}>({item.numberOfReview}+)</Text>
                    <Ionicons name="location" color={colors.grey3} size={15} />
                    <Text style={styles.text4}>{item.farAway} mi away</Text>
                  </View>
                </View>
                <View style={styles.view5}>
                  <Text style={styles.text6}>Collect</Text>
                  <View style={styles.view7}>
                    <Text style={styles.text7}>{item.collectTime}</Text>
                    <Text style={styles.text8}>min</Text>
                  </View>
                </View>
                <View style={styles.view8}>
                  <Text style={styles.text6}>Delivery</Text>
                  <View style={styles.view9}>
                    <Text style={styles.text9}>{item.deliveryTime}</Text>
                    <Text style={styles.text11}>min</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
        {/* <View style={styles.view10}>
          <TabView
            navigationState={{index, routes}}
            renderScene={UpdateRoute1}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            tabBarPosition="top"
          />
        </View> */}

        {/* {index === 0 && ( */}
          <FlatList
            style={{marginBottom: 1}}
            data={data}
            keyExtractor={item => item.ID_Product}
            renderItem={({item}) => (
              <ScrollView>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MenuProductScreen', {
                      product: item,
                    });
                  }}>
                  <View style={styles.container2}>
                    <View style={styles.view21}>
                      <View style={styles.view23}>
                        <Text style={styles.text21}>{item.productName}</Text>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 15,
                          }}>
                          <Text style={styles.text21}>
                            {item.price - (item.discount * item.price) / 100}
                          </Text>
                          <Text
                            style={[
                              styles.text21,
                              {textDecorationLine: 'line-through'},
                            ]}>
                            {item.price}
                          </Text>
                          <View>
                            <Text style={styles.text22}>Khuyen mai</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.view22}>
                        <Image
                          style={styles.image2}
                          source={item.Image_Pro ? {uri: item.Image_Pro} : null}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            )}
          />
        {/* )} */}
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CartScreen');
        }}>
        <View style={styles.view11}>
          <View style={styles.view12}>
            <Text style={styles.text13}>View Cart</Text>
            <View style={styles.view13}>
              <Text style={styles.text13}>0</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  view1: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
  },
  view2: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 5,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  view3: {
    flex: 8,
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grey1,
  },
  text3: {
    fontSize: 15,
    color: colors.grey3,
  },
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  text4: {
    fontFamily: fonts.android.bold,
    fontSize: 13,
    color: colors.grey3,
    marginLeft: 2,
  },
  text5: {
    fontFamily: fonts.android.bold,
    fontSize: 13,
    color: colors.grey3,
    marginLeft: 2,
    marginRight: 5,
  },
  text6: {
    fontFamily: fonts.android.bold,
    fontSize: 13,
    color: colors.grey3,
    marginLeft: 0,
  },
  view5: {
    flex: 3,
    alignItems: 'center',
  },
  text6: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.grey1,
  },
  view7: {
    width: 40,
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  text7: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  text8: {
    fontSize: 13,
    color: 'black',
    marginBottom: 5,
  },
  view8: {
    flex: 3,
    alignItems: 'center',
  },
  text9: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.grey1,
  },
  view9: {
    width: 40,
    height: 40,
    backgroundColor: colors.buttons,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  text10: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.cardbackground,
    marginTop: 5,
  },
  text11: {
    fontSize: 13,
    color: colors.cardbackground,
    marginBottom: 5,
  },
  view10: {
    elevation: 10,
    backgroundColor: colors.pagebackground,
  },
  view11: {
    backgroundColor: colors.buttons,
    height: 50,
    alignContent: 'center',
    marginBottom: 0,
    justifyContent: 'center',
  },
  view12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text12: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.cardbackground,
  },
  view13: {
    borderWidth: 1,
    marginRight: 10,
    borderColor: colors.cardbackground,
    borderRadius: 6,
    paddingBottom: 2,
  },
  text13: {
    paddingHorizontal: 3,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.cardbackground,
  },
  tab: {
    paddingTop: 0,
    backgroundColor: colors.buttons,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  tabStyle: {
    width: SCREEN_WIDTH / 4,
    maxHeight: 45,
  },
  view14: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.buttons,
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 24,
  },

  text14: {
    fontWeight: 'bold',
    marginLeft: 40,
    color: 'black',
    fontSize: 18,
  },
  view15: {
    marginTop: 5,
    paddingBottom: 20,
  },
  //22222222
  container2: {
    flex: 1,
    marginTop: 20,
  },

  view21: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  view22: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  view23: {
    flex: 1,
  },
  view24: {},
  text21: {
    color: 'black',
    fontSize: 16,
  },
  text22: {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 10,
  },
  image2: {
    width: 80,
    height: 80,
  },
});
