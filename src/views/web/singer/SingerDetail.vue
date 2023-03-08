<template>
 
  <div>
    <Header :title="artistInfo.name"
            :back="true"></Header>
    <div class="singer-detail">
      <img :src="artistInfo.picUrl"
           alt="">
      <div class="card">
        <h4>{{ artistInfo.name }}</h4>
        <span>{{ fans }} 粉丝</span>
        <van-button round
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    size="small">关注</van-button>
      </div>
    </div>
    <div class="tab-content">
      <van-tabs :active="active">
        <van-tab title="简介">
          <div class="tab-item">
            <p>{{ intro.briefDesc }}</p>
            <p v-for="item, index in intro.introduction"
               :key="index">
              <strong>{{ item.ti }}</strong><br>
              {{ item.txt }}
            </p>
          </div>
        </van-tab>
        <van-tab title="歌曲">
          <div class="tab-item">
            <ul class="songlist">
              <li v-for="item,index in hotSongs"
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
          </div>
        </van-tab>
        <van-tab title="专辑">
          <div class="tab-item">
            <ul class="albumlist">
              <li v-for="item in albumList"
                  :key="item.id">
                <img :src="item.picUrl"
                     alt="">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="视频">
          <div class="tab-item">
            <ul class="mvlist">
              <li v-for="item in mvList"
                  :key="item.id">
                <img :src="item.imgurl"
                     alt="">
                <div class="desc">
                  <span>{{ item.name }}</span>
                  <span>{{ item.publishTime }}</span>
                  <span>播放量： {{ item.playCount }}</span>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
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
import Loading from '@/components/Loading.vue'
import { onMounted, reactive, toRefs, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { artistsDetail, fan, artistDesc, artistSongs, post } from '@/service/data.js'
export default {
  components: {
    Header, ActionSheet, Loading
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const active = ref(0)
    const data = reactive({
      title: '歌手',
      id: '',
      artistInfo: {},
      fans: 0,
      intro: {},
      hotSongs: [],
      albumList: [],
      mvList: [],
      isActive: false,
      objects: {}
    })
    onMounted(async () => {
      data.id = route.params.id
      let params = { id: route.params.id }
      const [res, fanCount, des, songs, album, mv] = await Promise.all([artistsDetail(params), fan(params), artistDesc(params),
      artistSongs(params), post('/artist/album', params), post('/artist/mv', params)])
      data.artistInfo = res.artist
      data.fans = fanCount.data.fansCnt
      data.intro = des
      data.hotSongs = songs.hotSongs
      data.albumList = album.hotAlbums
      data.mvList = mv.mvs
    })
    const openSheet = (obj) => {
      data.objects = obj;
      data.isActive = true;
    }
    const closeSheet = () => {
      data.isActive = false
    }

    return {
      ...toRefs(data),
      active,
      openSheet,
      closeSheet
    }
  },
}
</script>
<style lang="less" scoped>
.singer-detail {
  position: relative;
  text-align: center;
  img {
    width: 100%;
  }
  .card {
    position: absolute;
    bottom: -60px;
    left: 50%;
    width: 360px;
    height: 120px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 3px #ccc;
    margin-left: -180px;
    box-sizing: border-box;
    padding-top: 13px;
    h4 {
      margin: 5px 0;
    }
    span {
      display: block;
      color: #999;
      margin: 5px 0;
    }
  }
}
.tab-content {
  margin-top: 100px;
  .tab-item {
    padding: 10px 30px;
    p {
      text-align: left;
    }
    .songlist {
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
    .albumlist {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 29%;
        display: flex;
        flex-direction: column;
        border: 1px solid #ccc;
        margin: 5px;
        img {
          width: 100%;
        }
        span {
          margin: 3px 0;
        }
      }
    }
    .mvlist {
      li {
        display: flex;
        margin: 20px 0;
        img {
          width: 150px;
          height: 100px;
        }
        .desc {
          color: #ccc;
          display: flex;
          flex-direction: column;
          text-align: left;
          margin: 10px 0 0 10px;
          span {
            margin-bottom: 5px;
            &:nth-of-type(1) {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 160px;
            }
          }
        }
      }
    }
  }
}
</style>