module.exports = function () {
    return {
        code: 200,
        message: '接口成功',
        data: {
            content: '此处为按钮详情区域',
            content1: '此处为按钮详情区域1',
            content2: '此处为按钮详情区域2',
            content3: '此处为按钮详情区域3',
            content4: '此处为按钮详情区域4',
            btnActions: [
                {
                    title: '特殊程序申请信息',
                    btnName: '挂起',
                    config: [
                        {
                            label: '特殊程序种类',
                            type: 'select',
                            prop: 'key1',
                            placeholder: '请选择特殊程序种类',
                            span: 24,
                            grid: 1,
                            options: [{
                                value: 1,
                                label: '1'
                            }, {
                                value: 2,
                                label: '2'
                            }, {
                                value: 3,
                                label: '2'
                            }, {
                                value: 4,
                                label: '2'
                            }]
                        }, {
                            label: '特殊程序种类名称',
                            type: 'input',
                            placeholder: '请输入特殊程序种类名称',
                            prop: 'key2'
                        }, {
                            label: '特殊程序启动理由或依据',
                            type: 'input',
                            placeholder: '请输入特殊程序启动理由或依据',
                            prop: 'key3'
                        }, {
                            label: '特殊程序时限',
                            type: 'input',
                            placeholder: '请输入特殊程序时限',
                            prop: 'key4'
                        }
                    ],
                    data: {
                        key1: 1,
                        key2: 2,
                        key3: 3,
                        key4: 4
                    }
                },
                {
                    title: '特殊程序结果信息表',
                    btnName: '取消挂起',
                    config: [
                        {
                            label: '特殊程序结果',
                            type: 'input',
                            prop: 'key1',
                            placeholder: '请输入特殊程序结果',
                            span: 24,
                            grid: 1
                        }, {
                            label: '特殊程序办理意见',
                            type: 'input',
                            placeholder: '请输入特殊程序办理意见',
                            prop: 'key2'
                        }
                    ],
                    data: {
                    }
                }
            ]
        }
    };
};
