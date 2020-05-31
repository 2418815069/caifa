import xcyForm from './index.vue';
import xcyFormQuery from './query.vue';

/* istanbul ignore next */
xcyForm.install = function (Vue) {
    Vue.component(xcyForm.name, xcyForm);
    Vue.component(xcyFormQuery.name, xcyFormQuery);
};

export default xcyForm;
