import { XRSessionMode, XRSystem } from 'webxr'

export class Test001 {
  checkXrSupport(xrSystem: XRSystem, mode: XRSessionMode) {
    return xrSystem
      .isSessionSupported(mode)
      .then((result) => {
        return result
      })
      .catch((reason) => {
        return reason
      })
  }

  requestXrSession(xrSystem: XRSystem) {
    const sessionInit = {}
    return xrSystem.requestSession('inline', sessionInit)
  }
}
