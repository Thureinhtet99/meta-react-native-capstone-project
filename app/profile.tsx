import Navbar from "@/components/nav-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const [avatar, setAvatar] = useState(require("../assets/images/Profile.png"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState({
    orderStatus: true,
    password: true,
    specialOffers: false,
    newsletter: false,
  });

  const getUserObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("little-lemon-user");
      if (jsonValue !== null) {
        const userData = JSON.parse(jsonValue);
        setName(userData.name || "");
        setEmail(userData.email || "");
      }
    } catch (e) {
      console.error("An error occur in fetching name and email: ", e);
    }
  };

  useEffect(() => {
    getUserObject();
  }, []);

  const handleAvatarChange = () => {
    // Implement image picker logic here
  };

  const handleAvatarRemove = () => {
    setAvatar("");
  };

  return (
    <SafeAreaView className="flex-1">
      {/* bg-white */}
      <Navbar />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
        {/* Card */}
        <View className="p-6">
          <Text className="font-bold text-2xl mb-6 text-[#495E57]">
            Personal information
          </Text>

          <Text className="font-semibold text-base mt-2 mb-3 text-[#495E57]">
            Avatar
          </Text>
          <View className="flex-row items-center mb-6">
            {avatar ? (
              <Image
                source={avatar}
                style={{ width: 80, height: 80 }}
                resizeMode="cover"
                className="rounded-full mr-4"
              />
            ) : (
              <View
                style={{ width: 80, height: 80 }}
                className="bg-[#E5E5E5] mr-4 items-center justify-center rounded-full border-2 border-[#495E57]"
              >
                <Text className="text-2xl font-bold text-[#495E57]">
                  {name}
                </Text>
              </View>
            )}
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="bg-[#495E57] px-5 py-2 rounded-lg"
                onPress={handleAvatarChange}
              >
                <Text className="text-white font-semibold">Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border border-[#495E57] px-5 py-2 rounded-lg bg-white"
                onPress={handleAvatarRemove}
              >
                <Text className="text-[#495E57] font-semibold">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="font-semibold text-base mt-2 mb-2 text-[#495E57]">
            Name
          </Text>
          <TextInput
            className="border border-[#E5E5E5] rounded-xl p-4 text-base bg-[#F9F9F9] mb-4"
            value={name}
            onChangeText={setName}
          />

          <Text className="font-semibold text-base mt-2 mb-2 text-[#495E57]">
            Email
          </Text>
          <TextInput
            className="border border-[#E5E5E5] rounded-xl p-4 text-base bg-[#F9F9F9] mb-4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text className="font-semibold text-base mt-2 mb-2 text-[#495E57]">
            Phone number
          </Text>
          <TextInput
            className="border border-[#E5E5E5] rounded-xl p-4 text-base bg-[#F9F9F9] mb-4"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text className="font-semibold text-lg mt-6 mb-3 text-[#495E57]">
            Email notifications
          </Text>
          <View className="mb-6">
            <CustomCheckbox
              label="Order statuses"
              value={notifications.orderStatus}
              onValueChange={(v) =>
                setNotifications({ ...notifications, orderStatus: v })
              }
            />
            <CustomCheckbox
              label="Password changes"
              value={notifications.password}
              onValueChange={(v) =>
                setNotifications({ ...notifications, password: v })
              }
            />
            <CustomCheckbox
              label="Special offers"
              value={notifications.specialOffers}
              onValueChange={(v) =>
                setNotifications({ ...notifications, specialOffers: v })
              }
            />
            <CustomCheckbox
              label="Newsletter"
              value={notifications.newsletter}
              onValueChange={(v) =>
                setNotifications({ ...notifications, newsletter: v })
              }
            />
          </View>

          <TouchableOpacity className="bg-[#F4CE14] rounded-xl py-4 items-center mb-6 mt-2">
            <Text className="text-[#333] font-bold text-lg">Log out</Text>
          </TouchableOpacity>

          <View className="flex-row justify-between gap-3 mb-6">
            <TouchableOpacity className="flex-1 border-2 border-[#495E57] rounded-xl py-4 items-center bg-white">
              <Text className="text-[#495E57] font-semibold text-base">
                Discard changes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-[#495E57] rounded-xl py-4 items-center">
              <Text className="text-white font-semibold text-base">
                Save changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Custom Checkbox component
function CustomCheckbox({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center mb-3"
      onPress={() => onValueChange(!value)}
    >
      <View
        className={`w-[22px] h-[22px] border-2 border-[#495E57] rounded-md mr-3 items-center justify-center ${value ? "bg-[#495E57]" : "bg-white"}`}
      >
        {value && <Text className="text-white font-bold text-base">✓</Text>}
      </View>
      <Text className="text-base text-[#495E57]">{label}</Text>
    </TouchableOpacity>
  );
}
