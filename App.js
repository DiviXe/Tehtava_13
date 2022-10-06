import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import * as Contacts from "expo-contacts";
import React, { useState } from "react";
export default function App() {
  const [contacts, setContacts] = useState([]);

  //jostain syystä ongelmia tuon contacts[0].phoneNumbers[0].number komennon kanssa, item..phoneNumbers[0].number ei toiminut.

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
        console.log(data);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={getContacts}>
          <Text>Get contacts</Text>
        </TouchableOpacity>
        <View style={styles.listStyle}>
          <Text style={styles.heading}>Contact list</Text>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.list}>
                {item.name} {contacts[0].phoneNumbers[0].number}
              </Text>
            )}
          />
        </View>

        <StatusBar style="auto" />
        <StatusBar hidden={true} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  button: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "gray",
    borderWidth: 2,
  },
  heading: {
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  listStyle: {
    marginTop: 30,
    width: "60%",
    alignItems: "center",
  },
  list: {
    margin: 5,
  },
});
