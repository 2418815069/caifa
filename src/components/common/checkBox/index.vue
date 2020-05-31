<template>
  <div class="main">
  <div style="margin-top: 20px">
    <el-checkbox-group v-model="checkboxGroup1" size="small">
      <el-checkbox v-for="(item,key) in options" :key="key" :label="item.label" border></el-checkbox>
    </el-checkbox-group>
  </div>
  </div>
</template>

<script>
export default {
    name: 'XcheckBox',
    props: {
        value: {
            type: [Array],
            default() {
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
            options: this.prop.options,
            checkboxGroup1: []
        };
    },
    mounted() {
    },
    computed: {

    },
    watch: {
        value: function (value) {
            if (this.prop.isValue) {
                return;
            }
            this.checkboxGroup1 = value;
        },
        checkboxGroup1: {
            handler: function (value, oldValue) {
                if (JSON.stringify(value) === JSON.stringify(oldValue)) {
                    return;
                }
                if (this.prop.isValue) {
                    let arr = [];
                    this.checkboxGroup1.map(x=>{
                        this.options.map(y=>{
                            if (x === y.label) {
                                arr.push(y.value);

                            }
                        });
                    });
                    this.$emit('input', arr);
                    this.$emit('change', arr);
                } else {
                    this.$emit('input', this.checkboxGroup1);
                    this.$emit('change', this.checkboxGroup1);
                }

            }
        }
    },
    methods: {

    },
    async created() {
    }
};
</script>

<style scoped>
</style>
