import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
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

export default function JogosEditarScreen() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [selecionado, setSelecionado] = useState(null);

  const [nome, setNome] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [descricao, setDescricao] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function buscarJogos() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await api.get("/api/jogos", {
        params: { limit: 50 },
      });

      setJogos(resposta.data.data);
    } catch (e) {
      setErro(
        "Não foi possível carregar os jogos. Tente novamente em instantes."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarJogos();
  }, []);

  function selecionarJogo(jogo) {
    setSelecionado(jogo);
    setNome(jogo.title ?? "");
    setImagemUrl(jogo.imageUrl ?? "");
    setGenero(jogo.genero ?? "");
    setPlataforma(jogo.plataforma ?? "");
    setDescricao(jogo.descricao ?? "");
  }

  async function salvarEdicao() {
    if (!selecionado) return;

    if (!nome.trim()) {
      Alert.alert("Atenção", "Preencha pelo menos o nome do jogo.");
      return;
    }

    setSalvando(true);

    try {
      const resposta = await api.put(
        `/api/jogos/${selecionado.id}`,
        {
          title: nome.trim(),
          imageUrl: imagemUrl.trim(),
          genero: genero.trim(),
          plataforma: plataforma.trim(),
          descricao: descricao.trim(),
        }
      );

      Alert.alert(
        "Jogo atualizado! 🎮",
        resposta.data.data.title
      );

      setSelecionado(null);
      buscarJogos();
    } catch (e) {
      Alert.alert(
        "Erro ao atualizar",
        "A API respondeu com erro. Confira os campos e tente novamente."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎮 Editar jogo
          </Text>

          <Text style={styles.subtitulo}>
            PUT /api/jogos/:id
          </Text>
        </View>

        {!selecionado && (
          <>
            <Text style={styles.instrucao}>
              Toque em um jogo para editar:
            </Text>

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
                <Pressable
                  key={item.id}
                  style={styles.linha}
                  onPress={() => selecionarJogo(item)}
                >
                  <Text style={styles.linhaTitulo}>
                    {item.title}
                  </Text>

                  <Text style={styles.linhaSeta}>
                    editar ›
                  </Text>
                </Pressable>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable
              onPress={() => setSelecionado(null)}
              style={styles.voltar}
            >
              <Text style={styles.voltarTexto}>
                ‹ voltar para lista
              </Text>
            </Pressable>

            <Text style={styles.rotulo}>
              Nome do jogo
            </Text>

            <TextInput
              style={styles.campo}
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Minecraft"
              placeholderTextColor="#A98BC0"
            />

            <Text style={styles.rotulo}>
              URL da imagem
            </Text>

            <TextInput
              style={styles.campo}
              value={imagemUrl}
              onChangeText={setImagemUrl}
              placeholder="Cole o link da imagem"
              placeholderTextColor="#A98BC0"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
            />

            <Text style={styles.rotulo}>
              Gênero
            </Text>

            <TextInput
              style={styles.campo}
              value={genero}
              onChangeText={setGenero}
              placeholder="Ex: Aventura"
              placeholderTextColor="#A98BC0"
            />

            <Text style={styles.rotulo}>
              Plataforma
            </Text>

            <TextInput
              style={styles.campo}
              value={plataforma}
              onChangeText={setPlataforma}
              placeholder="Ex: PC, PlayStation, Xbox"
              placeholderTextColor="#A98BC0"
            />

            <Text style={styles.rotulo}>
              Descrição
            </Text>

            <TextInput
              style={[styles.campo, styles.campoDescricao]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Digite uma descrição do jogo"
              placeholderTextColor="#A98BC0"
              multiline
            />

            <Pressable
              style={[
                styles.botao,
                salvando && styles.botaoDesativado,
              ]}
              onPress={salvarEdicao}
              disabled={salvando}
            >
              {salvando ? (
                <>
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />

                  <Text style={styles.botaoTexto}>
                    Salvando...
                  </Text>
                </>
              ) : (
                <Text style={styles.botaoTexto}>
                  🎮 Salvar alterações
                </Text>
              )}
            </Pressable>
          </>
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
    marginBottom: 20,
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

  instrucao: {
    fontSize: 15,
    color: "#76558C",
    marginBottom: 10,
  },

  erro: {
    color: "#C62828",
    marginTop: 12,
  },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5D1F5",
    elevation: 2,
  },

  linhaTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B3A8F",
  },

  linhaSeta: {
    fontSize: 13,
    color: "#7B4BA3",
    fontWeight: "700",
  },

  voltar: {
    marginBottom: 20,
  },

  voltarTexto: {
    color: "#7B4BA3",
    fontWeight: "700",
    fontSize: 15,
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#76558C",
    marginBottom: 5,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#D8BCEB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 14,
    backgroundColor: "#FCF9FF",
    color: "#6B3A8F",
    fontSize: 14,
  },

  campoDescricao: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  botao: {
    backgroundColor: "#7B4BA3",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 6,

    shadowColor: "#6B3A8F",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  botaoTexto: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
});