export const state = () => ({
	voucher_code: ''
})

export const mutations = {
	set_voucher_code(state, payload) {
		state.voucher_code = payload
	}
}

// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// const store = () => new Vuex.Store({
// 	state: {
// 		voucher_code: ''
// 	},

// 	mutations: {
// 		st(state, payload) {
// 			console.log('adssad')
// 			state.voucher_code = payload
// 		}
// 	}
// })

// export default store