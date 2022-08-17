<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { NConfigProvider, NNotificationProvider, NDialogProvider, NLoadingBarProvider, NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent, NGlobalStyle, type GlobalThemeOverrides, darkTheme, useOsTheme } from "naive-ui";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import AppServices from './components/AppServices.vue';
</script>

<template>
  <app-services>
    <!-- <ExtensionInfoProvider> -->
    <n-layout bordered :native-scrollbar="false" content-style="padding: 24px;" position="absolute" style="100vh;">
      <n-layout-header bordered position="absolute" style="height: 10vh; min-height: 125px; padding: 1rem;">
        <AppHeader />
      </n-layout-header>
      <n-layout-content content-style="padding: 1rem;" position="absolute" style="top: calc(10vh + 2rem);"
        :native-scrollbar="false">
        <RouterView />
      </n-layout-content>
      <!-- <n-layout-footer bordered position="absolute" style="height: 4rem; padding: 1rem;"><AppFooter /></n-layout-footer> -->
    </n-layout>
    <!-- </ExtensionInfoProvider> -->
  </app-services>
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */

.control-group {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
