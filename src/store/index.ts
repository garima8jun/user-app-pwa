import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    pagination: {},
    userPosts: [],
    userDetail: undefined,
    error: undefined
  },
  getters: {
    users: state => state.users,
    currentUser: state => state.userDetail,
    getPagination : state => state.pagination,
    userPosts: state => state.userPosts,
  },
  mutations: {
    update_users(state, payload) {
      state.users = payload
    },
    set_pagination(state, pagination) {
      state.pagination = pagination;
    },
    update_posts(state, payload) {
      state.userPosts = payload
    },
    update_error(state, payload) {
      state.error = payload
    },
    update_user(state, payload) {
      state.userDetail = payload
    }
  },
  actions: {
    getUsers(context) {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
          context.commit('update_users', res.data);
          context.commit('set_pagination', {
            current_page: res.data.pagination.current_page,
            first_page_url: res.data.pagination.first_page_url,
            prev_page_url: res.data.pagination.prev_page_url,
            next_page_url: res.data.pagination.next_page_url,
            last_page_url: res.data.pagination.last_page_url,
            last_page: res.data.pagination.last_page,
            per_page: res.data.pagination.per_page,
            total: res.data.pagination.total,
            path: res.data.pagination.path
        });

        })
        .catch(err => {
          context.commit('update_error', err.response)
        })
    },
    getPostsByUserId(context, userId: string) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => {
          context.commit('update_posts', res.data);
        })
        .catch(err => {
          context.commit('update_error', err.response)
        })
    },
    async getPostById(context, postId: string) {
      return await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          context.commit('update_error', err.response)
          return undefined
        })
    }
  }
})
