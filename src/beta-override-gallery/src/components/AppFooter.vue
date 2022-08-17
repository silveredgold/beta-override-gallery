<template>
<n-space item-style="display: flex; align-items: center;" justify="space-between">
                    <!-- <n-thing :title="override.owner"></n-thing> -->
                    <n-tag size="medium" :bordered="false">Beta Override Gallery</n-tag>
                </n-space>
</template>
<script setup lang="ts">
import { NTag, NSpace, NIcon, type MenuOption } from "naive-ui";
import { Open, Refresh, Alert, Help } from "@vicons/ionicons5";
import { computed, toRefs, ref, type Ref, onMounted, h, type Component } from "vue";
import { RouterLink } from 'vue-router'
import {
    LaptopOutline as WorkIcon,
    LogOutOutline as HomeIcon
} from '@vicons/ionicons5'
import iconSrc from '../assets/logo.svg'

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
        icon: renderIcon(HomeIcon)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'list'
                    }
                },
                { default: () => 'Override List' }
            ),
        key: 'override-list',
        icon: renderIcon(WorkIcon)
    }
]
</script>