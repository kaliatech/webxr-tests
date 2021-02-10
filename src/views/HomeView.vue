<template>
  <home-layout>
    <div class="container text-center">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <h2>WebXR Tests</h2>
          <p>
            There are tests and experiments around Web XR support in browsers. As of early 2021, Web XR support is not
            (yet?) available in Safari. iOS users can use the
            <a href="https://labs.mozilla.org/projects/webxr-viewer/">Mozilla WebXR Viewer</a>.
          </p>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
  </home-layout>
</template>

<script>
import HomeLayout from './layouts/HomeLayout.vue'

export default {
  name: 'HomePage',
  components: {
    'home-layout': HomeLayout,
  },
  props: {},
  data() {
    return {}
  },
}
</script>
<style lang="scss"></style>
