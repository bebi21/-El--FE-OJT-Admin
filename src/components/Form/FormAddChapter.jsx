import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useParams } from "react-router-dom";
import publicAxios from "../../database/publicAxios";

const FormAddChapter = ({ handleCloseChapter }) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data) => {
    api.open({
      ...data,
    });
  };
  const onFinish = async (values) => {
    const data = {
      ...values,
      course_id: +id,
    };
    try {
      await publicAxios.post("/chapter/create", data);
      openNotification({
        type: "success",
        message: "Thêm Chương Học  Thành Công",
      });
      form.resetFields();
      handleCloseChapter();
    } catch (error) {
      return error;
    }
  };

  const onFinishFailed = (errorInfo) => {
    return errorInfo;
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên bài học"
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ghi chú"
          name="description"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="default" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            onClick={() => {
              handleCloseChapter();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAddChapter;
