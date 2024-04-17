<template>
  <Loading v-if="isLoading"></Loading>
  <div>
    <Header :title="title"
            :back="true"></Header>
    <van-search v-model="keywords"
                shape="round"
                background="#000"
                show-action
                placeholder="请输入搜索关键词">
      <template #action>
        <div style="color: #fff" @click="onSearch()">搜索</div>
      </template>
    </van-search>
    <van-dropdown-menu>
      <van-dropdown-item v-model="params.type"
                         :options="option1"
                         @change="change(params)" />
      <van-dropdown-item v-model="params.area"
                         :options="option2"
                         @change="change(params)" />
      <van-dropdown-item v-model="params.initial"
                         :options="option3"
                         @change="change(params)" />
    </van-dropdown-menu>
    <div class="list">
      <ul>
        <li v-for="item in obj.artists"
            :key="item.id"
            @click="getDetail(item.id)">
          <img :src="item.picUrl"
               alt="">
          <h3>{{ item.name }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loading from '@/components/Loading.vue'
import { reactive, toRefs, onMounted } from 'vue'
import axios from '@/utils/axios'
import { getArtistCategory, search } from '@/service/data'
import { useRouter } from 'vue-router'
export default {
  components: {
    Header, Loading
  },
  setup() {
    const router = useRouter()
    const data = reactive({
      title: '歌手分类',
      option1: [
        { text: '全部', value: -1 },
        { text: '男歌手', value: 1 },
        { text: '女歌手', value: 2 },
        { text: '乐队', value: 3 }
      ],
      option2: [
        { text: '全部', value: -1 },
        { text: '华语', value: 7 },
        { text: '欧美', value: 96 },
        { text: '日本', value: 8 },
        { text: '韩国', value: 16 },
        { text: '其它', value: 0 }
      ],
      option3: [],
      params: { type: -1, area: -1, initial: '-1' },
      obj: {},
      keywords: '',
      isLoading: false
    })

    onMounted(async () => {
      // 遍历26字母
      for (let index = 0; index < 25; index++) {
        const item = { text: String.fromCharCode(65 + index), value: String.fromCharCode(65 + index).toLocaleLowerCase() }
        data.option3.push(item)
      }
      initList(data.params);
    })

    const change = (params) => {
      initList(params)
    }

    const onSearch = async() => {
        // const res = await search({keywords: data.keywords, type: 100})
        const res = await axios.post('/search', {keywords: data.keywords, type: 100})
        data.obj = res.result;
    }

    const getDetail = (id) => {
      router.push({ path: `/singer/${id}` })
    }

    // 初始化歌手列表
    const initList = async (params) => {
      data.isLoading = true
      const res = await getArtistCategory(params)
      data.obj = res;
      data.isLoading = false
    }

    return {
      ...toRefs(data),
      initList,
      change,
      getDetail,
      onSearch
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  ul {
    padding: 10px;
    li {
      display: flex;
      align-items: center;
      margin: 10px;
      border-bottom: 1px solid #ccc;
      padding: 5px;
      h3 {
        font-size: 16px;
      }
      img {
        width: 75px;
        height: 70px;
        border-radius: 5px;
        margin-right: 20px;
      }
    }
  }
}
</style>
