<script setup lang="ts">
import Default from "~/layouts/default.vue";

const props = defineProps<{
  error: {
    url: string,
    statusCode: number,
    statusMessage: string,
    message: string,
    description: string,
    data: any,
  }
}>();

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

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <Default>
    <div id="error-page">
      <h1>{{ error.statusCode }}</h1>
      <p>{{ error.statusMessage }}</p>
      <button @click="handleError">Go Home</button>
    </div>
  </Default>
</template>

<style lang="scss">
#error-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 10rem;
    font-weight: 700;
    margin-bottom: -2rem;
    color: var(--primary);
  }

  p {
    margin: 0 0 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    background: var(--primary);
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;

    &:hover {
      background: var(--accent);
    }
  }
}
</style>