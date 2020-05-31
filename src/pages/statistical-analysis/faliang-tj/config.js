
export const filterConfig = [
    {
        span: 8,
        label: '申请类型',
        type: 'select',
        prop: 'cfType',
        width: '72px',
        options: [
            {
                label: '全部',
                value: '0'
            },
            {
                label: '占限额计划',
                value: '1'
            },
            {
                label: '仅占限额',
                value: '2'
            },
            {
                label: '不占限额',
                value: '3'
            },
            {
                label: '专项追加限额',
                value: '4'
            }
        ]
    }, {
        span: 16,
        width: '85px',
        label: '统计单位',
        type: 'danWei',
        prop: 'xzCode'
    }, {
        span: 8,
        label: '统计内容',
        type: 'select',
        prop: 'contentOption',
        width: '72px',
        options: [
            {
                label: '采伐蓄积与出材',
                value: 'xuji'
            },
            {
                label: '采伐蓄积与面积',
                value: 'mianji'
            }
        ]
    },
    {
        label: '发放量日期',
        type: 'dataPickter2',
        width: '85px',
        prop: 'qianFaTime',
        dateType: 'date',
        valueFormat: 'yyyy-MM-dd',
        allProps: ['beginDate', 'endDate'],
        placeholder: '请选择申报日期',
        span: 16
    }, {
        span: 8,
        label: '统计范围',
        type: 'select',
        prop: 'sxOption',
        width: '72px',
        options: [
            {
                label: '市',
                value: '1'
            },
            {
                label: '县',
                value: '0'
            }
        ]
    }
];

export const listPropsConfig = [
    {
        label: '采伐蓄积与出材发证量统计表',
        needReturnHtml: true,
        option: [
            {
                label: '',
                width: '0px'
            },
            {
                label: '单位',
                prop: 'c_mc',
                returnHtml: function (row) {
                    if (String(row.qi_yuan_mc).includes('合计')) {
                        return `<div>${row.c_mc}合计</div>`;
                    }
                    return `<div>${row.c_mc}</div>`;
                }
            },
            {
                label: '权属',
                prop: 'lin_quan_mc',
                returnHtml: function (row) {
                    return `<div>${row.lin_quan_mc}</div>`;
                }
            },
            {
                label: '起源',
                prop: 'qi_yuan_mc',
                returnHtml: function (row) {
                    return `<div>${row.qi_yuan_mc}</div>`;
                }
            }, {
                label: '发证份数',
                prop: 'fenshu',
                returnHtml: function (row) {
                    return `<div>${row.fenshu}</div>`;
                }
            },
            // {
            //     label: '合计',
            //     option: [
            //         {
            //             label: '蓄积',
            //             returnHtml: function (row, index) {
            //                 console.log(row, index);
            //                 return `<div>${Number(row.splzl + row.gylzl).toFixed(2)}</div>`;
            //                 // return Number(row.splzl + row.gylzl).toFixed(2);
            //             }
            //             // format: function (index, row) {
            //             //     console.log(index, row);
            //             //     return Number(row.splzl + row.gylzl).toFixed(2);
            //             // }
            //         }, {
            //             label: '出材',
            //             format: function (index, row) {
            //                 return Number(row.splzlcc + row.gylzlcc).toFixed(2);
            //             }
            //         }
            //     ]
            // },
            {
                label: '商品林',
                // needReturnHtml: true,
                option: [
                    {
                        label: '合计',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splzl',
                                returnHtml: function (row) {
                                    return `<div>${row.splzl}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'splzlcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splzlcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '主伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splzf',
                                returnHtml: function (row) {
                                    return `<div>${row.splzf}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'splzfcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splzfcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '抚育采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splfy',
                                returnHtml: function (row) {
                                    return `<div>${row.splfy}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'splfycc',
                                returnHtml: function (row) {
                                    return `<div>${row.splfycc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '低产林改造',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splqtdg',
                                returnHtml: function (row) {
                                    return `<div>${row.splqtdg}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'splqtdgcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splqtdgcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '其他采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splqt',
                                returnHtml: function (row) {
                                    return `<div>${row.splqt}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'splqtcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splqtcc}</div>`;
                                }
                            }
                        ]
                    }
                ]
            }, {
                label: '生态公益林',
                option: [
                    {
                        label: '合计',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylzl',
                                returnHtml: function (row) {
                                    return `<div>${row.gylzl}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'gylzlcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylzlcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '更新采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylgx',
                                returnHtml: function (row) {
                                    return `<div>${row.gylgx}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'gylgxcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylgxcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '抚育采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylfy',
                                returnHtml: function (row) {
                                    return `<div>${row.gylfy}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'gylfycc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylfycc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '低产林改造',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylqtdg',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqtdg}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'gylqtdgcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqtdgcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '其他采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylqt',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqt}</div>`;
                                }
                            }, {
                                label: '出材',
                                prop: 'gylqtcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqtcc}</div>`;
                                }
                            }
                        ]
                    }
                ]
            }, {
                label: '毛竹',
                prop: 'zhucai',
                returnHtml: function (row) {
                    return `<div>${row.zhucai}</div>`;
                }
            }]
    }
];


