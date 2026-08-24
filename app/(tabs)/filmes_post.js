import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
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
    "Content-Type": "application/json",
  },
});

export default function FilmesPost() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [diretor, setDiretor] = useState("");
  const [duracaoMinutos, setDuracaoMinutos] = useState("");
  const [genero, setGenero] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarFilme() {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Digite o título do filme.");
      return;
    }

    if (!descricao.trim()) {
      Alert.alert("Atenção", "Digite a descrição do filme.");
      return;
    }

    if (!imagemUrl.trim()) {
      Alert.alert("Atenção", "Digite a URL da imagem.");
      return;
    }

    if (!diretor.trim()) {
      Alert.alert("Atenção", "Digite o diretor.");
      return;
    }

    if (!duracaoMinutos.trim()) {
      Alert.alert("Atenção", "Digite a duração do filme.");
      return;
    }

    const duracao = Number(duracaoMinutos);

    if (Number.isNaN(duracao) || duracao <= 0) {
      Alert.alert(
        "Atenção",
        "Digite uma duração válida em minutos."
      );
      return;
    }

    if (!genero.trim()) {
      Alert.alert("Atenção", "Digite o gênero do filme.");
      return;
    }

    const dadosFilme = {
      title: titulo.trim(),
      description: descricao.trim(),
      imageUrl: imagemUrl.trim(),
      diretor: diretor.trim(),
      duracao_minutos: duracao,
      genero: genero.trim(),
    };

    console.log("DADOS ENVIADOS:", dadosFilme);

    setEnviando(true);

    try {
      const resposta = await api.post(
        "/api/filmes",
        dadosFilme
      );

      console.log(
        "FILME CRIADO:",
        resposta.data
      );

      Alert.alert(
        "Sucesso! 🎬",
        `O filme "${titulo}" foi cadastrado com sucesso!`
      );

      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setDiretor("");
      setDuracaoMinutos("");
      setGenero("");
    } catch (error) {
      console.log(
        "ERRO AO CADASTRAR:",
        error.response?.data || error.message
      );

      console.log(
        "STATUS:",
        error.response?.status
      );

      if (error.response?.status === 400) {
        Alert.alert(
          "Erro 400",
          "Os dados enviados são inválidos. Confira todos os campos."
        );
      } else if (error.response?.status === 401) {
        Alert.alert(
          "Erro 401",
          "A chave da API não foi aceita."
        );
      } else if (error.response?.status === 404) {
        Alert.alert(
          "Erro 404",
          "A rota /api/filmes não foi encontrada."
        );
      } else if (error.response?.status === 429) {
        Alert.alert(
          "Erro 429",
          "Limite de requisições atingido. Tente novamente mais tarde."
        );
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível cadastrar o filme."
        );
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>
            🎬 Criar filme
          </Text>

          <Text style={styles.subtitulo}>
            POST /api/filmes
          </Text>
        </View>

        {/* TÍTULO */}

        <Text style={styles.rotulo}>
          Título
        </Text>

        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: As Branquelas"
          placeholderTextColor="#94a3b8"
        />

        {/* DESCRIÇÃO */}

        <Text style={styles.rotulo}>
          Descrição
        </Text>

        <TextInput
          style={[
            styles.campo,
            styles.campoDescricao,
          ]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição do filme..."
          placeholderTextColor="#94a3b8"
          multiline
        />

        {/* IMAGEM */}

        <Text style={styles.rotulo}>
          URL da imagem
        </Text>

        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="https://exemplo.com/imagem.jpg"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />

        <Text style={styles.secao}>
          Informações do filme
        </Text>

        {/* DIRETOR */}

        <Text style={styles.rotulo}>
          Diretor
        </Text>

        <TextInput
          style={styles.campo}
          value={diretor}
          onChangeText={setDiretor}
          placeholder="Ex: Keenen Ivory Wayans"
          placeholderTextColor="#94a3b8"
        />

        {/* DURAÇÃO */}

        <Text style={styles.rotulo}>
          Duração em minutos
        </Text>

        <TextInput
          style={styles.campo}
          value={duracaoMinutos}
          onChangeText={setDuracaoMinutos}
          placeholder="Ex: 109"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
        />

        {/* GÊNERO */}

        <Text style={styles.rotulo}>
          Gênero
        </Text>

        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Comédia"
          placeholderTextColor="#94a3b8"
        />

        {/* BOTÃO */}

        <Pressable
          style={[
            styles.botao,
            enviando && styles.botaoDesativado,
          ]}
          onPress={criarFilme}
          disabled={enviando}
        >
          <Text style={styles.botaoTexto}>
            {enviando
              ? "Cadastrando..."
              : "Cadastrar filme"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },

  conteudo: {
    padding: 24,
    paddingBottom: 50,
  },

  header: {
    marginBottom: 20,
  },

  tituloPagina: {
    fontSize: 26,
    fontWeight: "800",
    color: "#102542",
  },

  subtitulo: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },

  secao: {
    fontSize: 15,
    fontWeight: "700",
    color: "#102542",
    marginTop: 8,
    marginBottom: 10,
  },

  rotulo: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 5,
  },

  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 13,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#102542",
  },

  campoDescricao: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  botao: {
    backgroundColor: "#1565c0",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});