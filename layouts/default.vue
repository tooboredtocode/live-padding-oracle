<script setup lang="ts">
const theme = useTheme()
</script>

<template>
  <div id="wrapper">
    <div id="top-bar">
      <NuxtLink to="/" id="link-home">
        <Logo id="padding-logo"/>
        <h1 id="page-title">Live Padding Oracle</h1>
        <h1 id="page-title-mobile">LPO</h1>
      </NuxtLink>
      <div class="spacer" />
      <div class="theme-toggle">
        <font-awesome-icon
            icon="fa-solid fa-sun"
            :class="{ active: theme.get() === 'light' }"
            @click="theme.setLight()"
        />
        <font-awesome-icon
            icon="fa-solid fa-moon"
            :class="{ active: theme.get() === 'dark' }"
            @click="theme.setDark()"
        />
      </div>
    </div>
    <div id="content">
      <slot />
    </div>
    <div id="footer">
      <p>Copyright &copy; 2023 <a href="https://github.com/tooboredtocode">tooboredtocode</a></p>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/css/variables.scss" as var;

#wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#top-bar {
  display: flex;
  align-items: center;

  height: 4rem;

  background: var(--background-accent);

  #link-home {
    display: flex;
    align-items: center;
  }

  #padding-logo {
    height: 3rem;
    width: 3rem;
    margin: 1rem 0.5rem 1rem 1rem;
  }

  #page-title {
    color: var(--primary);
    display: none;
  }

  #page-title-mobile {
    color: var(--primary);
  }

  @include var.tabletDesktopOnly {
    #page-title {
      display: initial;
    }

    #page-title-mobile {
      display: none;
    }
  }

  .spacer {
    flex: auto;
  }

  .theme-toggle {
    background-color: var(--background);
    border-radius: 1rem;
    height: 2rem;
    margin: 1rem;
    cursor: pointer;

    & > * {
      height: 2rem;
      box-sizing: border-box;
      padding: 0.5rem;
      border-radius: 1.5rem;
    }
    .active {
      color: var(--primary);
      background-color: var(--secondary);
    }
  }
}

#content {
  flex: auto;
  overflow: hidden;
}

#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;

  & > * {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
}
</style>
