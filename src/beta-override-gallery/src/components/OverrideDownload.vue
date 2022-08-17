<template>
    <n-tooltip>
        <template #trigger>
            <n-button type="primary" v-on:click="startDownload"><slot>{{ label }}</slot></n-button>
        </template>
        <n-thing title="Download the override file for this override">
            This will download the <code>betaoverride</code> file for this override. You can then install the override
            using the Overrides screen in Beta Protection.
            <template #footer>
                Make sure you have, or know how to get, the unlock key before you install a new override!
            </template>
        </n-thing>
    </n-tooltip>

</template>
<script setup lang="ts">
import type { IExtensionPreferences } from "@/shared/types";
import type { IOverride } from "@silveredgold/beta-shared/preferences/types";
import { NTooltip, NButton, NThing } from "naive-ui";
import { saveAs } from "file-saver";
import { toRefs } from "vue";

const props = withDefaults(defineProps<{ override: IOverride<IExtensionPreferences>, name: string, label?: string }>(), {
    label: 'Download Override File'
});

const { override, name, label } = toRefs(props);

const getName: (name: string) => string = (name: string) => {
    return name.replace(/[\s\.]/, '_');
}

const startDownload = async () => {
    var blob = new Blob([JSON.stringify(override.value, null, 2)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, getName(name.value) + ".betaoverride", { autoBom: true });
};
</script>