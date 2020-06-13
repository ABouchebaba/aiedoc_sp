import {FontAwesome, AntDesign} from '@expo/vector-icons';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  BackImage,
  CategoriesFilter,
  MarketHeader,
  ProductCard,
} from '../components';
import {getCategories, getProducts} from '../Store/actions';
const {width, height} = Dimensions.get('window');

const StoreHome = (props) => {
  const dispatch = useDispatch();
  const {products, categories, loadingCat, loadingProd} = useSelector(
    (state) => state.store,
  );

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  function searchByCategory(cat) {
    let data = products;
    if (cat !== '') {
      data = data.filter((product) => product.category._id === cat);
    }
    setFilteredData(data);
  }

  function sortAZ(sorted) {
    if (sorted) {
      setFilteredData(_.orderBy(filteredData, ['name'], ['asc']));
    } else {
      setFilteredData(_.orderBy(filteredData, ['name'], ['desc']));
    }
  }

  function sortPrice(sorted) {
    if (sorted) {
      setFilteredData(_.orderBy(filteredData, ['price'], ['asc']));
    } else {
      setFilteredData(_.orderBy(filteredData, ['price'], ['desc']));
    }
  }

  return (
    <BackImage source={require('../../assets/bg/bgMarket.png')}>
      <View style={styles.header}>
        <MarketHeader navigation={props.navigation} />
      </View>
      <View style={styles.mainView}>
        <View style={styles.search}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Omron"
              style={styles.TextInput}
              onChangeText={(e) => setSearchText(e)}
            />
            <View style={styles.icon}>
              <FontAwesome name="search" size={25} color="black" />
            </View>
          </View>
          {loadingCat ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <CategoriesFilter
              categories={categories}
              filter={searchByCategory}
              sortAZ={sortAZ}
              sortPrice={sortPrice}
            />
            // <></>
          )}
        </View>
        {loadingProd ? (
          <View style={styles.scrollContain}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listStyle}>
            {filteredData
              .filter((product) =>
                product.name.toUpperCase().includes(searchText.toUpperCase()),
              )
              .map((product, i) => {
                // console.log(product)
                return (
                  <ProductCard
                    key={i}
                    navigation={props.navigation}
                    product={product}
                    category={''}
                  />
                );
              })}
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        style={styles.command}
        onPress={() => props.navigation.navigate("Mes achats")}>
        <AntDesign name="CodeSandbox" size={30} color="#11A0C1" />
        <Text
          style={{
            fontSize: 10,
            textAlign: 'center',
            color: '#11A0C1',
            fontWeight: 'bold',
          }}>
          Commandes
        </Text>
      </TouchableOpacity>
    </BackImage>
  );
};

export default StoreHome;

const styles = StyleSheet.create({
  header: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    height: '86%',
    width: '100%',
    backgroundColor: 'rgba(17, 160, 193, .7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  search: {
    // height: 120,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: "blue",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    // alignItems:'baseline'
  },
  list: {
    height: '80%',
    flex: 1,
    margin: 10,
    marginBottom: 10,
  },
  listStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
  },
  inputView: {
    flexDirection: 'row',
    height: 50,
  },
  TextInput: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    paddingLeft: 20,
    fontSize: 18,
  },
  icon: {
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  scrollContain: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 4,
  },
  command: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
