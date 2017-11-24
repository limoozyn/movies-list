<template>
  <modal :showModal="showModal" :closeAction="closeAction">
    <span slot="body">
      <movies-list :listProps="listProps" :v-if=""></movies-list>
    </span>
    <div slot="footer">
      <button @click="closeAction">Close</button>
    </div>
  </modal>
</template>

<script>
  import Modal from 'modal-vue'
  export default {
    data () {
      const _this = this
      return {
        listProps: {
          title: 'Found Movies',
          url: _this.fullquery
        }
      }
    },
    props: ['showModal', 'closeAction', 'clickAction', 'fullquery'],
    components: {
      Modal,
      'movies-list': () => import('./MoviesList')
    }
  }
</script>

<style scoped>

</style>
