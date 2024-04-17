<template>
  <div>
    <Header :title="state.title"
            :back="true"></Header>
    <van-dropdown-menu>
      <van-dropdown-item v-model="state.params.cat"
                         :options="state.option1"
                         @change="change()" />
    </van-dropdown-menu>
    <div class="playlist">
      <ul>
        <li v-for="item in state.playlist" :key="item.id" @click="getDetail(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import { onMounted, reactive } from 'vue'
import axios from '@/utils/axios'
import { useRouter } from 'vue-router'
components: {
  Header
}
const router = useRouter()
const state = reactive({
  title: '歌单',
  option1: [],
  params: {
      cat: '全部'
  },
  playlist: []
})

const getCategory = async () => {
  axios.get('/playlist/catlist')
    .then((res) => {
        let data = res.sub.map(item => {
            return {
                text: item.name,
                value: item.name
            }
        });
        state.option1 = JSON.parse(JSON.stringify(data))
        state.option1.unshift({text: '全部', value: '全部'});
    })
}

const initList = async (params) => {
    await axios.post('/top/playlist', state.params)
    .then(res => {
        state.playlist = res.playlists
    })
}

const change = async () => {
  initList()
}

const getDetail = (id) => {
  router.push({path: `/playlist/${id}`})
}

onMounted(async () => {
  getCategory()
  initList()
})

</script>

<style lang="less" scoped>
.playlist {
  padding: 20px 10px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      width: 100px;
      display: flex;
      flex-direction: column;
      margin: 8px;
      box-shadow: 0 2px 3px #ccc;
      padding-bottom: 10px;
      img {
        width: 100px;
      }
      span {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
