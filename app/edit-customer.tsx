import { Link } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditCustomer() {
  const [name, setName] = useState("");
  const [customers, setCustomers] = useState<string[]>([]);
  
  const handleUpdateCustomer = () => {

  }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const customers = await AsyncStorage.getItem("customers");
  //       setCustomers(customers ? JSON.parse(customers) : []);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await AsyncStorage.setItem("customers", JSON.stringify(customers));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, [customers]);

  return (
    <SafeAreaView className="p-2">
      <Text>Editcustomer</Text>

      <Link href="/">Home</Link>
      <Link href="/account-preference">account preference</Link>
      
      <TextInput
        placeholder="Enter customer name"
        className="border"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button
        title="add"
        onPress={() => {
          setCustomers([...customers, name]);
          setName("");
        }}
      />

      <Text>Customers:</Text>
      {customers.map((cus) => (
        <Text key={cus}>{cus}</Text>
      ))}
    </SafeAreaView>
  );
}
