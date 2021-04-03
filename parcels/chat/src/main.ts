import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";

import App from "./App.vue";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        // /*
        parcelData: this,
        unmountListeners: unmountListeners,
        window: window
        // */
      });
    },
  },
});



export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
var unmountListeners = [];
export const unmount = (dom)=>{
  unmountListeners.map((listener)=>{
    listener();
    return listener;
  })
  unmountListeners.splice(0);
  return vueLifecycles.unmount(dom);
};
