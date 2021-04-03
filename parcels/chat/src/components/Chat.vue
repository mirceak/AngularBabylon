<template>
  <div>
    <div
      v-for="message in messages"
      :key="message.timeStamp"
      :class="{ local: message.remote == false, card: true }"
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
import { defineComponent, nextTick } from "vue";

export default defineComponent({
  name: "Chat",
  props: {
    mailBoxObservable: Object,
    unmountListeners: Array,
  },
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    let observer = this.mailBoxObservable.subscribe((mailBox) => {
      this.show = false;
      this.messages.splice(0);
      nextTick(() => {
        this.messages.push(
          ...mailBox.messages.local
            .concat(mailBox.messages.remote)
            .sort((a, b) => {
              return a.timeStamp - b.timeStamp;
            })
        );
        this.show = true;
        this.$emit("update");
      });
    });

    this.unmountListeners.push(()=>{
      observer.unsubscribe();
    })
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
.card {
  width: 40%;
  &.local {
    left: 60%;
  }
}
</style>
