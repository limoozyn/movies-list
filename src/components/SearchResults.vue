<template>
  <modal :showModal="showModal" :closeAction="closeDialog">
    <span slot="body">
      <movies-list :listProps="listProps" :title="listProps.title" :url="listProps.url" v-on:received="showFoundMovies"></movies-list>
    </span>
    <div slot="footer">
      <button @click="closeDialog">Close</button>
    </div>
  </modal>
</template>

<script>
import Modal from 'modal-vue'
export default {
  data () {
    return {
      listProps: {
        title: 'Found Movies',
        url: this.fullquery
      },
      showModal: false
    }
  },
  props: ['fullquery'],
  watch: {
    fullquery: function (newValue) {
      console.log('SearchResult = ' + newValue)
      this.listProps.url = newValue
    }
  },
  components: {
    Modal,
    'movies-list': () => import('./MoviesList')
  },
  methods: {
    showFoundMovies: function () {
      this.showModal = true
      document.body.style.overflowY = 'hidden'
    },
    closeDialog () {
      this.showModal = false
    }
  }
}
</script>

<style>
  .modal{
    overflow: auto;
  }
</style>
