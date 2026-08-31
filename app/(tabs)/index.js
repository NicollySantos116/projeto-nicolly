import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const codeverseLogo = require("../../assets/codeverse-logo.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={codeverseLogo}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.eyebrow}>
            React Native + Expo Router
          </Text>

          <Text style={styles.title}>
            Seu app já nasce organizado
          </Text>

          <Text style={styles.description}>
            Estrutura pronta para o aluno focar em componentes,
            navegação e lógica de negócio desde a primeira aula.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            O que vem configurado
          </Text>

          <Text style={styles.cardItem}>
            • JavaScript habilitado
          </Text>

          <Text style={styles.cardItem}>
            • Rotas com expo-router
          </Text>

          <Text style={styles.cardItem}>
            • Abas e modal de exemplo
          </Text>

          <Text style={styles.cardItem}>
            • Scripts para Android, iOS e Web
          </Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>
              Abrir modal de exemplo
            </Text>
          </Pressable>
        </Link>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5EEFF",
  },

  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },


  hero: {
    alignItems: "center",
    gap: 10,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#B57EDC",
    borderWidth: 1,
    borderColor: "#A66BCF",
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 4,
  },

  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#F3E8FF",
    textAlign: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#F8F0FF",
    textAlign: "center",
  },

  card: {
    gap: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5D1F5",

    shadowColor: "#8E5BB7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6B3A8F",
  },

  cardItem: {
    fontSize: 15,
    color: "#76558C",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#7B4BA3",

    shadowColor: "#6B3A8F",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});