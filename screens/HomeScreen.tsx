import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";
import IconButton from "../components/IconButton";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

type User = {
  key: number;
  username: string;
  email: string;
  res: any;
};

const auth = Firebase.auth();

export default function HomeScreen({ navigation }: any) {
  const firestoreRef = Firebase.firestore().collection("users");

  const [usersData, setUsersData] = useState<User[]>([]);

  const { user } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    firestoreRef.onSnapshot(getCollection);
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const getCollection = (querySnapshot: any) => {
    const userArr: User[] = [];

    querySnapshot.forEach((res: any) => {
      const { username, email } = res.data();
      userArr.push({
        key: res.id,
        res,
        username,
        email,
      });
    });

    setUsersData(userArr);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.row}>
        <Text style={styles.title}>Welcome {user?.email}!</Text>
      </View>

      <View>
        {/* <ScrollView style={styles.container}> */}
        {usersData?.map((user: User, index: number) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{user.username}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
        {/* </ScrollView> */}
      </View>
      <View style={styles.row}>
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          text="Sign out"
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#000",
  },
});
