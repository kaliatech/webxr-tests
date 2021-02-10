<template>
  <div>
    <the-main-header />
    <main>
      <slot></slot>
    </main>
    <footer class="home-footer">
      <small>&copy;2021 Kaliatech</small>
    </footer>
  </div>
</template>
<script>
import TheMainHeader from '../../components/TheMainHeader.vue'

export default {
  name: 'HomeLayout',
  components: {
    TheMainHeader,
  },
}
</script>
