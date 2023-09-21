import {createStore as _createStore} from 'vuex'
import getters from './getters'

//https://vitejs.dev/guide/features.html#glob-import
const moduleFiles = import.meta.glob('./modules/*.js')
const modules = {}
for (const path in moduleFiles) {
    moduleFiles[path]().then((mod) => {
        let slashPos = path.lastIndexOf('/');
        let moduleName = path.slice(slashPos + 1);
        moduleName = moduleName.replace('.js', '');
        modules[moduleName] = mod.default
        //console.log(moduleName)
    })
}
export function createStore() {
    return _createStore({
        modules,
        getters
    })
}
