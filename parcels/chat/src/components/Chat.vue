<template>
  <div>
    <div
      v-for="message in messages"
      v-bind:key="message.timeStamp"
      class="card"
      style="width: 18rem"
    >
      <div class="card-body">
        <p class="card-text">
          {{ message.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Chat",
  props: {
    mailBox: Object,
  },
  watch: {
    mailBox: {
    immediate: true,
      deep: true,
      handler(val){
        console.log('The list of colours has changed!', val);
      }
    }
  },
  computed: {
    tMessages(){
      return reactive(this.mailBox.messages);
    },
    tMessagesLocal(){
      return reactive(this.tMessages.local);
    },
    tMessagesRemote(){
      return reactive(this.tMessages.remote);
    },
    messages() {
      return this.tMessagesLocal
        .concat(this.tMessagesRemote)
        .sort((a, b) => {
          return a.timeStamp - b.timeStamp;
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
