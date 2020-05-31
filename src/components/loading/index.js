import Vue from 'vue';
import Loading from './index.vue';

function initxLoading() {
    var container = document.createElement('div');
    document.body.appendChild(container);
    var num = 0;
    const xLoading = new Vue({
        el: container,
        methods: {
            show() {
                num++;
                this.$refs.xLoading.show();
            },
            hide(key) {
                num--;
                if (num <= 0) {
                    num = 0;
                    this.$refs.xLoading.hide();
                } else {
                    // log正在加载的loading
                    console.log(`接口${key}，还有loading正在加载中.....`);
                }
            }
        },
        render: function (createElement) {
            return createElement(Loading, {
                ref: 'xLoading'
            });
        }
    });
    return xLoading;
}

const xLoading = {
    install: function (Vue) {
        Vue.prototype.$xLoading = initxLoading();
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(xLoading);
}

export default xLoading;
