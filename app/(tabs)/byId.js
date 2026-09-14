import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY =
  "cv_K-15DB4PmOWZWGhClgdWjWzS204DvXSgtKAIyQQv0LdgsTHYL6If0F7yohGAJz8_";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

export default function JogosBuscarScreen() {
  const [id, setId] = useState("");
  const [jogo, setJogo] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  async function buscarPorId() {
    if (!id.trim()) {
      setErro("Digite um id para buscar.");
      return;
    }

    Keyboard.dismiss();
    setBuscando(true);
    setErro(null);
    setNaoEncontrado(false);
    setJogo(null);

    try {
      const resposta = await api.get(`/api/jogos/${id}`);

      setJogo(resposta.data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setNaoEncontrado(true);
      } else {
        setErro(
          "Não foi possível buscar o jogo. Tente de novo em instantes."
        );
      }
    } finally {
      setBuscando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎮 Buscar jogo
          </Text>

          <Text style={styles.subtitulo}>
            GET /api/jogos/:id
          </Text>
        </View>

        <Text style={styles.rotulo}>
          Id do jogo
        </Text>

        <View style={styles.linhaBusca}>
          <TextInput
            style={styles.campo}
            value={id}
            onChangeText={setId}
            placeholder="Ex: 1"
            placeholderTextColor="#A98BC0"
            keyboardType="numeric"
          />

          <Pressable
            style={styles.botao}
            onPress={buscarPorId}
            disabled={buscando}
          >
            <Text style={styles.botaoTexto}>
              {buscando ? "..." : "Buscar"}
            </Text>
          </Pressable>
        </View>

        {buscando && (
          <ActivityIndicator
            color="#7B4BA3"
            style={{ marginVertical: 16 }}
          />
        )}

        {erro && (
          <Text style={styles.erro}>
            {erro}
          </Text>
        )}

        {naoEncontrado && (
          <Text style={styles.avisoNaoEncontrado}>
            Nenhum jogo encontrado com o id "{id}".
          </Text>
        )}

        {jogo && (
          <View style={styles.card}>
            <Image
              source={{ uri: jogo.imageUrl }}
              style={styles.imagem}
            />

            <View style={styles.info}>
              <Text style={styles.titulo}>
                {jogo.title}
              </Text>

              <Text style={styles.categoria}>
                {jogo.genero} · {jogo.plataforma}
              </Text>

              <Text style={styles.descricao}>
                {jogo.descricao}
              </Text>
            </View>
          </View>
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

  conteudo: {
    padding: 24,
    paddingBottom: 48,
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

  rotulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#76558C",
    marginBottom: 6,
  },

  linhaBusca: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  campo: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: "#D8BCEB",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FCF9FF",
    color: "#6B3A8F",
    fontSize: 14,
  },

  botao: {
    backgroundColor: "#7B4BA3",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoTexto: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  erro: {
    color: "#C62828",
    marginTop: 12,
  },

  avisoNaoEncontrado: {
    color: "#9A6700",
    marginTop: 16,
    fontStyle: "italic",
  },

  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5D1F5",
    elevation: 3,
    shadowColor: "#8E5BB7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  imagem: {
    width: 100,
    height: 110,
    backgroundColor: "#E5D1F5",
  },

  info: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
    paddingRight: 12,
    gap: 4,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "800",
    color: "#6B3A8F",
  },

  categoria: {
    fontSize: 13,
    color: "#7B4BA3",
  },

  descricao: {
    fontSize: 13,
    color: "#76558C",
  },
});