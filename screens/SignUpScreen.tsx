import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Button as RNButton } from "react-native";

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";

const auth = Firebase.auth();

const isAnyFieldEmpty = (fields: string[]) =>
  fields.filter((field) => field === "").length > 0;

export default function SignupScreen({ navigation }: any) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

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
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      if (!isAnyFieldEmpty([email, password, username])) {
        await auth.createUserWithEmailAndPassword(email, password).then(() =>
          dbRef.add({
            username,
            email,
          })
        );
      } else {
        setSignupError("All fields should be filled out.");
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        onSubmit={onHandleSignup}
        initialValues={{ email: "", password: "", username: "" }}
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
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              value={values.email}
              onChangeText={(value: string) => setFieldValue("email", value)}
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
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={passwordVisibility}
              textContentType="password"
              rightIcon={rightIcon}
              value={values.password}
              onChangeText={(value: string) => setFieldValue("password", value)}
              handlePasswordVisibility={handlePasswordVisibility}
            />
            {signupError ? (
              <ErrorMessage error={signupError} visible={true} />
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
            <RNButton
              onPress={() => navigation.navigate("Login")}
              title="Sign In"
              color="#e93b81"
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
