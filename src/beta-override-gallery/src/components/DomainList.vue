<template>
    <n-tabs type="line" animated size="small" justify-content="space-evenly">
        <n-tab-pane name="allow" tab="Allowed">
            <n-empty v-if="(allowList  || []).length == 0" description="No sites in allowed list" size="large" />
            <!-- <n-list bordered v-if="allowList && allowList.length > 0" style="margin-top: 0.25em; margin-bottom: 0.25em;">
                <n-list-item v-for="site in allowList">
                    <n-text>{{ site }}</n-text>
                </n-list-item>
            </n-list> -->
            <n-text tag="p" v-for="site in allowList"> {{site}}
            </n-text>
        </n-tab-pane>
        <n-tab-pane name="force" tab="Forced">
            <n-empty v-if="(forceList || []).length == 0" description="No sites in forced list" size="large" />
            <n-list :bordered="true" v-if="forceList && forceList.length > 0">
                <n-list-item v-for="site in forceList">
                    <n-text>{{ site }}</n-text>
                </n-list-item>
            </n-list>
        </n-tab-pane>
    </n-tabs>

</template>
<script setup lang="ts">
import { toRefs } from "vue";
import { NTabs, NTabPane, NList, NListItem, NEmpty, NText } from "naive-ui";
const props = defineProps<{ allowList?: string[], forceList?: string[] }>();

const {allowList, forceList} = toRefs(props);
</script>