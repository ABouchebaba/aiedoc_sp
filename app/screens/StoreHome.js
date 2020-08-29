import {AntDesign, Entypo} from '@expo/vector-icons';
import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BackImage,
  CategoriesFilter,
  CategoryBar,
  MarketHeader,
  ProductCard,
} from '../components';
import {getCategories, getProducts} from '../Store/actions';

// const {width, height} = Dimensions.get('window');
const ITEM_HEIGHT = 250;

const StoreHome = (props) => {
  const dispatch = useDispatch();
  const {products, categories, loadingCat, loadingProd} = useSelector(
    (state) => state.store,
  );

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nbLoad, setNbLoad] = useState(5);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getCategories());
    dispatch(getProducts());
    setRefreshing(false);
  }, [dispatch]);

  function searchByCategory(cat) {
    console.log('The CAT ', cat)
    if (cat !== '') {
      setSelectedCategory(cat);
      setFilteredData(
        products.filter((product) => product.category._id === cat),
      );
    } else {
      setSelectedCategory('');
      setFilteredData(products);
    }
  }

  function sortAZ(sorted) {
    if (sorted) {
      setFilteredData(_.orderBy(filteredData, ['name'], ['asc']));
    } else {
      setFilteredData(_.orderBy(filteredData, ['name'], ['desc']));
    }
  }

  const renderItem = useCallback(
    ({item}) => <ProductCard navigation={props.navigation} product={item} />,
    [],
  );

  const keyExtractor = useCallback((product) => product._id, []);

  const getItemHeight = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  function sortPrice(sorted) {
    if (sorted) {
      setFilteredData(_.orderBy(filteredData, ['price'], ['asc']));
    } else {
      setFilteredData(_.orderBy(filteredData, ['price'], ['desc']));
    }
  }
  // let finalData = filteredData;

  /* if (searchText.legth > 0)
    finalData = filteredData.filter((product) =>
      product.name.toUpperCase().includes(searchText.toUpperCase()),
    ); */

  //finalData = filteredData.slice(0, nbLoad);

  return (
    <BackImage source={require('../../assets/bg/bgMarket.png')}>
      <View style={styles.header}>
        <MarketHeader navigation={props.navigation} />
      </View>
      <View style={styles.mainView}>
        <View style={styles.search}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Recherche sur AieDoc boutique"
              value={searchText}
              style={styles.TextInput}
              onChangeText={(e) => setSearchText(e)}
            />
            <View style={styles.icon}>
              {searchText.length > 0 && (
                <Entypo
                  name="squared-cross"
                  size={30}
                  color="black"
                  onPress={() => setSearchText('')}
                />
              )}
            </View>
          </View>
          {loadingCat ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <CategoriesFilter
              categories={categories}
              filter={searchByCategory}
              sortAZ={sortAZ}
              sortPrice={sortPrice}
            />
          )}
        </View>
        {selectedCategory.length > 0 && (
          <View style={styles.categoryBar}>
            {!loadingCat && (
              <CategoryBar
                categories={categories}
                selected={selectedCategory}
                filter={searchByCategory}
              />
            )}
          </View>
        )}
        <View style={styles.scrollContain}>
          {loadingProd ? (
            <ActivityIndicator size="large" color="black" />
          ) : filteredData.length > 0 ? (
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listStyle}
              numColumns={2}
              refreshing={refreshing}
              initialNumToRender={10}
              maxToRenderPerBatch={8}
              windowSize={5}
              removeClippedSubviews
              columnWrapperStyle={{justifyContent: 'space-between'}}
              onRefresh={onRefresh}
              data={filteredData.filter((product) =>
                product.name.toUpperCase().includes(searchText.toUpperCase()),
              )}
              getItemHeight={getItemHeight}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          ) : (
            <>
              <Text style={{color: '#11A0C1', fontSize: 30, paddingBottom:50}}>
                Aucun produit trouvé
              </Text>
              <Image
                source={require('../../assets/empty_store.png')}
                style={{width: 100, height: 100, resizeMode: 'contain'}}
              />
            </>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.command}
        onPress={() => props.navigation.navigate('Mes achats')}>
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
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    height: '90%',
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  search: {
    // height: 120,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    zIndex: 9999,
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
    flex: 1,
    margin: 10,
    marginBottom: 10,
    // minHeight: 100,
  },
  listStyle: {
    // height: 500,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
    // backgroundColor:'red'
  },
  inputView: {
    flexDirection: 'row',
    height: 45,
  },
  TextInput: {
    backgroundColor: '#fff',
    flex: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    elevation: 5,
    paddingLeft: 10,
    fontSize: 15,
    color: 'grey',
  },
  icon: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    elevation: 5,
    backgroundColor: '#Fff',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    padding: 5,
  },
  categoryBar: {
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 4,
  },
  scrollContain: {
    height: '75%',
    flex: 1,
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
