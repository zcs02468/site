import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Checkbox, message } from "antd";
import { createTimingEmail } from "../../../axios/index"

import Style from "./style.module.scss";

interface SendDialogProps {
    visible: boolean;
    onCancel: () => void;
    cancelAll:() => void;
}

interface SendDialogState {
    ModalText: string;
    visible: boolean;
    confirmLoading: boolean;
}
const SendDialog: React.FC<SendDialogProps> = ({ 
    visible,
    onCancel,
    cancelAll
}) => {
    const [checked, setChecked] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm();

    const onCreate = async (values:any) => {
        setConfirmLoading(true);
        const rawContent = localStorage.getItem("letterRawState");
        const htmlContent = localStorage.getItem("letterHtmlState");
        const obj = {
            toEmail: values.toEmail,
            fromTime: values['fromTime'].format('YYYY-MM-DD'),
            open: checked,
            rawContent: rawContent,
            htmlContent: htmlContent,
        }
        const [res] = await createTimingEmail(obj)
        if( res ) {
            setTimeout(()=> {
                setConfirmLoading(false);
                onCancel();
                message.success('创建完成');
                //发送完成清空所有缓存数据
                localStorage.removeItem('letterRawState');
                localStorage.removeItem('letterHtmlState');
                cancelAll();
            },2000)
        }
    }
    const checkboxChange = (e:any) => {
        setChecked(e.target.checked)
    }
    return (
        <Modal
            visible={visible}
            title="发送邮件"
            okText="发送"
            cancelText="取消"
            centered
            onCancel={onCancel}
            confirmLoading={confirmLoading}
            maskClosable={false}
            keyboard={false}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        // form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: "public" }}>
                <Form.Item
                    name="toEmail"
                    label="收信邮箱"
                    rules={[
                        {
                            type: "email",
                            message: "输入的电子邮件无效!",
                        },
                        {
                            required: true,
                            message: "请输入您的电子邮件!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="fromTime" label="收信时间" rules={[{ type: "object", required: true, message: "Please select time!" }]}>
                    <DatePicker showTime format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox onChange={checkboxChange}>允许放入公开信箱</Checkbox>
                    <p>将在某一天匿名、随机出现在公开信箱中</p>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default SendDialog;
