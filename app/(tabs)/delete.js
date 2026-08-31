import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY =
  "cv_K-15DB4PmOWZWGhClgdWjWzS204DvXSgtKAIyQQv0LdgsTHYL6If0F7yohGAJz8_";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosExcluirScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [excluindoId, setExcluindoId] = useState(null);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await api.get("/api/jogos", {
        params: {
          limit: 50,
        },
      });

      setJogos(resposta.data.data || []);
    } catch (e) {
      setErro(
        "Não foi possível carregar os jogos. Tente de novo em instantes."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  function confirmarExclusao(jogo) {
    Alert.alert(
      "Excluir jogo",
      `Tem certeza que quer excluir "${jogo.title}"? Essa ação não pode ser desfeita.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirJogo(jogo.id),
        },
      ]
    );
  }

  async function excluirJogo(id) {
    setExcluindoId(id);

    try {
      await api.delete(`/api/jogos/${id}`);

      setJogos((atual) =>
        atual.filter((item) => item.id !== id)
      );
    } catch (e) {
      Alert.alert(
        "Não deu pra excluir o jogo",
        "A API respondeu com erro. Tente de novo em instantes."
      );
    } finally {
      setExcluindoId(null);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎮 Excluir jogos
          </Text>

          <Text style={styles.subtitulo}>
            Excluir jogos cadastrados na API
          </Text>
        </View>

        {carregando && (
          <ActivityIndicator
            style={{ marginVertical: 16 }}
            color="#7B4BA3"
          />
        )}

        {erro && (
          <Text style={styles.erro}>
            {erro}
          </Text>
        )}

        {!carregando &&
          jogos.map((item) => (
            <View
              key={item.id}
              style={styles.card}
            >
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.imagem}
                />
              ) : (
                <View style={styles.semImagem}>
                  <Text style={styles.semImagemTexto}>
                    🎮
                  </Text>
                </View>
              )}

              <View style={styles.info}>
                <Text style={styles.titulo}>
                  {item.title}
                </Text>

                <Text style={styles.categoria}>
                  {item.genero} · {item.plataforma}
                </Text>

                <Text style={styles.ano}>
                  {item.ano_lancamento} · {item.desenvolvedora}
                </Text>
              </View>

              <Pressable
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(item)}
                disabled={excluindoId === item.id}
              >
                <Text style={styles.botaoExcluirTexto}>
                  {excluindoId === item.id
                    ? "..."
                    : "Excluir"}
                </Text>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5EEFF",
  },

  conteudo: {
    padding: 24,
    paddingBottom: 48,
  },

  header: {
    marginBottom: 16,
  },

  tituloPagina: {
    fontSize: 24,
    fontWeight: "800",
    color: "#6B3A8F",
  },

  subtitulo: {
    fontSize: 14,
    color: "#76558C",
    marginTop: 2,
  },

  erro: {
    color: "#A33A8E",
    marginTop: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    paddingRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  imagem: {
    width: 64,
    height: 64,
    backgroundColor: "#E5D1F5",
  },

  semImagem: {
    width: 64,
    height: 64,
    backgroundColor: "#E5D1F5",
    justifyContent: "center",
    alignItems: "center",
  },

  semImagemTexto: {
    fontSize: 24,
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B3A8F",
  },

  categoria: {
    fontSize: 13,
    color: "#76558C",
    marginTop: 3,
  },

  ano: {
    fontSize: 12,
    color: "#8A6AA0",
    marginTop: 3,
  },

  botaoExcluir: {
    backgroundColor: "#7B4BA3",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  botaoExcluirTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});
