<template>
  <div class="main">
    <el-autocomplete
    v-model="input"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
    name: 'XautoComplete',
    props: {
        value: {
            type: [String],
            default: () => {
                return '';
            }
        },
        data: {
            type: Object,
            default() {
                return {};
            }
        },
        prop: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            input: this.value || ''
        };
    },
    watch: {
        input: function (val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value: function (val) {
            this.input = val;
        }
    },
    methods: {
        async querySearchAsync(queryString, cb) {
            const options = await this.prop.querySearchAsync(queryString);
            cb(options);
        }
    },
    async created() {
    }
};
</script>

<style scoped>
</style>
