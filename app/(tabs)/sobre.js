import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/foto.png")}
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>Sobre mim</Text>

      <Text style={styles.subtitle}>
        Informações pessoais e Objetivos
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quem sou eu?</Text>

        <Text style={styles.cardText}>
          Sou estudante de Desenvolvimento de Sistemas no SENAI. Adoro criar
          interfaces modernas e aprender novas tecnologias.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Objetivo</Text>

        <Text style={styles.cardText}>
          Meu objetivo é cursar Direito, construir uma carreira na área
          jurídica e conquistar meus sonhos através dos meus estudos e
          dedicação.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert("Contato", "Enviando mensagem!")
          }
        >
          <Text style={styles.primaryButtonText}>
            Entrar em Contato
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            Alert.alert(
              "Linkedin",
              "Abrindo perfil do Linkedin..."
            )
          }
        >
          <Text style={styles.secondaryButtonText}>
            Meu Linkedin
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5EEFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#7B4BA3",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5D1F5",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#6B3A8F",
  },

  subtitle: {
    fontSize: 14,
    color: "#76558C",
    marginBottom: 24,
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    fontWeight: "800",
    color: "#6B3A8F",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: "#76558C",
    lineHeight: 20,
    marginTop: 4,
  },

  buttonContainer: {
    width: "100%",
    gap: 12,
    marginTop: 8,
  },

  primaryButton: {
    backgroundColor: "#7B4BA3",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",

    shadowColor: "#6B3A8F",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#7B4BA3",
  },

  secondaryButtonText: {
    color: "#7B4BA3",
    fontSize: 16,
    fontWeight: "800",
  },
});

