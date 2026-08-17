import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity,Alert,} from "react-native";

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
            Alert.alert("Linkedin", "Abrindo perfil do Linkedin...")
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
    backgroundColor: "#e0c2e2",
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
    borderColor: "#5c3d61",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5c3d61",
  },

  subtitle: {
    fontSize: 14,
    color: "#0c203d",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5c3d61",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginTop: 4,
  },

  buttonContainer: {
    width: "100%",
    gap: 12,
    marginTop: 8,
  },

  primaryButton: {
    backgroundColor: "#5c3d61",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#5c3d61",
  },

  secondaryButtonText: {
    color: "#5c3d61",
    fontSize: 16,
    fontWeight: "bold",
  },
});