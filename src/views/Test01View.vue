<template>
  <main-layout>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Test 01 - Devices &amp; Capabilities</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-auto">
          <h2 class="pt-3">Web XR Support</h2>

          <table class="table">
            <tbody>
              <tr>
                <td class="test-label">navigator.xr</td>
                <td>{{ xrSupport ? 'true' : 'false' }}</td>
              </tr>
              <tr>
                <td class="test-label">isSessionSupported</td>
                <td></td>
              </tr>
              <tr v-for="sessionSupport in supportedSessions" :key="sessionSupport.name">
                <td class="test-label">
                  <span class="ps-3">{{ sessionSupport.name }}</span>
                </td>
                <td>
                  <span :class="sessionSupport.result === true ? 'green' : 'red'">
                    {{ sessionSupport.result }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </main-layout>
</template>
<script lang="ts">
import MainLayout from './layouts/MainLayout.vue'

import { XRSystem, XRSessionMode } from 'webxr'

import { defineComponent } from 'vue'
import { XRSessionModeEnum } from '../types/webxr/index.d.ts'

// enum XRSessionMode5 {
//   'inline' = 'inline',
//   'immersive-vr' = 'immersive-vr',
//   'immersive-ar' = 'immersive-ar'
// };

function checkXrSupport(xrSystem: XRSystem, mode: XRSessionMode) {
  return xrSystem
    .isSessionSupported(mode)
    .then((result) => {
      return result
    })
    .catch((reason) => {
      return reason
    })
}

export default defineComponent({
  name: 'Test01',
  components: {
    'main-layout': MainLayout,
  },
  props: {},
  data() {
    return {
      xrSupport: navigator.xr as XRSystem,
      supportedSessions: [],
    }
  },
  mounted() {
    if (navigator.xr) {
      this.testXrSupport(navigator.xr)
    }
  },
  methods: {
    testXrSupport(xrSystem: XRSystem) {
      Object.values(XRSessionModeEnum).forEach((mode) => {
        checkXrSupport(xrSystem, mode).then((result) => {
          this.supportedSessions.push({ name: mode, result: result })
        })
      })
    },
  },
})
</script>
<style lang="scss">
@import '../styles/_variables.scss';
@import '../../node_modules/bootstrap/scss/bootstrap.scss';

.test-label {
  white-space: nowrap;
  font-weight: bold;
}

.green {
  color: $green-500;
}

.red {
  color: $red-500;
}
</style>
