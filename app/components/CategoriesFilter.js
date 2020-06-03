import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export const CategoriesFilter = (props) => {
  const categories = props.categories.filter(
    (cat) => cat.level === "SubSubFamilly"
  );
  const [category, setCategory] = useState("");
  const [sorted, setSorted] = useState(false);
  const [sortedPrice, setSortedPrice] = useState(false);

  function sort() {
    props.sortAZ(!sorted);
    setSorted(!sorted);
  }

  function sortPrice() {
    props.sortPrice(!sortedPrice);
    setSortedPrice(!sortedPrice);
  }

  function filter(value) {
    // console.log("value", value);
    setCategory(value);
    props.filter(value);
  }

  // console.log(categories)
  return (
    <View style={styles.container}>
      <View style={{ width: "75%" }}>
        <RNPickerSelect
          placeholder={{ label: "Catégorie...", value: "", color: "blue" }}
          value={category}
          useNativeAndroidPickerStyle={false}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: "30%",
              left: "90%",
            },
          }}
          onValueChange={(value) => filter(value)}
          items={categories.map((x) => ({
            label: x.name,
            value: x._id,
          }))}
          Icon={() => (
            <MaterialCommunityIcons
              name={"filter-variant"}
              size={24}
              color="gray"
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "25%",
        }}
      >
        {!sorted ? (
          <TouchableOpacity style={styles.Icon} onPress={sort}>
            <FontAwesome name={"sort-alpha-asc"} size={30} color="#11A0C1" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ ...styles.Icon, backgroundColor: "#05596C" }}
            onPress={sort}
          >
            <FontAwesome name={"sort-alpha-desc"} size={30} color="white" />
          </TouchableOpacity>
        )}
        {!sortedPrice ? (
          <TouchableOpacity style={styles.Icon} onPress={sortPrice}>
            <FontAwesome name={"sort-amount-asc"} size={30} color="gold" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{...styles.Icon, backgroundColor:'gold'}} onPress={sortPrice}>
            <FontAwesome name={"sort-amount-desc"} size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scroll: {
    height: 70,
  },
  scrollContain: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 4,
  },
  filter: {
    borderRadius: 50,
    height: 35,
    width: 80,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginRight: 10,
  },
  filterText: {
    color: "#4EC7E6",
    fontSize: 18,
  },
  Icon: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 5,
    // marginVertical: 10,
    borderRadius: 10,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    color: "#0F95B9",
    paddingRight: 100, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "white",
    fontSize: 18,
    // width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
    // borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 20,
    color: "#0F95B9",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
