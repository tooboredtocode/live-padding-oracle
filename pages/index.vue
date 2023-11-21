<script setup lang="ts">
import type {Ref} from "vue";

let MAX_BLOCK_SIZE = 4; // can be changed to 16 later

let blockSize = 4; // should be dynamic later
let blockWidth = blockSize * 40;

let hideClearMsg = ref(true);

let zeroingIV: Ref<Array<number>> = ref(new Array(MAX_BLOCK_SIZE).fill(0));
function zeroingIVHandler(e: KeyboardEvent, index: number) {
  let action = useKeyboardListener(e);
  switch (action.ty) {
    case "Modify":
      zeroingIV.value[index] += action.value;
      zeroingIV.value[index] += 256;
      zeroingIV.value[index] %= 256;
      break;
    case "Replace":
      zeroingIV.value[index] <<= 4;
      zeroingIV.value[index] += action.value;
      zeroingIV.value[index] %= 256;
      break;
    case "Delete":
      zeroingIV.value[index] >>= 4;
      break;
  }
}

let padding = ref(0);
let paddingVec = computed(() => {
  let vec = new Array(blockSize).fill(0);
  for (let i = 0; i < padding.value; i++) {
    vec[blockSize - 1 - i] = padding.value;
  }
  return vec;
});
function paddingHandler(e: KeyboardEvent) {
  let action = useKeyboardListener(e);
  switch (action.ty) {
    case "Modify":
      padding.value = Math.min(padding.value + action.value, blockSize);
      break;
    case "Replace":
      padding.value = action.value > blockSize ? blockSize : action.value;
      break;
    case "Delete":
      padding.value = 0;
      break;
  }
}

let evilIV = createComputedArray(blockSize, (i) => zeroingIV.value[i] ^ paddingVec.value[i]);

let clearMsg = ref(new Array(MAX_BLOCK_SIZE).fill(0).map(() => Math.floor(Math.random() * 256)));
let iv = ref(new Array(MAX_BLOCK_SIZE).fill(0).map(() => Math.floor(Math.random() * 256)));
let cipher_msg = ref(new Array(MAX_BLOCK_SIZE).fill(0).map(() => Math.floor(Math.random() * 256)));

let useEvilIV = ref(true);

let receivedIV = createComputedArray(blockSize, (i) => iv.value[i] ^ (useEvilIV.value ? evilIV.value[i] : 0));
let receivedMsg = createComputedArray(blockSize, (i) => clearMsg.value[i] ^ iv.value[i] ^ receivedIV.value[i]);

let hasValidPadding = computed(() => {
  let padding = receivedMsg.value[receivedMsg.value.length - 1];
  if (padding > blockSize || padding === 0) {
    return false;
  }

  for (let i = 0; i < padding; i++) {
    if (receivedMsg.value[receivedMsg.value.length - 1 - i] !== padding) {
      return false;
    }
  }

  return true;
});
</script>

