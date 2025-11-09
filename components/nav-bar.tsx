import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();

  const [avatar] = useState(require("../assets/images/Profile.png"));
  const [firstName] = useState("John");

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
            source={require("../assets/images/pasta.jpg")}
            contentFit="cover"
            className="w-32 h-10"
          />
        </Link>
      </View>

      {avatar ? (
        route.name !== "profile" ? (
          <Link href="/profile" asChild>
            <TouchableOpacity className="ml-2">
              <Image
                source={avatar}
                className="w-12 h-12 rounded-full border-2 border-[#495E57]"
                contentFit="cover"
              />
            </TouchableOpacity>
          </Link>
        ) : (
          <Image
            source={avatar}
            className="w-12 h-12 rounded-full border-2 border-[#495E57] ml-2"
            contentFit="cover"
          />
        )
      ) : (
        <View className="w-12 h-12 bg-[#E5E5E5] items-center justify-center rounded-full border-2 border-[#495E57] ml-2">
          <Text className="text-base font-bold text-[#495E57]">
            {firstName && firstName[0]}
          </Text>
        </View>
      )}
    </View>
  );
}
