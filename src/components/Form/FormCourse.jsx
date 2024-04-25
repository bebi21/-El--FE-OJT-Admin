import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Select, notification } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../database/firebase";

const { TextArea } = Input;

const FormDisabledDemo = ({ handleClose1 }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (data) => {
    api.open({
      ...data,
    });
  };

  const [form] = Form.useForm();
  const [url, setUrl] = useState("");
  const onFinish = async (values) => {
    if (!url) {
      openNotification({
        type: "error",
        message: "Hãy Thêm Ảnh Vào",
      });
      return;
    }
    const data = {
      ...values,
      teacher_id: +values.teacher_id,
      image: url,
      description: "Chưa có thông tin",
    };
    try {
      await handleCreateCourseApi(data);
      openNotification({
        type: "success",
        message: "Thêm Khóa Học  Thành Công",
      });
      form.resetFields();
      handleClose1();
      setUrl("");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const uniqueName = `${Date.now()}-${image.name}`;
      const storageRef = ref(storage, `images/${uniqueName}`);
      try {
        const imageRef = await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(imageRef.ref);
        setUrl(downloadUrl);
        console.log("Image Uploaded and URL:", downloadUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const [teacher, setTeacher] = useState([]);
  const handleTakeTeacher = async () => {
    const listTeacher = await handleGetAllTeacherApi();
    setTeacher(listTeacher.data);
  };
  useEffect(() => {
    handleTakeTeacher();
  }, []);

  const handleCancle = () => {
    form.resetFields();
    handleClose1();
  };
  return (
    <>
      {contextHolder}
      <Form
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Tên  Khóa Học"
          name="title"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên Thầy Giáo"
          name="teacher_id"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select>
            {teacher.map((item, index) => (
              <Select.Option key={index} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <div className="flex items-center ">
            <input
              className="invisible absolute top-0 z-[-9999]"
              accept="image/*"
              id="file"
              type="file"
              onChange={handleChange}
            />

            {!url && (
              <label htmlFor="file" className="">
                <p className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">
                  Upload Image
                </p>
              </label>
            )}
            {url && (
              <div>
                <img
                  src={url}
                  alt="Uploaded"
                  className="w-[200px]  rounded-md"
                />
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item
          label="Giới Thiệu"
          name="sub_description"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="default" htmlType="submit">
            Submit
          </Button>
          <Button type="default" onClick={handleCancle}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormDisabledDemo;
