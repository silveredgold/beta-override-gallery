<template>
<n-card size="huge" title="Login Required" style="max-width: 50vw; margin:auto;" :segmented="{
      content: true,
      footer: 'soft'
    }">
    <template #header-extra>
        <n-avatar round :size="48"><n-icon :component="LockClosed" /></n-avatar>
    </template>
    You need to login to view the page you requested! Login with the options below to continue.
    <template #action>
        <n-space :vertical="false" item-style="display: flex;" justify="end" :wrap="false" >
            <n-button size="large" color="#5865F2" @click="startLogin">
                <template #icon>
                    <n-icon :component="LogoDiscord" />
                </template>
                Login with Discord
            </n-button>
        </n-space>
    </template>

</n-card>
</template>
<script setup lang="ts">
import { NCard, NIcon, NAvatar, NSpace, NButton } from "naive-ui";
import { LockClosed, LogoDiscord } from "@vicons/ionicons5";

const startLogin = () => {
    window.open('/api/auth/discord');
}
</script>