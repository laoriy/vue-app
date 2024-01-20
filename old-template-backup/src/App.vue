<!--
 * @Author: liuruijun
 * @Date: 2020-09-01 16:24:08
 * @LastEditors: liuruijun
 * @LastEditTime: 2020-09-02 10:55:18
 * @Description: file content
-->
<template>
   <keep-alive :include="include">
      <router-view />
    </keep-alive>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      include: []
    }
  }
}
</script>
