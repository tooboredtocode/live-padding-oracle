<script setup lang="ts">
let props = defineProps<{
  block: Array<number>;
  blockCfg: { size: number; width: number; }
  tabCfg?: null | "block" | "bytes";
  position: { x: number; y: number; };
  hideContent?: boolean;
}>();

let tabCfg = computed(() =>  props.tabCfg ?? null);
let tabBlock = computed(() => tabCfg.value === "block");
let tabBytes = computed(() => tabCfg.value === "bytes");

let hideContent = computed(() => props.hideContent ?? false);

defineEmits<{
  'block-keydown': [e: KeyboardEvent]
  'byte-keydown': [e: KeyboardEvent, index: number]
}>();

function displayBlock(index: number) {
  if (hideContent.value) {
    return "??";
  } else {
    return props.block[index].toString(16).toUpperCase().padStart(2, '0');
  }
}
</script>

<template>
  <foreignObject :x="position.x" :y="position.y" :width="blockCfg.width" height="20">
    <div
        class="byte-block"
        @keydown="e => $emit('block-keydown', e)"
        :tabindex="tabBlock ? 0 : ''"
        :class="tabBlock ? 'byte-block-selectable' : ''"
    >
      <div
          v-for="i in blockCfg.size"
          :key="i"
          :tabindex="tabBytes ? 0 : ''"
          @keydown="e => $emit('byte-keydown', e, i - 1)"
          :class="tabBytes ? 'byte-block-selectable' : ''"
      >0x{{ displayBlock(i-1) }}</div>
    </div>
  </foreignObject>
</template>

<style lang="scss">
.byte-block {
  width: 100%;
  height: 100%;
  background: var(--primary);
  border-radius: 5px;
  padding: 2px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    line-height: 1.25;
    padding-left: 1px;
    padding-right: 1px;
    border-radius: 3px;
    cursor: default;
  }
}

div.byte-block-selectable {
  cursor: pointer;

  &:focus {
    outline: none;
    background: var(--accent);
  }
}
</style>