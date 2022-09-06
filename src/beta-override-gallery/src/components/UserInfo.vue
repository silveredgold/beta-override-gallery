<template>
<n-thing v-if="currentUser != undefined">Logged in as {{currentUser}}</n-thing>
</template>
<script setup lang="ts">
import { NThing } from "naive-ui";
import { onMounted, ref, type Ref } from 'vue';

const currentUser: Ref<string|undefined> = ref(undefined);

onMounted(async () => {
    let resp = await fetch('/api/profile');
    if (resp.status == 200) {
        try {
        let json = await resp.json();
        currentUser.value = json.username
        } catch {
            console.debug('invalid response from profile endpoint, likely not signed in!');
        }
    }
})
</script>