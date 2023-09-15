<template>
  <van-action-sheet :show="show"
                    :title="obj.name"
                    close-on-click-action
                    @close="close"
                    :closeable="false"
                    >
    <div class="content">
        <span v-if="obj.alia">{{ obj.alia[0] }}</span>
        <div class="action">
            <van-icon size="1rem" name="play-circle-o" @click="playSong(obj.id)" />
            <van-icon size="1rem" name="like-o" />
            <van-icon size="1rem" name="add-o" />
        </div>
    </div>
  </van-action-sheet>
</template>

<script>
import { onMounted, reactive, ref, toRefs, defineEmits } from 'vue'
import { getSongUrl } from '@/service/data'
import { useStore } from 'vuex'
export default {
    props: {
        obj: {
            type: Object,
            default: null
        },
        show: false
    },
    setup(props, { emit }) {
        const store = useStore()
        const data = reactive({
            show: false,
            songUrl: null
        })
        const close = () => {
            emit('close')
        }
        const playSong = async (id) => {
            close()
            const res = await getSongUrl({id: id})
            data.songUrl = res.data[0].url
            store.dispatch('playMusic', data.songUrl)
        }
        onMounted(async() => {
        })

        return {
            ...toRefs(data),
            playSong,
            close
        }
    }
}
</script>

<style lang="less" scoped>
.content {
    padding: 10px 30px 50px;
    .action {
        display: flex;
        justify-content: space-between;
    }
}
</style>