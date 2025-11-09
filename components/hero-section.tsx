import { Image, Text, View } from "react-native";

export default function HeroSection() {
  return (
    <View className="bg-[#495E57] p-4 flex-row items-center mx-4 mt-4 rounded-2xl shadow-lg">
      <View className="flex-1 pr-3">
        <Text className="text-[32px] font-bold text-[#F4CE14]">
          Little Lemon
        </Text>
        <Text className="text-[22px] font-semibold text-white">Chicago</Text>
        <Text className="text-white mt-2 text-[15px] leading-5">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
      </View>
      <Image
        source={require("../assets/images/Hero image.png")}
        className="w-24 h-28 rounded-2xl"
      />
    </View>
  );
}
