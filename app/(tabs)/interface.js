import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao app!</Text>

      <Text style={styles.subtitle}>
        Sua primeira interface em React Native
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EEFF",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#6B3A8F",
  },

  subtitle: {
    fontSize: 14,
    color: "#76558C",
    marginTop: 8,
  },
});
