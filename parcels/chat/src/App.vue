<template>
  <div>
    <Chat :mailBox="mailBox" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Chat from "./components/Chat.vue";

export default defineComponent({
  name: "App",
  props: ["parcelData"],
  components: {
    Chat,
  },
  computed: {
    mailBox(){
      return this.parcelData.mailBox;
    }
  }
});
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
