import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import publicAxios from "../../database/publicAxios";
import { useParams } from "react-router-dom";

const FormAddLesson = ({ handleCloseLesson }) => {
  const { id } = useParams();
  const [brandData, setBrandData] = useState([]);

  const takeDataInDb = async () => {
    const data = await publicAxios.get(`/courses/findCourseByIdAdmin/${id}`);
    const newData = data.data.chapters;
    setBrandData(newData);
  };
  useEffect(() => {
    takeDataInDb();
  }, []);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const newData = {
      ...values,
      chapter_id: +values.chapter_id[0],
    };
    try {
      await publicAxios.post(`/lesson/create`, newData);
      form.resetFields();
      handleCloseLesson();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleGetValue = (value) => {
    console.log("value", value);
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 1000, right: "150px" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelAlign="left"
    >
      <Form.Item
        label="Tên Chương Học"
        name="chapter_id"
        rules={[{ required: true, message: "Hãy Chọn Chương Học" }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          maxCount={1}
        >
          {brandData.map((item, index) => {
            return (
              <Select.Option key={index} value={item.id}>
                {item.title}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tên  Bài Học "
        name="title"
        rules={[{ required: true, message: "Nhập tên  bài  học " }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Video"
        name="video"
        rules={[{ required: true, message: "Nhập link video" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ghi chú"
        name="document"
        rules={[{ required: true, message: "Nhập Ghi Chú" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="default" htmlType="submit">
          Submit
        </Button>
        <Button
          type="default"
          onClick={() => {
            handleCloseLesson();
          }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormAddLesson;
