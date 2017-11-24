<template>
  <modal :showModal="showModal" :closeAction="closeAction">
    <h3 slot="header">Found Movies</h3>
    <span slot="body">
      Here will be the search results
    </span>
    <div slot="footer">
      <button @click="closeAction">Close</button>
    </div>
  </modal>
</template>

<script>
  import Modal from 'modal-vue'
  export default {
    props: ['showModal', 'closeAction', 'clickAction'],
    components: { Modal }
  }
</script>

<style scoped>

</style>
