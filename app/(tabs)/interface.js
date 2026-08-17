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
    backgroundColor: "#e0c2e2",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#a185a3",
  },
  subtitle: {
    fontSize: 14,
    color: "#0c203d",
    marginTop: 8,
  },
});