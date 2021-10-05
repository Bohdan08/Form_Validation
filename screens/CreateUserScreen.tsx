import { StatusBar } from "expo-status-bar";
import { Formik, Form, Field, FormikProps } from "formik";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import { ErrorMessage } from "../components";
import Firebase from "../config/firebase";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CreateUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is Required"),
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Full Name is required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export default function SignupScreen({ navigation }: any) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [userExists, setUserExists] = useState(false);

  // get reference to our collection
  const dbRef = Firebase.firestore().collection("users");

  const onCreateUser = async ({
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
        initialValues={{ fullName: "", phone: "", username: "" }}
        validationSchema={CreateUserSchema}
        onSubmit={onCreateUser}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Field name="username" style={styles.formField}>
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <View>
                  {meta.touched && meta.error && (
                    <Text style={styles.textError}>{meta.error}</Text>
                  )}
                  <input type="text" placeholder="Username" {...field} />
                </View>
              )}
            </Field>

            <Field name="fullName">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <View style={styles.formField}>
                  {meta.touched && meta.error && (
                    <Text style={styles.textError}>{meta.error}</Text>
                  )}
                  <input type="text" placeholder="Full Name" {...field} />
                </View>
              )}
            </Field>

            <Field name="phone">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }: any) => (
                <View style={styles.formField}>
                  {meta.touched && meta.error && (
                    <Text style={styles.textError}>{meta.error}</Text>
                  )}
                  <input type="tel" placeholder="Phone " {...field} />
                </View>
              )}
            </Field>
            <button type="submit">Submit</button>

            {userExists ? (
              <ErrorMessage
                error={"User with this username already exists."}
                visible={true}
              />
            ) : null}
          </Form>
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
  formField: {
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 5,
    paddingBottom: 5,
    height: "30px",
  },
  textError: {
    color: "red",
  },
});
