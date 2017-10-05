import Vue from 'vue';
import axios from 'axios';
import addressView from './page/address.js';

Vue.prototype.axios = axios;

new Vue({
    el: '#app',
    template: '<address-view></address-view>'
})