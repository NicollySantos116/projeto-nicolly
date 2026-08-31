import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lessons = [
  "Criar componentes reutilizáveis",
  "Consumir APIs com fetch",
  "Organizar navegação por arquivos",
  "Trabalhar com estado e formulários",
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Text style={styles.title}>
          Sugestão de trilha
        </Text>

        <Text style={styles.description}>
          Esta aba já pode servir como ponto de partida para exercícios e
          atividades práticas.
        </Text>

        <View style={styles.list}>
          {lessons.map((lesson, index) => (
            <View key={lesson} style={styles.listItem}>

              <Text style={styles.badge}>
                {index + 1}
              </Text>

              <Text style={styles.listText}>
                {lesson}
              </Text>

            </View>
          ))}
        </View>

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
    gap: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6B3A8F",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#76558C",
  },

  list: {
    gap: 12,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 18,
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

  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: "center",
    lineHeight: 32,
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    backgroundColor: "#7B4BA3",
  },

  listText: {
    flex: 1,
    fontSize: 15,
    color: "#6B3A8F",
  },
});

