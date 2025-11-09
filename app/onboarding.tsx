import HeroSection from "@/components/hero-section";
import Navbar from "@/components/nav-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoardingScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useRouter();

  // Validation functions
  const isValidName = useMemo(() => {
    // Check if name is not empty and contains only letters and spaces
    return name.trim().length > 0 && /^[a-zA-Z\s]+$/.test(name);
  }, [name]);

  const isValidEmail = useMemo(() => {
    // Check if email is properly formatted
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, [email]);

  const isFormValid = isValidName && isValidEmail;

  const handleNext = async () => {
    setLoading(true);
    if (isFormValid) {
      try {
        const jsonValue = JSON.stringify({ name, email });
        await AsyncStorage.setItem("little-lemon-user", jsonValue);
        navigate.push("/");
      } catch (e) {
        setLoading(false);
        console.error("An error occur in creating name and email: ", e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {/* bg-white */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          <Navbar />

          <HeroSection />

          {/* Welcome Text */}
          <View className="px-6 mt-8 mb-6">
            <Text className="text-2xl font-bold text-[#495E57] mb-2">
              Let us get to know you
            </Text>
            <Text className="text-base text-[#666]">
              Please enter your information to get started
            </Text>
          </View>

          {/* Form inputs */}
          <View className="flex-1 px-6">
            <View className="mb-5">
              <Text className="text-base font-semibold mb-2 text-[#495E57]">
                Name *
              </Text>
              <TextInput
                className={`border rounded-xl p-4 text-base bg-[#F9F9F9] ${
                  !isValidName && name.length > 0
                    ? "border-[#d32f2f] border-2"
                    : "border-[#E5E5E5]"
                }`}
                placeholder="Enter your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
              {!isValidName && name.length > 0 && (
                <Text className="text-[#d32f2f] text-sm mt-2">
                  Please enter a valid name (letters only)
                </Text>
              )}
            </View>

            <View className="mb-5">
              <Text className="text-base font-semibold mb-2 text-[#495E57]">
                Email *
              </Text>
              <TextInput
                className={`border rounded-xl p-4 text-base bg-[#F9F9F9] ${
                  !isValidEmail && email.length > 0
                    ? "border-[#d32f2f] border-2"
                    : "border-[#E5E5E5]"
                }`}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {!isValidEmail && email.length > 0 && (
                <Text className="text-[#d32f2f] text-sm mt-2">
                  Please enter a valid email address
                </Text>
              )}
            </View>
          </View>

          {/* Next button at the bottom */}
          <View className="px-6 pb-8 pt-4">
            <TouchableOpacity
              className={`rounded-xl p-4 items-center ${
                isFormValid && !loading ? "bg-[#495E57]" : "bg-[#E0E0E0]"
              }`}
              onPress={handleNext}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text
                  className={`text-lg font-bold ${
                    isFormValid ? "text-white" : "text-[#999]"
                  }`}
                >
                  Next
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
