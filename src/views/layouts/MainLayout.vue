<template>
  <div>
    <the-main-header />
    <main>
      <slot></slot>
    </main>
    <the-main-footer />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import TheMainHeader from '../../components/TheMainHeader.vue'
import TheMainFooter from '../../components/TheMainFooter.vue'

export default defineComponent({
  name: 'HomeLayout',
  components: {
    TheMainHeader,
    TheMainFooter,
  },
})
</script>
