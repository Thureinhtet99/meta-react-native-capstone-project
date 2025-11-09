import HeroSection from "@/components/hero-section";
import Navbar from "@/components/nav-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuType = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
};

const imageMap: Record<string, any> = {
  "greekSalad.jpg": require("../assets/images/greekSalad.jpg"),
  "bruschetta.jpg": require("../assets/images/bruschetta.jpg"),
  "grilledFish.jpg": require("../assets/images/grilledFish.jpg"),
  "pasta.jpg": require("../assets/images/pasta.jpg"),
  "lemonDessert.jpg": require("../assets/images/lemonDessert.jpg"),
};

export default function HomeScreen() {
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
    boolean | null
  >(null);

  const categories = useMemo(() => {
    return Array.from(new Set(menu.map((item) => item.category))).filter(
      Boolean
    );
  }, [menu]);

  const getMenuApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const json = await res.json();
      setMenu(json.menu);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("little-lemon-user");
      setHasCompletedOnboarding(userData !== null);
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setHasCompletedOnboarding(false);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
    getMenuApi();
  }, []);

  // Show loading or redirect while checking onboarding status
  if (hasCompletedOnboarding === null) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#495E57" />
      </SafeAreaView>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <SafeAreaView className="flex-1">
      {/* bg-white */}
      <Navbar />

      {/* Links */}
      <View className="px-4 py-2 bg-[#F9F9F9] border-b border-[#E5E5E5]">
        <Link
          href="/edit-customer"
          className="text-[#495E57] font-semibold py-1"
        >
          add customer
        </Link>
        <Link
          href="/account-preference"
          className="text-[#495E57] font-semibold py-1"
        >
          account preference
        </Link>
        <Link href="/onboarding" className="text-[#495E57] font-semibold py-1">
          onboarding
        </Link>
        <Link href="/profile" className="text-[#495E57] font-semibold py-1">
          profile
        </Link>
      </View>

      <FlatList
        data={menu}
        keyExtractor={(item, index) => item.name || index.toString()}
        ListHeaderComponent={() => (
          <>
            <HeroSection />

            {/* Search Box */}
            <View className="mx-4 mt-4 mb-4">
              <View className="flex-row items-center bg-[#F9F9F9] rounded-xl px-4 py-3 border border-[#E5E5E5]">
                <Text className="text-xl mr-2">🔍</Text>
                <TextInput
                  placeholder="Search menu..."
                  placeholderTextColor="#999"
                  className="flex-1 text-base bg-transparent"
                />
              </View>
            </View>

            {/* Order for Delivery */}
            <View className="py-4">
              <Text className="font-bold text-xl mx-4 mb-3 text-[#495E57]">
                ORDER FOR DELIVERY!
              </Text>

              <FlatList
                data={categories}
                keyExtractor={(cat) => cat as string}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item: cat }) => (
                  <Pressable
                    key={cat}
                    className="bg-[#F4CE14] rounded-full px-4 py-2 mr-2"
                  >
                    <Text className="font-semibold capitalize text-[#495E57]">
                      {cat}
                    </Text>
                  </Pressable>
                )}
                className="mb-4"
              />
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-16">
            <Text className="text-xl text-[#666]">
              No menu items available.
            </Text>
          </View>
        )}
        ListFooterComponent={() =>
          loading ? (
            <View className="py-4 items-center">
              <ActivityIndicator size="large" color="#495E57" />
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={(props) => (
          <View className="flex-row items-center px-4 py-4 border-b border-[#E5E5E5]">
            <View className="flex-1 pr-3">
              <Text className="font-bold text-lg text-[#333] mb-1">
                {props.item.name}
              </Text>
              <Text
                className="text-sm text-[#666] mt-1 leading-5"
                numberOfLines={2}
              >
                {props.item.description}
              </Text>
              <Text className="font-bold text-lg text-[#495E57] mt-2">
                ${props.item.price?.toFixed(2)}
              </Text>
            </View>
            <Image
              source={
                props.item.image && imageMap[props.item.image]
                  ? imageMap[props.item.image]
                  : imageMap["greekSalad.jpg"]
              }
              className="w-24 h-24 rounded-xl"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
