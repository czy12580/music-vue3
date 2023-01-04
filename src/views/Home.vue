<template>
  <Loading v-if="isShow"></Loading>
  <div class="conatainer"
       v-else>
    <Header :title="title"></Header>
    <swiper :object="bannerList"></swiper>
    <h3 class="title">热门歌单</h3>
    <div class="playlist">
      <div class="item"
           v-for="item in hotPlayList"
           :key="item.id">
        <img v-lazy="item.coverImgUrl">
        <h4>{{ item.name }}</h4>
      </div>
    </div>

    <h3 class="title">热门歌手</h3>
    <div class="artistlist">
      <div class="item"
           v-for="item in artistsList"
           :key="item.id"
           @click="getDetail(item.id)">
        <img v-lazy="item.picUrl">
        <h4>{{ item.name }}</h4>
      </div>
    </div>
    <van-button plain
                round
                type="danger"
                to="/singer/category">查看更多 >></van-button>

    <h3 class="title">mv排行</h3>
    <div class="mv-list">
      <div class="item"
           v-for="item in mvList"
           :key="item.id">
        <img :src="item.cover"
             alt="">
        <h4>{{ item.name }}</h4>
      </div>
    </div>




  </div>
</template>
<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { getBanner } from '@/service/index'
import { artists, playlist, topmv } from '@/service/data'
import { useStore } from 'vuex'
import Loading from '@/components/Loading.vue'
import swiper from '@/components/Swiper.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    swiper, Header, Loading
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const data = reactive({
      title: '网易云',
      isShow: false,
      bannerList: [],
      hotPlayList: [],
      artistsList: [],
      mvList: []
    });
    // 加载首页数据
    onMounted(async () => {
      initList()
    })
    data.isShow = computed(() => {
      return store.state.isLoading
    })

    const getDetail = (id) => {
      router.push({ path: `/singer/${id}` })
    }

    const initList = async () => {
      const [res, play_list, singer, mv] = await Promise.all([getBanner(), playlist({ limit: 12 }), artists(), topmv()])
      data.bannerList = res.banners
      data.hotPlayList = play_list.playlists
      data.artistsList = singer.artists
      data.mvList = mv.data
    }

    return {
      ...toRefs(data),
      getDetail,
      initList
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100%;
}
.playlist {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    width: 100px;
    margin: 10px;
    box-shadow: 0 2px 3px #ccc;
    img {
      height: 100px;
      width: 100px;
      border-radius: 5px;
    }
    h4 {
      font-size: 16px;
      font-weight: 400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 10px 0;
    }
  }
}
.artistlist {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    width: 150px;
    margin: 10px;
    display: flex;
    padding: 10px;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 8px 12px #ebedf0;
    img {
      width: 60px;
      height: 60px;
    }
    h4 {
      font-size: 16px;
      font-weight: normal;
      margin-left: 10px;
    }
  }
}
.mv-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item {
    width: 130px;
    margin: 10px;
    box-shadow: 0 8px 12px #ebedf0;
    img {
      width: 100%;
      height: 80px;
    }
    h4 {
      font-size: 16px;
      font-weight: normal;
      margin-left: 10px;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.title {
  margin-bottom: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>