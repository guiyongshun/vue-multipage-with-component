import Vue from 'vue';
import layerView from './layer.js';

let modifyModal = Vue.component('modify-modal', {
    template: `
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': showMe}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="hide">关闭</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="md-form-item">
                            <label class="md-form-item__label" style="width: 80px;">
                                姓名
                            </label>
                            <div class="md-form-item__content" style="margin-left: 80px;">
                                <div class="el-input">
                                    <input type="text" autocomplete="off" class="md-input__inner"
                                        v-model.trim="editInfo.userName"/>
                                </div>
                            </div>
                        </div>
                        <div class="md-form-item">
                            <label class="md-form-item__label" style="width: 80px;">
                                地址
                            </label>
                            <div class="md-form-item__content" style="margin-left: 80px;">
                                <div class="el-input">
                                    <input type="text" autocomplete="off" class="md-input__inner"
                                        v-model.trim="editInfo.streetName"/>
                                </div>
                            </div>
                        </div>
                        <div class="md-form-item">
                            <label class="md-form-item__label" style="width: 80px;">
                                电话号码
                            </label>
                            <div class="md-form-item__content" style="margin-left: 80px;">
                                <div class="el-input">
                                    <input type="text" autocomplete="off" class="md-input__inner"
                                        v-model.trim="editInfo.tel"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-wrap col-2">
                        <button class="btn btn--s" @click="confirm">保存</button>
                        <button class="btn btn--s btn--red" @click="hide">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <layer-view :show-me="showMe" v-on:hide="hide"></layer-view>
    </div>
    `,
    props: ['editFlag','message'],
    components: {
        'layer-view': layerView
    },
    data() {
        return {
            
        }
    },
    computed: {
        showMe() {
            return this.editFlag
        },
        editInfo(){
            return Object.assign({},this.message)
        } 
    },
    methods: {
        hide(){
            this.$emit('hide');
        },
        confirm(){
            this.$emit('confirm',this.editInfo);
        }
    }
});

let delModal = Vue.component('del-modal', {
    template: `
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':showMe}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="hide">关闭</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <p>{{ title }}</p>
                    </div>
                    <div class="btn-wrap col-2">
                        <button class="btn btn--m" @click="confirm">Yes</button>
                        <button class="btn btn--m btn--red" @click="hide">No</button>
                    </div>
                </div>
            </div>
        </div>
        <layer-view :show-me="showMe" v-on:hide="hide"></layer-view>
    </div>
    `,
    props: ['delFlag','message'],
    components: {
        'layer-view': layerView
    },
    data() {
        return {
            title: this.message
        }
    },
    computed: {
        showMe: function(){
            return this.delFlag
        }
    },
    methods: {
        hide(){
            this.$emit('hide');
        },
        confirm(){
            this.$emit('confirm');
        }
    }
});

export {
    modifyModal,
    delModal
};