<template>
  <div id="index-page">
    <svg :viewBox="`0 0 ${blockWidth * 4.5} 500`" class="cbc">
      <ByteBlock
          :block="zeroingIV"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          tab-cfg="bytes"
          :position="{ x: 0, y: 210 }"
          @byte-keydown="zeroingIVHandler"
      />
      <ByteBlock
          :block="paddingVec"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          tab-cfg="block"
          :position="{ x: 0, y: 270 }"
          @block-keydown="paddingHandler"
      />

      <circle :cx="blockWidth / 2" cy="250" r="5" stroke="var(--text)" stroke-width="1" fill="none" />
      <line :x1="blockWidth / 2" y1="230" :x2="blockWidth / 2" y2="270" stroke="var(--text)" stroke-width="1" />
      <line :x1="(blockWidth / 2) - 5" y1="250" :x2="blockWidth * 1.2" y2="250" stroke="var(--text)" stroke-width="1" />

      <ByteBlock
          :block="evilIV"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          :position="{ x: blockWidth * 1.2, y: 240 }"
      />

      <!-- Encryption Part -->

      <ByteBlock
          :block="clearMsg"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          :position="{ x: blockWidth * 3.5, y: 0 }"
          :hide-content="hideClearMsg"
          @click="hideClearMsg = !hideClearMsg"
      />
      <ByteBlock
          :block="iv"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          :position="{ x: blockWidth * 2.3, y: 50 }"
      />

      <circle :cx="blockWidth * 4" cy="60" r="5" stroke="var(--text)" stroke-width="1" fill="none" />
      <line :x1="blockWidth * 4" y1="20" :x2="blockWidth * 4" y2="105" stroke="var(--text)" stroke-width="1" />
      <line :x1="blockWidth * 3.3" y1="60" :x2="blockWidth * 4 + 5" y2="60" stroke="var(--text)" stroke-width="1" />

      <foreignObject :x="blockWidth * 4 - 20" y="105" width="40" height="40">
        <div id="crypt-block">E</div>
      </foreignObject>

      <line :x1="blockWidth * 4" y1="145" :x2="blockWidth * 4" y2="190" stroke="var(--text)" stroke-width="1" />

      <ByteBlock
          :block="cipher_msg"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          :position="{ x: blockWidth * 3.5, y: 190 }"
      />

      <line :x1="blockWidth * 4" y1="210" :x2="blockWidth * 4" y2="290" stroke="var(--text)" stroke-width="1" stroke-dasharray="4" />

      <ByteBlock
          :block="cipher_msg"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          :position="{ x: blockWidth * 3.5, y: 290 }"
      />

      <line :x1="blockWidth * 4" y1="310" :x2="blockWidth * 4" y2="355" stroke="var(--text)" stroke-width="1" />

      <foreignObject :x="blockWidth * 4 - 20" y="355" width="40" height="40">
        <div id="crypt-block">D</div>
      </foreignObject>

      <circle :cx="blockWidth * 4" cy="440" r="5" stroke="var(--text)" stroke-width="1" fill="none" />
      <line :x1="blockWidth * 4" y1="395" :x2="blockWidth * 4" y2="480" stroke="var(--text)" stroke-width="1" />
      <line :x1="blockWidth * 3.3" y1="440" :x2="blockWidth * 4 + 5" y2="440" stroke="var(--text)" stroke-width="1" />

      <ByteBlock
          :block="receivedIV"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          :position="{ x: blockWidth * 2.3, y: 430 }"
      />

      <ByteBlock
          :block="receivedMsg"
          :block-cfg="{ size: blockSize, width: blockWidth }"
          :position="{ x: blockWidth * 3.5, y: 480 }"
          :hide-content="hideClearMsg"
          @click="hideClearMsg = !hideClearMsg"
          :class="hasValidPadding ? 'valid-padding' : hideClearMsg ? 'invalid-padding' : ''"
      />

      <!-- botched transmission -->
      <line :x1="blockWidth * 2.8" y1="70" :x2="blockWidth * 2.8" y2="430" stroke="var(--text)" stroke-width="1" stroke-dasharray="4" />

      <line :x1="blockWidth * 2.2" y1="250" :x2="blockWidth * 2.8" y2="250" :stroke="useEvilIV ? 'var(--primary)' : 'var(--text)'" stroke-width="1" />
      <circle
          :cx="blockWidth * 2.8" cy="250" r="5" :stroke="useEvilIV ? 'var(--primary)' : 'var(--text)'" stroke-width="1" fill="var(--text)"
          @click="useEvilIV = !useEvilIV"
      />
      <line :x1="blockWidth * 2.8" y1="245" :x2="blockWidth * 2.8" y2="255" :stroke="useEvilIV ? 'var(--primary)' : 'var(--text)'" stroke-width="1" />
      <line :x1="blockWidth * 2.8 - 5" y1="250" :x2="blockWidth * 2.8 + 5" y2="250" :stroke="useEvilIV ? 'var(--primary)' : 'var(--text)'" stroke-width="1" />
    </svg>
  </div>
</template>

<style lang="scss">
@use "@/assets/css/variables.scss" as var;

#index-page {
  height: 100%;
  width: 100%;
  overflow: auto;

  @include var.desktopOnly {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.cbc {
  margin: 2.5% 2rem;
  height: 95%;
  font-family: "Source Code Pro", monospace;
  font-size: 14px;

  @include var.desktopOnly {
    margin: initial;
    height: initial;
    max-height: 95%;
    max-width: 90%;
  }
}

#crypt-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: var(--secondary);
}

.valid-padding .byte-block {
  background: var(--correct);
}
.invalid-padding .byte-block {
  background: var(--incorrect);
}
</style>