export const mianJiListPropsConfig = [
    {
        label: '采伐蓄积与面积发证量统计表',
        needReturnHtml: true,
        option: [
            {
                label: '',
                width: '0px'
            },
            {
                label: '单位',
                prop: 'c_mc',
                needReturnHtml: true,
                returnHtml: function (row) {
                    if (String(row.qi_yuan_mc).includes('合计')) {
                        return `<div>${row.c_mc}合计</div>`;
                    }
                    return `<div>${row.c_mc}</div>`;
                }
            },
            {
                label: '权属',
                prop: 'lin_quan_mc',
                returnHtml: function (row) {
                    return `<div>${row.lin_quan_mc}</div>`;
                }
            },
            {
                label: '起源',
                prop: 'qi_yuan_mc',
                returnHtml: function (row) {
                    return `<div>${row.qi_yuan_mc}</div>`;
                }
            }, {
                label: '发证份数',
                prop: 'fenshu',
                returnHtml: function (row) {
                    return `<div>${row.fenshu}</div>`;
                }
            },
            // {
            //     label: '合计',
            //     option: [
            //         {
            //             label: '蓄积',
            //             returnHtml: function (row, index) {
            //                 console.log(row, index);
            //                 return `<div>${Number(row.splzl + row.gylzl).toFixed(2)}</div>`;
            //                 // return Number(row.splzl + row.gylzl).toFixed(2);
            //             }
            //             // format: function (index, row) {
            //             //     console.log(index, row);
            //             //     return Number(row.splzl + row.gylzl).toFixed(2);
            //             // }
            //         }, {
            //             label: '出材',
            //             format: function (index, row) {
            //                 return Number(row.splzlcc + row.gylzlcc).toFixed(2);
            //             }
            //         }
            //     ]
            // },
            {
                label: '商品林',
                option: [
                    {
                        label: '合计',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splzl',
                                returnHtml: function (row) {
                                    return `<div>${row.splzl}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'splzlcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splzlcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '主伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splzf',
                                returnHtml: function (row) {
                                    return `<div>${row.splzf}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'splzfcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splzfcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '抚育采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splfy',
                                returnHtml: function (row) {
                                    return `<div>${row.splfy}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'splfycc',
                                returnHtml: function (row) {
                                    return `<div>${row.splfycc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '低产林改造',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splqtdg',
                                returnHtml: function (row) {
                                    return `<div>${row.splqtdg}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'splqtdgcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splqtdgcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '其他采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'splqt',
                                returnHtml: function (row) {
                                    return `<div>${row.splqt}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'splqtcc',
                                returnHtml: function (row) {
                                    return `<div>${row.splqtcc}</div>`;
                                }
                            }
                        ]
                    }
                ]
            }, {
                label: '生态公益林',
                option: [
                    {
                        label: '合计',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylzl',
                                returnHtml: function (row) {
                                    return `<div>${row.gylzl}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'gylzlcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylzlcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '更新采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylgx',
                                returnHtml: function (row) {
                                    return `<div>${row.gylgx}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'gylgxcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylgxcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '抚育采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylfy',
                                returnHtml: function (row) {
                                    return `<div>${row.gylfy}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'gylfycc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylfycc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '低产林改造',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylqtdg',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqtdg}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'gylqtdgcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqtdgcc}</div>`;
                                }
                            }
                        ]
                    }, {
                        label: '其他采伐',
                        option: [
                            {
                                label: '蓄积',
                                prop: 'gylqt',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqt}</div>`;
                                }
                            }, {
                                label: '面积',
                                prop: 'gylqtcc',
                                returnHtml: function (row) {
                                    return `<div>${row.gylqtcc}</div>`;
                                }
                            }
                        ]
                    }
                ]
            }, {
                label: '毛竹',
                prop: 'zhucai',
                returnHtml: function (row) {
                    return `<div>${row.zhucai}</div>`;
                }
            }]
    }
];

