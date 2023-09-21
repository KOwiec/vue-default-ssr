// for build:noExternal script from package.json, we need relative path, no alias
// TODO
import defaultSettings from '../../settings.js'      // '@/settings'

const {
    showSettings,

    } = defaultSettings;

const state = {
    showSettings: showSettings
};

const actions = {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
};

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (Object.hasOwnProperty(key)) {
            state[key] = value
        }
    }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

