<!--
 * @Description: 公共table
 * @Version: 2.0
 * @Autor: xiongchuanyu
 * @Date: 2019-06-07 14:23:21
 * @LastEditors: litesun
 * @LastEditTime: 2019-07-27 01:09:22
 -->
<template>
    <section class="main">
        <el-table
                :row-key="listConfig.rowKey"
                :data="list"
                :stripe="listConfig.stripe"
                :size="listConfig.size"
                :style="listConfig.style"
                :height="height"
                :span-method="listConfig.arraySpanMethod"
                :max-height="maxHeight"
                :border="listConfig.border"
                :highlight-current-row="listConfig.highlightCurrentRow"
                @current-change="tableCurrentChange"
                class="xcy-list-table"
                id="xcy-table"
                @selection-change="handleSelectionChange"
                @select="handleSelected"
                @select-all="handleSelectAll"
                ref="elTable"
        >
            <el-table-column align="center" v-if="listConfig.hasExpand" type="expand">
                <template slot-scope="scope">
                    <slot :data="scope.row"/>
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="listConfig.hasSelection" type="selection"></el-table-column>
            <el-table-column
                    align="center"
                    v-for="(prop, index) in setProps"
                    :key="index"
                    :prop="prop.prop"
                    :label="prop.label"
                    :width="prop.width"
                    :min-width="prop.minWidth"
                    :fixed="prop.fixed"
                    :sortable="prop.sortable"
                    :filters="prop.filters"
                    :filter-method="prop.filterHandler"
                    :render-header="prop.randerheader"
                    :show-overflow-tooltip="prop.showOverflowTooltip"
            >
                <child-titless v-if="prop.needReturnHtml" :list="prop.option"></child-titless>
                <child-titles v-else-if="!prop.needReturnHtml" :list="prop.option"></child-titles>
                <template slot-scope="scope">
                    <div v-show="prop.formatActions">
                        <el-button
                                v-for="(actionItem, index) in prop.formatActions ? prop.formatActions(scope.row) : prop.actions"
                                :key="actionItem.type || index"
                                @click.native.prevent="action(scope.row, actionItem, scope.$index)"
                                :type="actionItem.type || 'text'"
                                :size="actionItem.size || 'small'"
                                data-clipboard-text="asdadad"
                        >{{actionItem.label}}
                        </el-button>
                    </div>
                    <p v-if="prop.format">{{prop.format(scope.row[prop.prop], scope.row, scope)}}</p>
                    <p v-else-if="prop.component">
                        <el-input v-model="scope.row[prop.prop]" v-if="prop.component === 'input'"/>
                        <el-checkbox v-model="scope.row[prop.prop]" v-if="prop.component === 'checkbox'"></el-checkbox>
                    </p>
                    <div v-else-if="prop.returnHtml">
                        <div v-html="prop.returnHtml(scope.row,scope.$index)"></div>
                    </div>
                    <p v-else-if="prop.clickActions">
                        <el-button
                                v-for="(clickActionsItem, index) in prop.clickActions ? prop.clickActions(scope.row) : prop.actions"
                                :key="clickActionsItem.type || index"
                                @click.native.prevent="clickAction(scope.row, clickActionsItem, scope.$index)"
                                :type="clickActionsItem.type || 'text'"
                                :size="clickActionsItem.size || 'small'"
                                data-clipboard-text="asdadad"
                        >{{scope.row[prop.prop]}}
                        </el-button>
                    </p>
                    <p v-else>{{scope.row[prop.prop]}}</p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-if="hasPager && data.total > 0"
                class="xcy-list-page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagerInfo.currentPage || pagerInfo.pageNo"
                :page-sizes="pagerInfo.pageSizes || [5, 10, 20, 50]"
                :page-size="pagerInfo.pageSize"
                :layout="pagerInfo.layout || 'total, prev, pager, next, jumper'"
                :total="data.total"
        ></el-pagination>
    </section>
