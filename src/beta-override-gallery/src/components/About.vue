<template>
    <n-card size="huge" title="Beta Override Gallery" :segmented="{
        content: true,
        footer: 'soft'
    }">
        <template #header-extra>
            <n-avatar round :size="36">
                <n-icon :component="Layers" />
            </n-avatar>
        </template>
        <n-thing title="What is it?" description="">
            <n-text tag="p">The Beta Override Gallery is a simple online listing of <strong>override files</strong> for Beta Protection, the censoring browser extension.</n-text>
        </n-thing>
        <n-thing title="What is an override file?" description="">
            <n-text tag="p">Beta Protection includes support for overrides: simple files that override and lock some of the preferences in Beta Protection. This allows, for example, for enforcing censoring preferences. There's a ton more information on the <n-button @click="openDocs" tertiary type="info">Beta Protection site</n-button>.</n-text>
        </n-thing>

    </n-card>
</template>
<script setup lang="ts">
import { NCard, NAvatar, NIcon, NThing, NText, NButton } from "naive-ui";
import { Layers } from "@vicons/ionicons5";

const openDocs = () => window.open('https://silveredgold.github.io/beta-protection/guide/overrides', '_blank');
</script>
