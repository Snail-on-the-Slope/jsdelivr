import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        packages: [],
        packageBy: null,
    },
    mutations: {
        updatePackages(state, data) {
            state.packages = data;
        },
        updatePackageBy(state, data) {
            state.packageBy = data;
        }
    },
    actions: {
        async fetchPackages(ctx) {
            let data = await axios.get(`https://data.jsdelivr.com/v1/stats/packages`).then(async(res) => {
                ctx.commit("updatePackages", res.data);

            }).catch(e => {
                console.log(e)
            })

        },
        async fetchPackageBy(ctx, info) {
            let file = await axios.get(`https://data.jsdelivr.com/v1/package/${info.type}/${info.name}`).then(res => {
                ctx.commit("updatePackageBy", res.data);
            }).catch(e => {
                console.log(e)
            })
        }
    },
    getters: {
        packages: s => s.packages,
        packageBy: s => s.packageBy
    },
})