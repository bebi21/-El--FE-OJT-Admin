import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, Input, Modal, Popconfirm } from "antd";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CKEditorComponent from "../CkEditor/CKeditor";
import { useParams } from "react-router-dom";
import publicAxios from "../../database/publicAxios";
import { useDispatch, useSelector } from "react-redux";
import { newVideo } from "../Redux/counterVideo/counterVideo";
/* 
const data = [
  {
    id: 1,
    title: "1.Bắt đầu",
    lessons: [
      {
        id: 1,
        title: "Bài 1",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 2,
        title: "Bài 2",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 3,
        title: "Bài 3",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
    ],
  },
  {
    id: 2,
    title: "2. Làm Quen  với HTML",
    lessons: [
      {
        id: 4,
        title: "Bài 1",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 5,
        title: "Bài 2",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 6,
        title: "Bài 3",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
    ],
  },
  {
    id: 3,
    title: "3. Thẻ Tiêu Để",
    lessons: [
      {
        id: 1,
        title: "Bài 1",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 2,
        title: "Bài 2",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 3,
        title: "Bài 3",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
    ],
  },
  {
    id: 4,
    title: "4.Thẻ Đoạn Văn",
    lessons: [
      {
        id: 4,
        title: "Bài 1",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 5,
        title: "Bài 2",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 6,
        title: "Bài 3",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
    ],
  },
  {
    id: 5,
    title: "5.Chữ đậm  chữ nghiêng",
    lessons: [
      {
        id: 1,
        title: "Bài 1",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 2,
        title: "Bài 2",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 3,
        title: "Bài 3",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
    ],
  },
  {
    id: 6,
    title: "6.  Thẻ Blog và Inline.",
    lessons: [
      {
        id: 4,
        title: "Bài 1",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 5,
        title: "Bài 2",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        id: 6,
        title: "Bài 3",
        description: "ádasdasdasdasdas",
        video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
    ],
  },
]; */

const TestColap = ({check , handleVideo}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [brandData,setBrandData] = useState([])
  const [form] = Form.useForm();
  const { id } = useParams();
  const [oldValue,setOldValue] = useState("")
  const [valueCkeditor,setValueCkeditor] = useState('')
  const dispatch = useDispatch()


  const takeDataInDb  = async () => {
    const data = await publicAxios.get(`/courses/findCourseByIdAdmin/${id}`);
   const newData = data.data.chapters
     setBrandData(newData)
  }
  useEffect(() => {
    takeDataInDb()
  }, [check])

  const showModal = (item) => {
    form.setFieldsValue(item);
    setOldValue(item.description)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const newData = {
      ...values,
      id: +values.id,
      description: valueCkeditor,
    }
   try {
    await publicAxios.put(`/lesson/update/${newData.id}`, newData);
    form.resetFields();
    setOldValue("")
    setIsModalOpen(false);
   } catch (error) {
    console.log(error)
    
   }
  };

  const handleCloseEditLesson = () => {
    form.resetFields();
    setOldValue("")
    setIsModalOpen(false);
  };



  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleGetValue = (value) => {
    setValueCkeditor(value);
  };

  // logic xóa khóa học
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [removeItem, setRemoveItem] = useState("")

  const showModal1 = (item) => {
    setRemoveItem(+item.id)
    setIsModalOpen1(true);
  };

  const handleOk1 = async () => {
  
  
    try {
      await publicAxios.delete(`/lesson/delete/${removeItem}`);
      setIsModalOpen1(false);
      setRemoveItem("")
      takeDataInDb()
      
    } catch (error) {
      console.log(error)
      
    }
  };

  const handleCancel1 = () => {
    setRemoveItem("")
    setIsModalOpen1(false);
  };
  return (
    <>
      <Modal
        title="Sửa khóa học"
        okType="default"
        maskClosable={false}
        open={isModalOpen}
      
      
       
        style={{ left: "150px" }}
        width={1000}
        footer={false}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 1000, right: "150px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item
            hidden
            label="id"
            name="id"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
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
            rules={[{ required: true, message: "Nhập link video" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bài Học"
           
          
          >
            <CKEditorComponent getValue={handleGetValue} oldValue={oldValue} />

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="default" htmlType="submit">
              Submit
            </Button>
            <Button type="default" onClick={handleCloseEditLesson}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Bạn  có muốn xóa khóa học không ?"
        maskClosable={false}
        okType="default"
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      ></Modal>
      {
        isModalOpen2 && <Modal
          title="Sửa khóa học"
          maskClosable={false}
          okType="default"
          open={isModalOpen2}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item hidden label="id" name="id">
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên  Chương Học"
              name="title"
              rules={[
                { required: true, message: "Hãy  nhập  tên  Chương học" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ghi  chú"
              name="description"
              rules={[{ required: true, message: "Hãy  nhập  ghi  chú" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="default" htmlType="submit">
                Submit
              </Button>
              <Button
                type="default"
                htmlType="submit"
                onClick={() => setIsModalOpen2(false)}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      }

      <Collapse>
        {brandData.map((item, index) => (
          <Collapse.Panel
            header={
              <>
                <div className="flex justify-between items-center">
                  <h2 className="overflow-hidden max-w-[80%]">{item.title}</h2>
                  <MdEdit style={{ cursor: "pointer",width:"20px",height:"20px"}} onClick={(e) => {
                       e.stopPropagation()
                    setIsModalOpen2(item)}} />
                </div>
              </>
            }
            key={index}
          >
            {item.lessons.map((item1, index) => (
              <div
                key={index}
                className="flex justify-between hover:bg-slate-300 "
               onClick={() => {
                handleVideo(item1.video);
               }}
              >
                <h2>{item1.title}</h2>
                <div className="flex justify-center items-center gap-2">
                  <MdEdit onClick={(e) => {
                     e.stopPropagation();
                    showModal(item1)}} />
                  <MdDelete  onClick={(e) => {
                     e.stopPropagation();
                    showModal1(item1)}}/>
                </div>
              </div>
            ))}
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
};

export default TestColap;
