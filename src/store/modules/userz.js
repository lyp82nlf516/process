export default {
  state: {
    username: '58831',
    userid: '58831id'
  },
  mutations: {
    switch_user(state, ppp) { // 这里的state对应着上面这个state
      state.username = state.username + ppp
      // 你还可以在这里执行其他的操作改变state
    }
  },
  actions: {
    switch_user(context, kkkk) { // 这里的context和我们使用的$store拥有相同的对象和方法
      console.log('kkkk', kkkk)
      context.commit('switch_user', kkkk);
      // 你还可以在这里触发其他的mutations方法
    },
  }
}
