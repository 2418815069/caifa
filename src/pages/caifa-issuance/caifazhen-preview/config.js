export const dialogFormConfig = [
    {
        span: 24,
        label: '领证人',
        type: 'input',
        prop: 'lzr',
        rules: [
            { required: true, message: '请输入领证人', trigger: 'blur' },
            { pattern: /^.{1,20}$/, message: '请输入正确格式', trigger: 'blur'}
        ]
    }];

export const linNongFormConfig = [
    {
        label: '上传证件照',
        type: 'upload',
        prop: 'uploadRes'
    }
];
