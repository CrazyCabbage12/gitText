import {computed, ref} from "vue";
import {defineStore} from "pinia";
function initState(){
    return {
        isCollapse: false,
    }
}
export const useStore = defineStore('StoreData', () => {
    const state = ref(initState())


    return {
    state,
    };
});