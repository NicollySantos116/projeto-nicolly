import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#7B4BA3",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />

      <Tabs.Screen
        name="aulas"
        options={{
          title: "Aulas",
          headerTitle: "Conteúdo",
        }}
      />

      <Tabs.Screen
        name="interface"
        options={{
          title: "Interface",
          headerTitle: "Interface",
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "Sobre",
        }}
      />

      <Tabs.Screen
        name="api"
        options={{
          title: "API",
          headerTitle: "Conteúdo - API",
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          headerTitle: "Conteúdo - Post",
        }}
      />

      <Tabs.Screen
        name="jogosPost"
        options={{
          title: "Jogos Post",
          headerTitle: "Conteúdo - Jogos Post",
        }}
      />

      <Tabs.Screen
        name="jogosApi"
        options={{
          title: "Listar Jogos",
          headerTitle: "Conteúdo - Jogos Listar",
        }}
      />
      <Tabs.Screen
        name="delete"
        options={{
          title: "Excluir Jogos",
          headerTitle: "Conteúdo - Excluir Jogos",
        }}
      />
    </Tabs>
  );
}

