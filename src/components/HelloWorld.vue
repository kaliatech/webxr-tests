<template>
  <div>
    <h1>Test 001b</h1>
    <canvas id="renderCanvas" ref="renderCanvas" width="360" height="360"> </canvas>
  </div>
</template>
<script>
import { Color4, Engine, FreeCamera, HemisphericLight, Mesh, Scene, Vector3 } from '@babylonjs/core'

export default {
  mounted() {
    // Get the canvas DOM element
    const canvas = this.$refs['renderCanvas']

    console.log(canvas)

    // Load the 3D engine
    const babylonEngine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    })

    var scene = new Scene(babylonEngine)
    scene.clearColor = new Color4(1, 0, 0, 0.5)
    var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
    //var camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene)
    camera.setTarget(Vector3.Zero())
    camera.attachControl(canvas, true)
    var light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7
    var sphere = Mesh.CreateSphere('sphere1', 8, 0.5, scene)
    sphere.position.y = 0
    sphere.position.z = 0

    // const box = MeshBuilder.CreateBox("box", {}, scene);

    scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: 'immersive-ar',
        //sessionMode: 'inline'
      },
    })

    babylonEngine.resize()

    babylonEngine.runRenderLoop(() => {
      scene.render()
    })
  },
}
</script>
