import Vue from 'vue';
import axios from 'axios';
import cartView from './page/cart.js';

Vue.prototype.axios = axios;

new Vue({
    el: '#app',
    template: '<cart-view></cart-view>'
})