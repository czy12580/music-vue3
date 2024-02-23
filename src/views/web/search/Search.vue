<template>
  <div>
    <Header :title="title" :back="true"></Header>
    <van-search
      v-model="keywords"
      shape="round"
      background="#000"
      @search="onSearch"
      @blur="onSearch"
      placeholder="请输入歌名、歌手、专辑..."
    >
    </van-search>

    <div v-if="albumsList.length > 0" class="albums-list">
      <div class="header-title">
        <span class="left">专辑</span>
        <div class="right"></div>
      </div>
      <ul>
        <li v-for="alb in albumsList" :key="alb.id">
          <h4>{{ alb.name }}</h4>
          <div>{{ alb.artist.name }}</div>
        </li>
      </ul>
      <div class="more" @click="goPage('/playlist/detail')">更多</div>
    </div>

    <div v-if="artistsList.length > 0" class="artists-list">
      <div class="header-title">
        <span class="left">歌手</span>
        <div class="right"></div>
      </div>
      <ul>
        <li v-for="art in artistsList" :key="art.id" @click="goPage('singer', art.id)">
          <img :src="art.img1v1Url" alt="">
          <span class="name">{{ art.name }}</span>
        </li>
      </ul>
      <div class="more" @click="goPage('/singer/category')">更多</div>
    </div>

    <div v-if="songsList.length > 0" class="songs-list">
      <div class="header-title">
        <span class="left">歌曲</span>
        <div class="right"></div>
      </div>
      <ul>
        <li v-for="song, index in songsList" :key="song.id">
          <div style="text-align: left;">
            <span><strong style="color:red">{{ index + 1 }}</strong>. {{ song.name }}</span>
            <div class="ar">
              <span v-for="i in song.artists"
                    :key="i.id">{{ i.name }}</span>
            </div>
          </div>

          <van-icon name="ellipsis"
                    @click="openSheet(song)" />
        </li>
      </ul>
    </div>

    <!-- 动作面板 -->
    <ActionSheet :obj="objects"
                 :show="isActive"
                 @close="isActive = false;"></ActionSheet>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import ActionSheet from "@/components/ActionSheet.vue"
import axios from '@/utils/axios'
import { reactive, ref, onMounted } from "vue";
import { search } from "@/service/data.js"
import { useRouter } from "vue-router";
components: {
  Header, ActionSheet
}
const router = useRouter();
const title = ref("搜索");
const keywords = ref(null);
const albumsList = ref([])
const artistsList = ref([])
const songsList = ref([])

const onSearch = async () => {
  const res = await axios.get('https://autumnfish.cn/search/suggest?keywords=' + keywords.value)
  albumsList.value = res.result.albums
  artistsList.value = res.result.artists
  songsList.value = res.result.songs
  console.log(res);
};

const isActive = ref(false);
const objects = ref({})
const openSheet  = (obj) => {
  isActive.value = true;
  objects.value = obj;
}

const goPage = (resource, id) => {
  if (id) {
    router.push({path: `/${resource}/${id}`})
  } else {
    router.push({path: resource});
  }
}

onMounted(async () => {});
</script>

<style lang="less" scoped>
.header-title {
  padding: 15px;
  display: flex;
  align-items: center;
  .left {
    padding: 5px 15px;
    background-color: #000;
    color: #fff;
    font-size: 18px;
    white-space: nowrap;
    margin-right: 8px;
  }
  .right {
    width: 100%;
    height: 1px;
    background-color: #ccc;
  }
}

.more {
  background: #000;
  color: #fff;
  font-size: 14px;
  width: 60px;
  padding: 5px 0;
  margin: 10px auto 10px;
}

.albums-list {
  ul {
    margin: 0 15px;
    li {
      padding: 5px 15px;
      color: #999;
      font-size: 14px;
      border: 1px solid #ccc;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
      h4 {
        margin: 0;
        font-size: 16px;
      }
    }
  }
}
.artists-list {
  ul {
    li {
      display: flex;
      align-items: center;
      padding: 5px 15px;
      img {
        width: 70px;
        height: 70px;
        border: 1px solid #ccc;
      }
      .name {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
}

.songs-list {
  ul {
    li {
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      color: #999;
      border-bottom: 1px solid rgb(243, 241, 241);
      .ar {
        font-size: 13px;
        margin-left: 20px;
        span {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
