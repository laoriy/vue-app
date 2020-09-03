<template>
  <div class="index">
    <h5>welcome!</h5>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
  .index{
    color: @black;
  <% if (isH5) { %>
    .hairline('all',red,.5rem);
  <% } %>
  }
</style>
