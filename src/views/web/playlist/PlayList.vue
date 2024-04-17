<template>
  <Loading v-if="isLoading"></Loading>
  <div>
    <Header :title="'歌单'"
            :back="true"></Header>
    <div class="header">
      <div class="left">
        <img :src="playlist.coverImgUrl"
             alt="">
      </div>
      <div class="right">
        <p>{{ playlist.name }}</p>
        <p>
          <van-tag style="margin-right: 10px"
                   type="danger"
                   v-for="item, key in playlist.tags"
                   :key="key">{{ item }}</van-tag>
        </p>
      </div>
    </div>
    <div class="main">
      <ul class="songlist">
        <li v-for="item, index in songs"
            :key="item.id">
          <div style="text-align: left;">
            <span><strong style="color:red">{{ index + 1 }}</strong>. {{ item.name }}</span>
            <div class="ar">
              <span v-for="i in item.ar"
                    :key="i.id">{{ i.name }}</span>
            </div>
          </div>

          <van-icon name="ellipsis"
                    @click="openSheet(item)" />
        </li>
      </ul>
      <van-pagination v-model="currentPage"
                      :total-items="50"
                      :show-page-size="3"
                      force-ellipses
                      @change="changePage()" />
    </div>

    <!-- 动作面板 -->
    <ActionSheet :obj="objects"
                 :show="isActive"
                 @close="closeSheet"></ActionSheet>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import ActionSheet from '@/components/ActionSheet.vue'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { post } from '@/service/data'
import Loading from '@/components/Loading.vue'
export default {
  components: {
    Header, ActionSheet, Loading
  },
  setup() {
    const route = useRoute()
    const currentPage = ref(1)

    const obj = reactive({
      playlist: {},
      songs: [],
      params: {
        id: route.params.id,
        limit: 10,
        offset: 0
      },
      objects: {},
      isActive: false,
      isLoading: false
    })

    const initList = async () => {
      const res2 = await post('playlist/track/all', obj.params)
      obj.songs = res2.songs
    }


    onMounted(async () => {
      obj.isLoading = true;
      let res = await post('/playlist/detail', { id: obj.params.id })
      obj.playlist = res.playlist
      initList()
      obj.isLoading = false;
    })

    const changePage = () => {
      obj.params.offset = currentPage.value * 10
      initList()
    }

    const openSheet = (data) => {
        obj.objects = data
        obj.isActive = true
    }

    const closeSheet = ()=> {
        obj.isActive = false
    }

    return {
      ...toRefs(obj),
      currentPage,
      changePage,
      initList,
      openSheet,
      closeSheet
    }

  }
}

</script>
<style lang="less" scoped>
.header {
  padding: 20px;
  display: flex;
  background: #000;
  color: #fff;
  .left {
    img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }
  }
  .right {
    margin-left: 10px;
    p {
      text-align: left;
      font-size: 18px;
    }
  }
}
.main {
  padding: 20px 30px;
  .songlist {
    margin-bottom: 20px;
    li {
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #999;
      border-bottom: 1px solid rgb(243, 241, 241);
      .ar {
        font-size: 13px;
        margin-left: 15px;
        span {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
