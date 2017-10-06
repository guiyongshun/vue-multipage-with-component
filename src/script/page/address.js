import Vue from 'vue';
import {addressData} from '../../assest/mock/mockData.js';
import * as Modal from '../component/modal.js';
import axios from 'axios';

Vue.prototype.axios = axios;

let template = `
<div class="container">
    <div class="checkout-addr">
        <!-- process step -->
        <div class="check-step">
            <ul>
                <li class="cur">地址确认</li>
                <li>查看订单</li>
                <li>支付</li>
                <li>订单确认</li>
            </ul>
        </div>

        <!-- address list -->
        <div class="checkout-title">
            <span>配送地址</span>
        </div>
        <div class="addr-list-wrap">
            <div class="addr-list">
                <ul>
                    <li v-for="(item,index) in filterAddress" @click="currentIndex = index"
                        :class="{'check': currentIndex == index}">
                        <dl>
                            <dt>{{ item.userName }}</dt>
                            <dd class="address">{{ item.streetName }}</dd>
                            <dd class="tel">{{ item.tel }}</dd>
                        </dl>
                        <div class="addr-opration addr-edit" @click="showDialog('edit')">
                            <a href="javascript:;" class="addr-edit-btn">
                                <svg class="icon icon-edit">
                                    <use xlink:href="#icon-edit"></use>
                                </svg>
                            </a>
                        </div>
                        <div class="addr-opration addr-del" @click="showDialog('del')">
                            <a href="javascript:;" class="addr-del-btn">
                                <svg class="icon icon-del">
                                    <use xlink:href="#icon-del"></use>
                                </svg>
                            </a>
                        </div>
                        <div class="addr-opration addr-set-default" v-if="!item.isDefault">
                            <a href="javascript:;" class="addr-set-default-btn"
                            @click="setDefault(index)"><i>设为默认</i></a>
                        </div>
                        <div class="addr-opration addr-default" v-if="item.isDefault">默认地址</div>
                    </li>

                    <li class="addr-new">
                        <div class="add-new-inner">
                            <i class="icon-add">
                                <svg class="icon icon-add">
                                    <use xlink:href="#icon-add"></use>
                                </svg>
                            </i>
                            <p>添加新地址</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="shipping-addr-more">
                <a class="addr-more-btn up-down-btn" href="javascript:" @click="showMore">
                    more
                    <i class="i-up-down">
                        <i class="i-up-down-l"></i>
                        <i class="i-up-down-r"></i>
                    </i>
                </a>
            </div>
        </div>

        <!-- shipping method-->
        <div class="checkout-title">
            <span>配送方式</span>
        </div>
        <div class="shipping-method-wrap">
            <div class="shipping-method">
                <ul>
                    <li :class="{'check':shippingMethod==1}" @click="shippingMethod=1">
                        <div class="name">标准配送</div>
                        <div class="price">Free</div>
                    </li>
                    <li :class="{'check':shippingMethod==2}" @click="shippingMethod=2">
                        <div class="name">高级配送</div>
                        <div class="price">180</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="next-btn-wrap">
            <a href="javascript:;" class="btn btn--red">下一步</a>
        </div>

        <del-modal message="你确认删除此配送地址信息吗?" :delFlag="delShow" v-on:hide="delShow=false" v-on:confirm="delAddress"></del-modal>
        <modify-modal :message="editInfo" :editFlag="editShow" v-on:hide="editShow=false" v-on:confirm="editAddress"></modify-modal>

    </div>
</div>
`;

new Vue({
    el:'#app',
    template: template,
    data() {
        return {
            addressList: [],
            limitNum: 3,
            currentIndex: 0,
            shippingMethod: 0,
            delShow: false,
            editShow: false,
            editInfo: {
                userName: '',
                streetName: '',
                tel: ''
            }
        }
    },
    computed: {
        filterAddress() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getAddressList();
        })
    },
    methods: {
        getAddressList() {
            this.axios.get('g.cn/address').then(res => {
                ({
                    result: this.addressList
                } = res.data);
            })
        },
        showMore() {
            this.limitNum = this.addressList.length;
        },
        setDefault(index) {
            this.addressList.forEach((item, num) => {
                item.isDefault = index == num;
            })
        },
        showDialog(type) {
            switch (type) {
                case 'del':
                    this.delShow = true;
                    break;
                case 'edit':
                    let currentAddress = this.addressList[this.currentIndex];

                    //todo 确保保存时才更新页卡中的地址信息，单独取一份数据进行编辑处理
                    this.editInfo = {
                        userName: currentAddress.userName,
                        streetName: currentAddress.streetName,
                        tel: currentAddress.tel
                    }

                    this.editShow = true;
                    break;
            }
        },
        delAddress() {
            let currentAddress = this.addressList[this.currentIndex];

            if (this.addressList.length > 1) {
                //删除项为默认地址则重置为第一项
                if (currentAddress.isDefault) {
                    this.addressList[0].isDefault = true;
                }
                //删除项为当前选中项则重置为第一项
                this.currentIndex = 0;
            }
            this.addressList.splice(this.currentIndex, 1);
            this.delShow = false;
        },
        editAddress(info) {
            let currentAddress = this.addressList[this.currentIndex];

            // Object.assign(currentAddress, this.editInfo);
            Object.assign(currentAddress, info);

            /*//todo 没找到批量更新data多个键值对的方法
            currentAddress.userName = this.editInfo.userName;
            currentAddress.streetName = this.editInfo.streetName;
            currentAddress.tel = this.editInfo.tel;*/

            this.editShow = false;
        }
    }
})