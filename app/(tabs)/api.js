import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY =
  "cv_K-15DB4PmOWZWGhClgdWjWzS204DvXSgtKAIyQQv0LdgsTHYL6If0F7yohGAJz8_";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function JogosListarScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function buscarJogos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await api.get("/api/jogos", {
        params: {
          limit: 50,
          page: 1,
        },
      });

      console.log("Resposta da API:", resposta.data);

      setJogos(resposta.data.data || []);
    } catch (error) {
      console.log(
        "Erro ao buscar jogos:",
        error.response?.data || error.message
      );

      setErro(
        "Não foi possível carregar os jogos. Tente novamente mais tarde."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  function imagemJogo(url) {
    if (!url) {
      return null;
    }

    if (url.startsWith("http")) {
      return url;
    }

    return `https://api-ds.codeverse.dev.br${url}`;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎮 Jogos
          </Text>

          <Text style={styles.subtitulo}>
            Jogos famosos e populares
          </Text>
        </View>

        {carregando && (
          <View style={styles.carregando}>
            <ActivityIndicator
              size="large"
              color="#7B4BA3"
            />

            <Text style={styles.textoCarregando}>
              Carregando jogos...
            </Text>
          </View>
        )}

        {erro !== "" && (
          <View style={styles.erroContainer}>
            <Text style={styles.erro}>
              {erro}
            </Text>

            <Pressable
              style={styles.botaoTentar}
              onPress={buscarJogos}
            >
              <Text style={styles.botaoTentarTexto}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        )}

        {!carregando &&
          erro === "" &&
          jogos.map((jogo, index) => (
            <View
              key={jogo.id || index}
              style={styles.card}
            >
              {jogo.imageUrl ? (
                <Image
                  source={{
                    uri: imagemJogo(jogo.imageUrl),
                  }}
                  style={styles.imagem}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.semImagem}>
                  <Text style={styles.semImagemTexto}>
                    🎮
                  </Text>
                </View>
              )}

              <View style={styles.info}>
                <Text style={styles.numero}>
                  Jogo #{index + 1}
                </Text>

                <Text
                  style={styles.titulo}
                  numberOfLines={2}
                >
                  {jogo.title}
                </Text>

                <Text
                  style={styles.descricao}
                  numberOfLines={2}
                >
                  {jogo.description}
                </Text>

                <Text style={styles.informacao}>
                  🏢 {jogo.estudio}
                </Text>

                <Text style={styles.informacao}>
                  🎭 {jogo.genero}
                </Text>

                <Text style={styles.informacao}>
                  🎮 {jogo.plataforma}
                </Text>
              </View>
            </View>
          ))}

        {!carregando &&
          erro === "" &&
          jogos.length === 0 && (
            <Text style={styles.semJogos}>
              Nenhum jogo encontrado.
            </Text>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5EEFF",
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    padding: 24,
    paddingBottom: 50,
  },

  header: {
    marginBottom: 18,
  },

  tituloPagina: {
    fontSize: 26,
    fontWeight: "800",
    color: "#6B3A8F",
  },

  subtitulo: {
    fontSize: 14,
    color: "#76558C",
    marginTop: 4,
  },

  carregando: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  textoCarregando: {
    marginTop: 10,
    fontSize: 14,
    color: "#76558C",
  },

  erroContainer: {
    alignItems: "center",
    marginTop: 30,
  },

  erro: {
    color: "#A33A8E",
    textAlign: "center",
    fontSize: 14,
  },

  botaoTentar: {
    marginTop: 12,
    backgroundColor: "#7B4BA3",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  botaoTentarTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",

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
    width: 105,
    height: 145,
    backgroundColor: "#E5D1F5",
  },

  semImagem: {
    width: 105,
    height: 145,
    backgroundColor: "#E5D1F5",
    justifyContent: "center",
    alignItems: "center",
  },

  semImagemTexto: {
    fontSize: 30,
  },

  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },

  numero: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7B4BA3",
    marginBottom: 3,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6B3A8F",
  },

  descricao: {
    fontSize: 12,
    color: "#76558C",
    marginTop: 5,
    lineHeight: 17,
  },

  informacao: {
    fontSize: 12,
    color: "#76558C",
    marginTop: 4,
  },

  semJogos: {
    textAlign: "center",
    color: "#76558C",
    marginTop: 30,
  },
});