</template>

<script>
import childTitles from '../common/recursion-list/index';
import childTitless from '../common/recursion-list2/index';

export default {
    name: 'xcy-list',
    components: {
        childTitles,
        childTitless
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        badge: {
            default: ''
        },
        data: {
            type: [Object, Array],
            default() {
                return {
                    list: [],
                    total: 0
                };
            }
        },
        props: {
            type: Array,
            default() {
                return [];
            }
        },
        config: {
            type: [Object, Array],
            default() {
                return {};
            }
        },
        hasPager: {
            type: Boolean,
            default: true
        },
        pagerInfo: {
            type: Object,
            default() {
                return {};
            }
        },
        height: {
            type: Number
        },
        maxHeight: {
            type: Number
        }
    },
    data() {
        return {
            selection: [],
            isLayout: false
        };
    },
    computed: {
        listConfig() {
            return {
                size: 'small',
                stripe: true,
                style: 'width: 100%',
                hasIndex: false,
                hasSelection: false,
                border: true,
                ...this.config
            };
        },
        list() {
            let list = [];
            if (this.data instanceof Array) {
                list = this.data;
            } else if (this.data instanceof Object) {
                list = this.data.list || [];
            }
            return list;
        },
        setProps() {
            return this.$setListProps(this.$root.provinceCode, this.props);
        }
    },
    methods: {
        handleSizeChange(value) {
            const pagerInfo = {};
            if (this.pagerInfo.pageNo) {
                pagerInfo.pageNo = 1;
            } else {
                pagerInfo.currentPage = 1;
            }
            this.$emit('updatePagerInfo', {
                ...this.pagerInfo,
                ...pagerInfo,
                pageSize: value
            });
        },
        handleCurrentChange(value) {
            const pagerInfo = {};
            if (this.pagerInfo.pageNo) {
                pagerInfo.pageNo = value;
            } else {
                pagerInfo.currentPage = value;
            }
            this.$emit('updatePagerInfo', {
                ...this.pagerInfo,
                ...pagerInfo
            });
        },
        tableCurrentChange(currentRow) {
            this.$emit('tableCurrentChange', currentRow);
        },
        handleSelectionChange(value) {
            if (!this.config.hasSelection) {
                return;
            }
            this.selection = value;
            this.$emit('selectionChange', value);
        },
        handleSelected(value) {
            if (!this.config.hasSelection) {
                return;
            }
            this.selection = value;
            this.$emit('selected', value);
        },
        handleSelectAll(data) {
            this.$emit('selectAll', data);
        },
        /**
             * 向上传递操作时间
             * @param  {[type]} scope list单条数据
             * @param  {[type]} prop  操作类型
             * @param {[index]} index 所引
             */
        action(scope, prop, index) {
            this.$emit('action', {
                action: prop.action,
                data: scope,
                index
            });
        },
        clickAction(scope, prop, index) {
            this.$emit('clickAction', {
                action: prop.action,
                data: scope,
                index
            });
        }
    },
    mounted() {
        console.log(789);
        console.log(this.setProps);
    },
    watch: {
        selection: function (newValue) {
            this.$emit('selectionChange', newValue);
        }
    }
};
</script>

<style lang="postcss" scoped>
    .xcy-list-page {
        margin-top: 20px;
        text-align: right;
    }

    .main {
        width: 100%;
    }

    .router-link {
        color: #ff6325;
    }

    p {
        margin: 0;
        display: inline-block;
    }

    .tooltip-text {
        display: block;
    }

    .list-error {
        display: block;
        text-align: center;
        font-size: 14px;
        color: 14px;
    }

    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

    .edit-cell {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .edit-input {
        width: 60%;
        min-width: 60px;
    }

    .edit-btn-group {
        margin-left: 8px;

    /deep/ .el-button--small {
        padding: 0;
    }

    }
</style>
