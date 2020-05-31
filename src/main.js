import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import xLoading from '@/components/loading';
import xcyForm from '@/components/xcy-form';
import xcylist from '@/components/xcy-list';
import toolbar from '@/components/toolbar';
import '@/theme/element-variables.scss';
import router from './router';
Vue.config.productionTip = false;
// 引入element-ui
Vue.use(ElementUI);
Vue.use(xLoading);
// 全局引入配置化table和form
Vue.use(xcyForm);
Vue.use(xcylist);
Vue.use(toolbar);
const BaseVue = new Vue({
    router,
    date: function () {
        return {
            provinceDisplayName: ''
        };
    },
    render: h => h(App)
});
Vue.prototype.BaseVue = BaseVue;
Vue.prototype.$getTime = function () {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

//  xcy-form
Vue.prototype.$setFormProps = function (provinceCode, listProps) {
    let arr = [];
    if (listProps instanceof Array) {
        let zheJiang = ['timberTypeMc', 'shiXiangJbm', 'shiXiangMcZl', 'projid', 'systemType'];
        for (let index = 0; index < listProps.length; index++) {
            const element = listProps[index];
            let prop = element.prop ? element.prop : Math.random();
            if (provinceCode === '33') {
                arr.push(element);
            } else if (provinceCode === '43') {
                // 湖南
                if (!JSON.stringify(zheJiang).includes([prop])) {
                    arr.push(element);
                }
            } else if (!JSON.stringify(zheJiang).includes([prop])) {
                // 全国
                arr.push(element);

            }
        }
    }
    return arr;
};

// xcy-list
Vue.prototype.$setListProps = function (provinceCode, listProps) {
    let arr = [];
    if (listProps instanceof Array) {
        let zheJiang = ['projid', 'timberType', 'systemType', 'timberTypeMc'];
        let huNan = ['commitmentDate', 'approveDate', 'dateStatus', 'ybts'];
        // 全国（除浙江部分）
        let quanGuo = [];
        for (let index = 0; index < listProps.length; index++) {
            const element = listProps[index];
            let prop = element.prop ? element.prop : Math.random();
            if (provinceCode === '33') {
                // 浙江
                if (!JSON.stringify(quanGuo).includes([prop]) && !JSON.stringify(huNan).includes([prop])) {
                    // arr.splice(index, 1);
                    arr.push(element);
                }
            } else if (provinceCode === '43') {
                // 湖南
                if (!JSON.stringify(zheJiang).includes([prop])) {
                    arr.push(element);
                }
            } else if (!JSON.stringify(zheJiang).includes([prop]) && !JSON.stringify(huNan).includes([prop])) {
                // 全国
                arr.push(element);

            }
        }
    }
    return arr;
};

BaseVue.$mount('#app');
