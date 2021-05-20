<template> 
  <main>
    <router-view></router-view>
  </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {

  }
})
</script>

<style lang="scss">
  main{
    top: 0px;
    left: 0px;
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    opacity: 1;
  }
</style>
