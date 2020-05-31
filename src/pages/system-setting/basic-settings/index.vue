<script>
import { cloneDeep } from 'lodash';
import {getConfigsExternal, updateConfig} from './api.js';
import { showMessage } from '@/common/util';
export default {
    data() {
        return {
            radio: '',
            items: [
            ]
        };
    },
    components: {

    },
    async created() {
        this.init();
    },
    methods: {
        dataDeal(data) {
            let listArr = [];
            data.forEach((value)=>{
                let obj = [];
                for (let i = 0; i < listArr.length; i++) {
                    // 对比相同的字段key，相同放入对应的数组
                    if (listArr[i][0].itemName === value.itemName) {
                        listArr[i].push(value);
                        return;
                    }
                }
                // 第一次对比没有参照，放入参照
                obj.push(value);
                listArr.push(obj);
            });
            let options = [];
            for (let index = 0; index < listArr.length; index++) {
                let option = listArr[index][0];
                const radios = listArr[index];
                for (let k = 0; k < radios.length; k++) {
                    const radio = cloneDeep(radios[k]);
                    if (radio.isChecked === '1') {
                        option.checked = radio;
                    }
                }
                option.radios = cloneDeep(radios);
                options.push(option);
            }
            return options;
        },
        async init() {
            let datas = await getConfigsExternal();
            this.items = this.dataDeal(datas);
        },
        async handleChange(value) {
            let sendData = {};
            this.items.map(item => {
                item.radios.map(radio => {
                    if (radio.guid === value) {
                        sendData = radio;
                    }
                });
            });
            sendData.isChecked = '1';
            const data = await updateConfig(sendData);
            showMessage(data, () => {
                this.init();
            });
        }
    }
};
</script>

<template>
    <div class="container">
        <div v-for="(item,key) in items" :key="key">
            <div class="title"  v-if="key <= 2">
                <span class="title-item"></span>
                    {{item.configName}}
            </div>
            <div class="item-radio">
                <span class="itemName">{{item.itemName}}:</span>
                <el-radio-group v-model="item.checked.guid" @change="handleChange" class="radioGroup">
                    <el-radio
                        v-for="(option, key) in item.radios"
                        :label="option.guid"
                        :disabled="option.disabled"
                        :key="key"
                    >{{option.itemValue}}</el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
  .container
    overflow-y scroll
  .title
    color:#89bca9
    padding-bottom 30px
  .title-item
    width: 8px;
    display: inline-block;
    height: 20px;
    vertical-align: sub;
    background:#88b780;
    margin-right: 10px;
.item-radio
    padding-bottom 30px
.itemName
    padding-right 20px
.radioGroup /deep/ label
    margin-top 10px
    margin-bottom 10px
</style>
