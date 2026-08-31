import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
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

export default function JogosCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [desenvolvedora, setDesenvolvedora] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarJogo() {
    if (
      !titulo.trim() ||
      !genero.trim() ||
      !plataforma.trim() ||
      !anoLancamento.trim() ||
      !desenvolvedora.trim()
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    const ano = Number(anoLancamento);

    if (isNaN(ano)) {
      Alert.alert(
        "Ano inválido",
        "Digite o ano de lançamento somente com números."
      );
      return;
    }

    try {
      setEnviando(true);

      const novoJogo = {
        title: titulo.trim(),
        imageUrl: imagemUrl.trim() || null,
        genero: genero.trim(),
        plataforma: plataforma.trim(),
        ano_lancamento: ano,
        desenvolvedora: desenvolvedora.trim(),
      };

      const resposta = await api.post(
        "/api/jogos",
        novoJogo
      );

      Alert.alert(
        "Jogo criado! 🎮",
        `${resposta.data.title} foi cadastrado com sucesso!`
      );

      setTitulo("");
      setImagemUrl("");
      setGenero("");
      setPlataforma("");
      setAnoLancamento("");
      setDesenvolvedora("");
    } catch (error) {
      Alert.alert(
        "Erro ao criar jogo",
        error.response?.data?.message ||
          "A API recusou o cadastro. Confira os campos e tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎮 Criar jogo
          </Text>

          <Text style={styles.subtitulo}>
            Cadastre um novo jogo
          </Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.tituloFormulario}>
            ➕ Novo jogo
          </Text>

          <Text style={styles.label}>
            Título *
          </Text>

          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Minecraft"
            placeholderTextColor="#A98BC0"
          />

          <Text style={styles.label}>
            URL da imagem
          </Text>

          <TextInput
            style={styles.input}
            value={imagemUrl}
            onChangeText={setImagemUrl}
            placeholder="Cole o link da imagem"
            placeholderTextColor="#A98BC0"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />

          {imagemUrl.trim() !== "" && (
            <View style={styles.previewContainer}>
              <Text style={styles.previewTitulo}>
                Prévia da imagem
              </Text>

              <Image
                source={{
                  uri: imagemUrl.trim(),
                }}
                style={styles.previewImagem}
                resizeMode="cover"
              />
            </View>
          )}

          <Text style={styles.secao}>
            🎮 Informações do jogo
          </Text>

          <Text style={styles.label}>
            Gênero *
          </Text>

          <TextInput
            style={styles.input}
            value={genero}
            onChangeText={setGenero}
            placeholder="Ex: Sandbox"
            placeholderTextColor="#A98BC0"
          />

          <Text style={styles.label}>
            Plataforma *
          </Text>

          <TextInput
            style={styles.input}
            value={plataforma}
            onChangeText={setPlataforma}
            placeholder="Ex: PlayStation"
            placeholderTextColor="#A98BC0"
          />

          <Text style={styles.label}>
            Ano de lançamento *
          </Text>

          <TextInput
            style={styles.input}
            value={anoLancamento}
            onChangeText={setAnoLancamento}
            placeholder="Ex: 2011"
            placeholderTextColor="#A98BC0"
            keyboardType="numeric"
          />

          <Text style={styles.label}>
            Desenvolvedora *
          </Text>

          <TextInput
            style={styles.input}
            value={desenvolvedora}
            onChangeText={setDesenvolvedora}
            placeholder="Ex: Mojang"
            placeholderTextColor="#A98BC0"
          />

          <Pressable
            style={[
              styles.botao,
              enviando && styles.botaoDesativado,
            ]}
            onPress={criarJogo}
            disabled={enviando}
          >
            {enviando ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />

                <Text style={styles.botaoTexto}>
                  Enviando...
                </Text>
              </>
            ) : (
              <Text style={styles.botaoTexto}>
                ➕ Criar jogo
              </Text>
            )}
          </Pressable>
        </View>
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

  formulario: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
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

  tituloFormulario: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6B3A8F",
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#76558C",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#D8BCEB",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#6B3A8F",
    backgroundColor: "#FCF9FF",
  },

  secao: {
    fontSize: 14,
    fontWeight: "800",
    color: "#7B4BA3",
    marginTop: 20,
    marginBottom: 5,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5D1F5",
  },

  previewContainer: {
    marginTop: 15,
  },

  previewTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#76558C",
    marginBottom: 8,
  },

  previewImagem: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#E5D1F5",
  },

  botao: {
    backgroundColor: "#7B4BA3",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 20,

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
    fontSize: 15,
    fontWeight: "800",
  },
});

