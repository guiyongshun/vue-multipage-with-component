import Vue from 'vue';

export default Vue.component('layer-view',{
    template: `<div class="md-overlay" v-show="isShow" @click="delLayer"></div>`,
    props: ['showMe'],
    data() {
        return {
            
        }
    },
    computed: {
        isShow(){
            return this.showMe;
        }
    },
    methods: {
        delLayer() {
            this.$emit('hide');
        }
    }
})