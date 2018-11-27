<!--  -->
<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { ERR_OK } from "api/config.js";
import { getSingerDetail } from "api/singer.js";
import { createSong,getSongVkey } from "common/js/song.js"
import MusicList from "components/music-list/music-list.vue"
export default {
  data () {
    return {
      songs:[]
    };
  },

  // components: {},

  computed: {
    title(){
      return this.singer.name
    },
    bgImage(){
      return this.singer.avatar
    },
    ...mapGetters(["singer"])
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail(){
      if(!this.singer.id){
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          
        }
      });
    },
    _normalizeSongs(list){
      let ret = []
      list.forEach((item)=>{
        // console.log('item',item)
        // 解构赋值-拿到item 下的 musicData 列表数据
        let {musicData} = item
        //------------- 更新的加上vkey
        getSongVkey(musicData.songmid).then((res) => {
          const vkey = res.data.items[0].vkey;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData, vkey))
          }
        })
      })
      return ret
    }
  },
  components:{
    MusicList
  }
};
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>