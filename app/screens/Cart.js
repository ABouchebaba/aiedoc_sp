import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  BackImage,
  CartCard,
  CartModal,
  CommandSetModal,
  MarketHeader,
} from "../components";
import {
  addCommand,
  addQuantity,
  removeProduct,
  removeQuantity,
} from "../Store/actions";

const { width, height } = Dimensions.get("window");

const Cart = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const { _id } = useSelector((state) => state.user.user);

  const [model, setModel] = useState(false);
  const [done, setDone] = useState(false);

  function close() {
    setModel(false);
  }

  function doneModal() {
    setDone(true);
    setTimeout(() => {
      navigation.navigate("StoreHome");
    }, 2000);
  }

  function remove(id, option) {
    dispatch(removeProduct(id, option, cart));
  }

  function plus(id, option) {
    dispatch(addQuantity(id, option, cart));
  }

  function minus(id, option) {
    dispatch(removeQuantity(id,option, cart));
  }

  const total = cart.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.qty * currentValue.price;
  }, 0);

  function submit(address) {
    const data = {
      // address: address.address,
      // wilaya: address.wilaya,
      // location: address.location,
      user_id: _id,
      user_type: "ServiceProvider",
      total_price: total,
      products: cart.map((product) => {
        return {
          product_id: product.product_id,
          product_name: product.product_name,
          qty: product.qty,
          option: product.option + " ",
        };
      }),
    };
    // console.log(data);
    dispatch(addCommand(data, doneModal));
    close();
  }

  return (
    <BackImage source={require("../../assets/bg/bgMarket.png")}>
      <View style={styles.header}>
        <MarketHeader />
      </View>
      <View style={styles.mainView}>
        {loading ? (
          <View style={styles.scrollContain}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : cart.length !== 0 ? (
          <>
            <Text style={styles.name}>Votre panier</Text>
            {/* <Image
              style={styles.tinyLogo}
              source={require("../../assets/cart.png")}
            /> */}
            <View style={styles.scrollNotch} />
            <ScrollView
              style={styles.list}
              contentContainerStyle={styles.listStyle}
            >
              {cart.map((product, i) => (
                <CartCard
                  remove={remove}
                  product={product}
                  plus={plus}
                  minus={minus}
                  key={i}
                />
              ))}
            </ScrollView>
            <View style={styles.totalView}>
              <Text style={styles.total}>TOTAL</Text>
              <Text style={styles.price}>{total} DA</Text>
            </View>
            <TouchableOpacity
              style={styles.confirm}
              onPress={() => setModel(true)}
            >
              <Text style={styles.confirmText}>CONFIRMER</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={{ color: "white", fontSize: 30, marginVertical: 40 }}>
              Votre panier est vide
            </Text>
            <Image source={require("../../assets/empty_cart_big.png")} />
          </>
        )}
      </View>
      <CartModal showModel={model} close={close} submit={submit} />
      <CommandSetModal done={done} close={close} />
    </BackImage>
  );
};

const styles = StyleSheet.create({
  header: {
    height: "15%",
    width: "100%",
    justifyContent: "center",
  },
  mainView: {
    height: "85%",
    width: "100%",
    backgroundColor: "rgba(17, 160, 193, .7)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  tinyLogo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  scrollNotch: {
    width: "100%",
    height: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 4,
    borderColor: "#09677D",
  },
  name: {
    fontSize: 25,
    color: "white",
    marginBottom: 10,
  },
  list: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ebebeb",
  },
  listStyle: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  totalView: {
    borderTopWidth: 4,
    borderColor: "#09677D",
    backgroundColor: "white",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%",
  },
  total: {
    textAlign: "left",
    color: "#11A0C1",
    fontSize: 20,
  },
  price: {
    textAlign: "right",
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
  },
  confirm: {
    height: 80,
    marginVertical: 20,
    borderRadius: 50,
    width: "80%",
    backgroundColor: "#D61F2C",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 30,
    color: "white",
  },
  scrollContain: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderRightWidth: 4,
    // backgroundColor: "#cadce6",
  },
});

export default Cart;
