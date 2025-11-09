import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();

  const [avatar] = useState(require("../assets/images/Profile.png"));
  const [name, setName] = useState("");

  const getUserObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("little-lemon-user");
      if (jsonValue !== null) {
        const userData = JSON.parse(jsonValue);
        setName(userData.name || "");
      }
    } catch (e) {
      console.error("An error occur in fetching name and email: ", e);
    }
  };

  useEffect(() => {
    getUserObject();
  }, []);

  return (
    <View className="flex-row justify-between items-center px-4 py-4 bg-white border-b border-[#E5E5E5]">
      {route.name === "profile" ? (
        <TouchableOpacity
          className="py-2 px-2 -ml-2"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-base font-semibold text-[#495E57]">← Back</Text>
        </TouchableOpacity>
      ) : (
        <View className="w-16" />
      )}

      {/* Logo */}
      <View className="flex-1 items-center">
        <Link href="/">
          <Image
            source={require("../assets/images/Logo.png")}
            resizeMode="cover"
            className="w-42 h-10"
          />
        </Link>
      </View>

      {avatar ? (
        route.name !== "profile" ? (
          <Link href="/profile" asChild>
            <TouchableOpacity className="ml-2">
              <Image
                source={avatar}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Link>
        ) : (
          <Image
            source={avatar}
            className="w-12 h-12 rounded-full ml-2"
            resizeMode="cover"
          />
        )
      ) : (
        <View className="w-12 h-12 bg-[#E5E5E5] items-center justify-center rounded-full border-2 border-[#495E57] ml-2">
          <Text className="text-base font-bold text-[#495E57]">
            {name[0] + name[1]}
          </Text>
        </View>
      )}
    </View>
  );
}
