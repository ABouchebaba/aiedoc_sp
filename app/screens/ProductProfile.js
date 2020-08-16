import {Entypo} from '@expo/vector-icons';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BACKEND_URL} from 'react-native-dotenv';
import DropdownAlert from 'react-native-dropdownalert';
import GallerySwiper from 'react-native-gallery-swiper';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import {BackImage, MarketHeader} from '../components';
import DatePicker from '../components/DatePicker';
import {addToCart} from '../Store/actions';

const {width, height} = Dimensions.get('window');
const today = new Date();
const ProductProfile = ({route, navigation}) => {
  const {product} = route.params;
  const alert = useRef(null);
  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.store.categories);
  const [option, setOption] = useState('');
  const [from, setFrom] = useState(today.toISOString().slice(0, 10));
  const [to, setTo] = useState('');

  const isRentable = (cat, rentKey = 'Locations') => {
    // deep copy of cat
    let category = JSON.parse(JSON.stringify(cat));
    while (category.parent != null) {
      category = categories.find((c) => c._id === category.parent);
    }
    return category.name === rentKey;
  };

  const rent = isRentable(product.category);

  const disabled = rent
    ? from === '' || to === '' || (product.options.length > 1 && option === '')
    : product.options.length > 1 && option === '';

  function _addToCart() {
    let myDate;
    if (rent) {
      myDate = new Date(new Date(from).getTime() + to * 24 * 60 * 60 * 1000);
    }

    const productAdd = {
      product_id: product._id,
      product_name: product.name,
      brand: product.brand,
      qty: 1,
      option: option,
      price: product.price * (1 - product.discount / 100),
      from: rent ? from : null,
      to: rent ? myDate.toISOString().slice(0, 10) : null,
    };

    dispatch(addToCart(productAdd, cart));
    // dispatch(removeProduct(product._id, cart));
    alert.current.alertWithType(
      'success',
      'Ajouté',
      `${product.name} ajouté au panier.`,
    );
  }

  return (
    <BackImage source={require('../../assets/bg/bgMarket.png')}>
      <View style={styles.header}>
        <MarketHeader />
      </View>
      <ScrollView style={styles.mainView}>
        <View style={styles.search}>
          <GallerySwiper
            style={{flex: 1, paddingVertical: 10, backgroundColor: 'white'}}
            images={
              product.images.length > 0
                ? product.images.map((image) => ({
                    uri: BACKEND_URL + '/' + image,
                    dimensions: {width: 200, height: 200},
                  }))
                : [
                    {
                      source: require('../../assets/product.jpg'),
                      dimensions: {width: 300, height: 300},
                    },
                  ]
            }
            initialNumToRender={2}
            // Turning this off will make it feel faster
            // and prevent the scroller to slow down
            // on fast swipes.
            sensitiveScroll={true}
          />
        </View>
        <Text style={styles.name}>
          {product.name.replace(/(\r\n|\n|\r)/gm, '').slice(0, 40)}
        </Text>
        <Text style={styles.brand}>
          {product.brand.toUpperCase().replace(/(\r\n|\n|\r)/gm, '')}
        </Text>
        {product.rating > 0 && (
          <View style={styles.ratingView}>
            {[...Array(5)].map((x, i) =>
              product.rating > i ? (
                <Entypo key={i} name="star" size={20} color="#D6C41F" />
              ) : (
                <Entypo key={i} name="star" size={20} color="white" />
              ),
            )}
            <Text style={{color: '#D6C41F', fontWeight: 'bold'}}>
              ({product.rating})
            </Text>
          </View>
        )}
        <View style={styles.buy}>
          <Text style={styles.name}>
            {product.price * (1 - product.discount / 100)} DA
          </Text>
          <TouchableOpacity
            style={disabled ? styles.disabledbuyButton : styles.buyButton}
            onPress={_addToCart}
            disabled={disabled}>
            <Text style={disabled ? styles.disabledbuyText : styles.buyText}>
              {rent ? 'Louer' : 'Acheter'}
            </Text>
          </TouchableOpacity>
        </View>
        {rent && (
          <View style={styles.buy}>
            <View style={{width: '45%'}}>
              <Text style={styles.brand}>Date du début</Text>
              <DatePicker
                title="Début"
                onChange={setFrom}
                value={from}
                style={styles.TextInput}
                minDate={today}
              />
            </View>
            <View style={{width: '45%'}}>
              <Text style={styles.brand}>La durée</Text>
              <TextInput
                placeholder="en jours"
                onChangeText={setTo}
                keyboardType="number-pad"
                style={styles.TextInput}
              />
            </View>
          </View>
        )}
        {product.options.length > 1 && (
          <View>
            <Text style={styles.brand}>Variation</Text>
            <Picker
              selectedValue={option}
              onValueChange={(value) => setOption(value)}
              style={{
                backgroundColor: '#efefef',
                margin: 5,
              }}>
              <Picker.Item label="Select ..." value="" />
              {product.options.map((o) => (
                <Picker.Item key={o.option} label={o.option} value={o.option} />
              ))}
            </Picker>
          </View>
        )}

        <Text style={styles.brand}>Desciption</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={{paddingBottom: 30}} />
      </ScrollView>
      <DropdownAlert
        ref={alert}
        updateStatusBar={false}
        closeInterval={1000}
        elevation={3}
      />
    </BackImage>
  );
};

export default ProductProfile;

const styles = StyleSheet.create({
  header: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
  },
  mainView: {
    height: '90%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  scrollContain: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    height: 200,
    width: width,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 140,
    margin: 5,
    height: 140,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 25,
    color: 'black',
  },
  brand: {
    fontSize: 20,
    color: 'black',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buy: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buyButton: {
    backgroundColor: '#D61F2C',
    width: '50%',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledbuyButton: {
    backgroundColor: '#A0A0A0',
    width: '50%',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInput: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    borderRadius: 10,
    paddingLeft: 20,
    fontSize: 15,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buyText: {
    color: 'white',
    fontSize: 25,
  },
  disabledbuyText: {
    color: 'black',
    fontSize: 25,
  },
  description: {
    color: 'black',
    fontSize: 15,
    textAlign: 'justify',
  },
});
