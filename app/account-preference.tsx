import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";

export default function AccountPreference() {
  const [preferences, setPreferences] = useState([
    { id: "noti", label: "Push Notifications", value: false },
    { id: "emails", label: "Marketing Emails", value: false },
    { id: "latestNews", label: "Latest News", value: false },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const keys = await AsyncStorage.multiGet(
          preferences.map((pref) => pref.id)
        );

        const valuesMap = keys.reduce<{ [key: string]: boolean }>(
          (acc, curr) => {
            if (curr[0] && curr[1] !== null) acc[curr[0]] = JSON.parse(curr[1]);
            return acc;
          },
          {}
        );

        setPreferences((prev) =>
          prev.map((pref) => ({
            ...pref,
            value: valuesMap[pref.id] ?? pref.value,
          }))
        );
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    })();
  }, []);

  const togglePreference = async (id: string) => {
    setPreferences((prev) => {
      const updatedPreferences = prev.map((pref) =>
        pref.id === id ? { ...pref, value: !pref.value } : pref
      );

      (async () => {
        try {
          const keyValues: [string, string][] = updatedPreferences.map(
            (pref) => [pref.id, JSON.stringify(pref.value)]
          );
          await AsyncStorage.multiSet(keyValues);
        } catch (error) {
          console.error("Error saving preferences:", error);
        }
      })();

      return updatedPreferences;
    });
  };

  return (
    <View>
      <Link href="/">Home</Link>
      <Link href="/edit-customer" className="border-b">
        add customer
      </Link>

      {preferences.map((pref) => (
        <View
          key={pref.id}
          className="flex-row justify-between items-center mb-4"
        >
          <Text>{pref.label}</Text>
          <Switch
            value={pref.value}
            onValueChange={() => togglePreference(pref.id)}
          />
        </View>
      ))}
    </View>
  );
}
