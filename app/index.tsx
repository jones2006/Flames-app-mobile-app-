import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { calculateFlames } from "../app/utilis/flames";

export default function index() {
  const [fontsLoaded] = useFonts({
    "Poppins-BoldItalic": require("@/assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBoldItalic": require("@/assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  });

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");

  const getResultImage = (result: string) => {
    switch (result) {
      case "Friends":
        return require("@/assets/images/friends.png");
      case "Love":
        return require("@/assets/images/lovers.png");
      case "Affection":
        return require("@/assets/images/affention.png");
      case "Marriage":
        return require("@/assets/images/marriage.png");
      case "Enemies":
        return require("@/assets/images/enemy.png");
      case "Siblings":
        return require("@/assets/images/siblings.png");
      default:
        return null;
    }
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.image}
          />

          <View style={styles.inputview}>
            <View style={styles.input1}>
              <Text style={styles.text}>Your Name :</Text>
              <TextInput
                style={styles.inputfield}
                value={name1}
                onChangeText={setName1}
                placeholder="Enter your name"
                placeholderTextColor={"#FF9DBD"}
              />
            </View>

            <View style={styles.input1}>
              <Text style={styles.text}>Your Crush Name :</Text>
              <TextInput
                style={styles.inputfield}
                value={name2}
                onChangeText={setName2}
                placeholder="Enter crush name"
                placeholderTextColor={"#FF9DBD"}
              />
            </View>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Keyboard.dismiss();
                if (name1.trim() === "" || name2.trim() === "") {
                  Alert.alert("Missing Name", "Please enter both names.");
                  return;
                }
                setResult(calculateFlames(name1, name2));
              }}
            >
              <Text style={styles.btntxt}>Calculate</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.restxt}>Result :</Text>
          <View style={styles.resultview}>
            {result !== "" ? (
              <Image source={getResultImage(result)} style={styles.resultimg} />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 30,
                  color: "#FF9DBD",
                  fontFamily: "Poppins-BoldItalic",
                }}
              >
                Result will appear here
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: 190,
    height: 95,
    alignSelf: "center",
    marginTop: 45,
  },

  // input and text
  inputview: {
    flexDirection: "column",
    gap: 25,
    marginTop: 30,
  },
  input1: {
    flexDirection: "column",
    gap: 15,
  },
  text: {
    marginLeft: 25,
    color: "#FF4787",
    fontWeight: "bold",
    fontFamily: "Poppins-ExtraBoldItalic",
    fontSize: 18,
  },
  inputfield: {
    width: "90%",
    height: 60,
    color: "#FF4787",
    borderColor: "#FF4787",
    borderWidth: 1,
    borderBottomWidth: 2.5,
    alignSelf: "center",
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#FF4787",
    elevation: 10,
  },

  // button
  btn: {
    width: "55%",
    height: 50,
    alignSelf: "center",
    borderColor: "#FF4787",
    borderWidth: 1,
    borderBottomWidth: 2.5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btntxt: {
    color: "#FF4787",
    fontFamily: "Poppins-BoldItalic",
    fontSize: 14,
  },

  // result
  resultview: {
    borderColor: "#FF4787",
    borderWidth: 2,
    borderBottomWidth: 4.5,
    width: "90%",
    height: 300,
    marginTop: 15,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  restxt: {
    color: "#FF4787",
    fontFamily: "Poppins-BoldItalic",
    textAlign: "center",
    fontSize: 23,
    marginTop: 30,
  },
  resultimg: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
