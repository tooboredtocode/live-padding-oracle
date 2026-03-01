<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const theme = useTheme()

useHead({
  bodyAttrs: {
    "data-theme": theme.reactive()
  }
})

function listener(event: MediaQueryListEvent) {
  theme.set(event.matches)
}

let queryObj: MediaQueryList;

onMounted(() => {
  queryObj = window.matchMedia('(prefers-color-scheme: dark)')
  theme.set(queryObj.matches)
  queryObj.addEventListener('change', listener);
})

onUnmounted(() => {
  queryObj.removeEventListener('change', listener);
})
</script>