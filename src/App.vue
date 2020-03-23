<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-ballot</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/mostrarPedidosRecibidos">
          <v-list-item-action>
            <v-icon>mdi-briefcase-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pedidos Recibidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/agregarPedido">
          <v-list-item-action>
            <v-icon>mdi-briefcase-edit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Crear Pedido</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/articuloInterfaz">
          <v-list-item-action>
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Administrar Artículos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/mostarPersonal">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Administrar Personal</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>ERP</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
