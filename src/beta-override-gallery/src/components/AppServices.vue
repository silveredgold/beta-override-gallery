<template>
    <n-config-provider :theme-overrides="themeOverrides" :theme="theme">
        <n-global-style />
        <n-notification-provider>
            <n-dialog-provider>
                <n-message-provider>
                    <n-loading-bar-provider>
                        <slot></slot>
                    </n-loading-bar-provider>
                </n-message-provider>
            </n-dialog-provider>
        </n-notification-provider>
    </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NNotificationProvider, NDialogProvider, NMessageProvider, NLoadingBarProvider, type GlobalThemeOverrides, useOsTheme, darkTheme } from "naive-ui";
import { computed } from "vue";
const themeOverrides: GlobalThemeOverrides = { common: { fontWeightStrong: '600' }, Result: { lineHeight: '1.1', titleFontSizeSmall: '24', iconSizeSmall: '48px' } };
const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === 'dark' ? darkTheme : null))
</script>