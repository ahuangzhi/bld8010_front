<template>
  <div class="client_show_list_div" style="margin: 0 auto .8rem auto; font-size: .4rem" v-if="data1.v === false || data1.v">
    <div class="client_show_list_div_header" style="margin-bottom: .2rem;">{{data1.k}}</div>
    <div class="client_show_list_div_main">
      <el-input v-model="data1.v" :disabled="true" v-if="data1.v !== true && data1.v !== false"></el-input>
      <el-switch v-model="data1.v" active-color="#13ce66" inactive-color="#ff4949" :disabled="true" v-if="data1.v === true || data1.v === false"></el-switch>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DataShowInput",
        props: ['data1']
    }
</script>

<style scoped>

</style>