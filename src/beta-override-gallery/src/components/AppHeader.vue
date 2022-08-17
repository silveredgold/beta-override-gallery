<template>
    <n-space :vertical="false" item-style="display: flex;" justify="space-between" align="center" :wrap="false">
        <n-page-header :subtitle="extraText" style="padding-bottom: 2rem;">
            <template #header>Beta Platform</template>
            <template #title>Beta Override Gallery</template>
            <template #avatar>
                <n-avatar :src="iconSrc" />
            </template>
            <template #extra>
                
                    <!-- <n-menu mode="horizontal" :options="menuOptions" /> -->
                    <!-- <n-popover trigger="hover" placement="bottom-end">
                        <template #trigger>
                            <n-button @click="openConfig">
                                <n-icon size="30" :component="Open" />
                            </n-button>
                        </template>
                        About
                    </n-popover> -->
            </template>
            <!-- <n-grid :cols="3">
            <n-gi :span="2">

            </n-gi>
            <n-gi>

            </n-gi>
        </n-grid> -->
        </n-page-header>
        <n-space :vertical="false" item-style="display: flex;" justify="end" align="center" :wrap="false">
        <user-info />
        <n-menu mode="horizontal" :icon-size="28" :options="menuOptions" />
        <ExtensionInfo />
        </n-space>
    </n-space>
</template>
<script setup lang="ts">
import { NPageHeader, NGrid, NGi, NAvatar, NMenu, NButton, NSpace, NIcon, NPopover, NThing, type MenuOption } from "naive-ui";
import { Layers, CloudUpload, InformationCircle } from "@vicons/ionicons5";
import { computed, toRefs, ref, type Ref, onMounted, h, type Component } from "vue";
import { RouterLink } from 'vue-router'
import ExtensionInfo from "./ExtensionInfo.vue";
import iconSrc from '../assets/logo.svg'
import UserInfo from './UserInfo.vue'

const props = withDefaults(defineProps<{ title?: string }>(), { title: "Server Status Panel" });

const hostname = ref("");


const { title } = toRefs(props);

const extraText = computed(() => `A gallery of overrides for Beta Protection users.`);

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}


const openConfig = async () => {
    window.open('chrome-extension://dfkojjdnikkjlegfnckldamlhgfocgdf/override.html', '_blank')
}

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'home',
                    }
                },
                { default: () => 'Home' }
            ),
        key: 'home',
        icon: renderIcon(InformationCircle)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'upload'
                    }
                },
                { default: () => 'Upload an Override' }
            ),
        key: 'override-upload',
        icon: renderIcon(CloudUpload)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'gallery'
                    }
                },
                { default: () => 'Override Gallery' }
            ),
        key: 'override-list',
        icon: renderIcon(Layers)
    }
]
</script>