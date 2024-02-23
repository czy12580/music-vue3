<template>
  <div id="app">
    <router-view></router-view>
    <div class="audio-box" v-if="currentUrl !== null">
      <audio controls autoplay>
        <source :src="currentUrl"
                type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const data = reactive({
      currentUrl: ''
    })

    data.currentUrl = computed(() => {
      return store.state.songUrl
    })

    return {
      ...toRefs(data)
    }
  },
}
</script>


<style>
#app {
  height: 100%;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.audio-box {
  padding-top: 5px;
  width: 100%;
  position: sticky;
  bottom: 0;
  background: #000;
}
</style>
