<!--  -->
<template>
  <div></div>
</template>

<script>
import { ERR_OK } from "api/config.js";
import { getSingerList } from "api/singer.js";
export default {
  data() {
    return {
      singer: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.singerList.data.singerlist);
        }
      });
    },
  }
};
</script>
<style lang='stylus' scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>