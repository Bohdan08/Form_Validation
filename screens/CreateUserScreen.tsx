import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";

const isAnyFieldEmpty = (fields: string[]) =>
  fields.filter((field) => field === "").length > 0;

export default function SignupScreen({ navigation }: any) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [userExists, setUserExists] = useState(false);

  // get reference to our collection
  const dbRef = Firebase.firestore().collection("users");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async ({
    fullName,
    phone,
    username,
  }: {
    fullName: string;
    phone: string;
    username: string;
  }) => {
    try {
      const usernameRef = dbRef.doc(username);

      Firebase.firestore().runTransaction((tx) => {
        return tx.get(usernameRef).then((userDoc) => {
          // check if user exists
          if (userDoc.exists) {
            setUserExists(true);
            return;
          } else {
            setUserExists(false);
            dbRef
              .doc(username)
              .set({ phone, username, fullName })
              .then(() => navigation.navigate("Home", { username }));
          }
        });
      });
    } catch (error) {
      console.log(error);
      // setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Create a unique user</Text>
      <Formik
        onSubmit={onHandleSignup}
        initialValues={{ fullName: "", phone: "", username: "" }}
      >
        {({ handleBlur, setFieldValue, handleSubmit, values }) => (
          <View>
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              leftIcon="human"
              placeholder="Enter username"
              autoCapitalize="none"
              keyboardType="username"
              textContentType="username"
              autoFocus={true}
              value={values.username}
              onChangeText={(value: string) => setFieldValue("username", value)}
              onBlur={handleBlur("username")}
            />
            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              leftIcon="email"
              placeholder="Enter Full Name"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="fullName"
              autoFocus={true}
              value={values.fullName}
              onChangeText={(value: string) => setFieldValue("fullName", value)}
            />

            <InputField
              inputStyle={{
                fontSize: 14,
              }}
              containerStyle={{
                backgroundColor: "#fff",
                marginBottom: 20,
              }}
              leftIcon="lock"
              placeholder="Enter Phone Number"
              autoCapitalize="none"
              textContentType="phone"
              value={values.phone}
              onChangeText={(value: string) => setFieldValue("phone", value)}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            {userExists ? (
              <ErrorMessage
                error={"User with this username already exists."}
                visible={true}
              />
            ) : null}

            <Button
              onPress={handleSubmit}
              backgroundColor="#f57c00"
              title="Sign Up"
              titleColor="#fff"
              titleSize={20}
              containerStyle={{
                marginBottom: 24,
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    alignSelf: "center",
    paddingBottom: 24,
  },
});
