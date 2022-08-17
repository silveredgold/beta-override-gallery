<template><slot></slot></template>
<script setup lang="ts">
import { provide } from 'vue';
import { OverrideChannelClient, overrideProviderKey } from './override-provider';


provide(overrideProviderKey, new OverrideChannelClient());
</script>