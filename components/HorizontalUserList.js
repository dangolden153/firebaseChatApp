import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
const data = [
  {
    id: "123",
    image: `${require("../images/pics4.jpg")}`,
    userName: "Park Hannah",
    userChat: "where are you? waitin...",
    date: "7:30 AM",
    notifications: "1",
  },

  {
    id: "1233",
    image: `${require("../images/pics7.jpg")}`,
    userName: "Deep Sankar",
    userChat: "where are you? waitin...",
    date: "7:20 AM",
    notifications: "",
  },

  {
    id: "1235d",
    image: `${require("../images/pics2.jpg")}`,
    userName: "Sonall Tonwari",
    userChat: "see you in CP!",
    date: "3 days",
    notifications: "4",
  },

  {
    id: "123sdc ",
    image: `${require("../images/pics4.jpg")}`,
    userName: "Arpit Khurana",
    userChat: "see you shortly!",
    date: "3 days",
    notifications: "",
  },

  {
    id: "1254wd3",
    image: `${require("../images/pics5.jpg")}`,
    userName: "People Design",
    userChat: "Mayank: Hey Everyo...",
    date: "7:30 AM",
    notifications: "",
  },

  {
    id: "1234tfsv3",
    image: `${require("../images/pics6.jpg")}`,
    userName: "Park Hannah",
    userChat: "where are you? waitin...",
    date: "7:30 AM",
    notifications: "1",
  },

  {
    id: "123sf4tfsv3",
    image: `${require("../images/pics7.jpg")}`,
    userName: "Park Hannah",
    userChat: "where are you? waitin...",
    date: "7:30 AM",
    notifications: "1",
  },

  {
    id: "1234eftffsv3",
    image: `${require("../images/pics.jpg")}`,
    userName: "Park Hannah",
    userChat: "where are you? waitin...",
    date: "7:30 AM",
    notifications: "1",
  },
];

const HorizontalUserList = ({ navigation }) => {
  //   const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { image, userName } }) => (
          <ScrollView>
            <TouchableOpacity
              style={styles.usercontent}
              onPress={() => navigation.navigate("ChatScreen")}
            >
              <Image
                source={image}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  borderColor: "#005CEE",
                  borderWidth: 3,
                }}
              />
              <Text numberOfLines={1} style={styles.username}>
                {userName}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
    </View>
  );
};

export default HorizontalUserList;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 0.2,
    marginVertical: 20,
    // backgroundColor: "pink",
  },
  usercontent: {
    alignItems: "center",
    marginHorizontal: 10,
  },

  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 7,
    width: 60,
  },
});
