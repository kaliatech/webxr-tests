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
          <h2 class="pt-3">WebXR Support</h2>

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
              <tr v-if="deviceChangeMsgs.length === 0">
                <td class="test-label">
                  <span>onDeviceChange</span>
                </td>
                <td>-</td>
              </tr>
              <tr v-for="(msg, idx) in deviceChangeMsgs" :key="idx">
                <td class="test-label">
                  <span v-if="idx === 0">onDeviceChange</span>
                </td>
                <td>{{ idx }} - {{ msg }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col"></div>
      </div>

      <div class="row">
        <div class="col-auto">
          <h2 class="pt-3">Session Init</h2>
          <button class="btn btn-primary" :disabled="!xrSupport || !startActionsEnabled" @click="onStartAr">
            Immersive-AR
          </button>
          <div v-if="startMsgs.length > 0">
            <p class="ms-1 mb-0">Messages:</p>
            <p v-for="(msg, idx) in startMsgs" :key="'startMsg' + idx" class="ms-3 mb-0">
              {{ msg }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>
<script lang="ts">
import MainLayout from './layouts/MainLayout.vue'

import { XRSystem } from 'webxr'

import { defineComponent } from 'vue'
import { XRSessionModeEnum } from '../types/webxr/index.d.ts'

import { Test001 } from '../js/Test001'

const test001 = new Test001()

export default defineComponent({
  name: 'Test01',
  components: {
    'main-layout': MainLayout,
  },
  props: {},
  data() {
    return {
      xrSupport: navigator.xr as XRSystem,
      deviceChangeMsgs: [] as string[],
      supportedSessions: [] as string[],
      startActionsEnabled: true,
      startMsgs: [] as string[],
    }
  },
  mounted() {
    if (!navigator.xr) {
      return
    }
    this.deviceChangeListener = navigator.xr.addEventListener('devicechange', this.onDeviceChange)

    this.testXrSupport(navigator.xr)
    //this.requestXrSession(navigator.xr)
  },
  unmounted() {
    if (this.deviceChangeListener) {
      navigator.xr.removeEventListener(this.deviceChangeListener)
    }
  },
  methods: {
    onDeviceChange(evt) {
      this.deviceChangeMsgs.push(JSON.stringify(evt))
      console.log('onDeviceChange', evt)
    },
    async testXrSupport(xrSystem: XRSystem) {
      // Can not use .forEach with 'await', causes compile error somewhere
      //Object.values(XRSessionModeEnum).forEach((mode) => {

      const modes = Object.values(XRSessionModeEnum)
      for (const mode of modes) {
        const result = await test001.checkXrSupport(xrSystem, mode)
        this.supportedSessions.push({ name: mode, result: result })
      }
    },
    requestXrSession(xrSystem: XRSystem) {
      test001.requestXrSession(xrSystem)
    },
    onStartAr() {
      navigator.xr
        .requestSession('immersive-ar')
        .then((xrSession) => {
          this.startMsgs.push('Success')
          this.startMsgs.push('xrSession:' + JSON.stringify(xrSession))
          //xrSession.addEventListener('end', onXRSessionEnded)
          //xrSession.requestAnimationFrame(onXRAnimationFrame)
        })
        .catch((error) => {
          this.startMsgs.push('error')
          this.startMsgs.push(JSON.stringify(error))
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
