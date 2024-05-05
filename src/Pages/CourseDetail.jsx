import { Divider, Modal, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useParams } from "react-router-dom";
import TestColap from "../components/Form/Test";
import FormAddChapter from "../components/Form/FormAddChapter";
import FormAddLesson from "../components/Form/FormAddLession";
import ReactPlayer from "react-player";
import { handleFindCourseByIdApi } from "../api/course";
const Lession = () => {
  const { id } = useParams();
  const [videoLink, setVideoLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [check, setCheck] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (text) => {
    api.success({
      message: "Thành Công",
      description: text,
      duration: 1,
    });
  };
  /* call api  */
  const [brandData, setBrandData] = useState([]);
  const takeDataInDb = async () => {
    const data = await handleFindCourseByIdApi(id);
    const newData = data.data?.chapters;
    setBrandData(newData);
    if (newData?.length > 0) {
      setVideoLink(newData[0].lessons[0].video);
    }
  };
  useEffect(() => {
    takeDataInDb();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleVideo = (link) => {
    setVideoLink(link);
  };
  const handleOk = async () => {
    const text = "Thay đổi trạng thái thành công";
    openNotificationWithIcon(text);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  /* drawer */

  const handleCloseChapter = () => {
    setCheck(!check);
    takeDataInDb();
    setIsModalOpen(false);
  };
  const handleCloseLesson = () => {
    setCheck(!check);
    takeDataInDb();
    setIsModalOpen1(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        maskClosable={false}
        title="Thêm  Chương Học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="default"
        width={600}
        footer={null}
      >
        <FormAddChapter handleCloseChapter={handleCloseChapter} />
      </Modal>
      <Modal
        maskClosable={false}
        title="Thêm Bài Học"
        open={isModalOpen1}
        onCancel={handleCancel1}
        style={{ left: "150px" }}
        width={1000}
        footer={null}
      >
        <FormAddLesson handleCloseLesson={handleCloseLesson} />
      </Modal>
      <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center">
          {" "}
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Bài Học
          </h4>
          <div className="flex gap-2">
            {" "}
            <div className="mb-6">
              <button
                onClick={showModal}
                className=" flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                <CiCirclePlus />
                Thêm Chương Học
              </button>
            </div>
            <div className="mb-6">
              {" "}
              <button
                onClick={() => setIsModalOpen1(true)}
                className=" flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
              >
                <CiCirclePlus />
                Thêm Bài Học
              </button>
            </div>
          </div>
        </div>

        <Divider style={{ border: "0.1px solid #d9d9d9" }} />
        <div className="grid grid-cols-6 gap-4 h-[70vh] overflow-auto relative ">
          <div className="col-span-4">
            {" "}
            <ReactPlayer url={videoLink} width="100%" />
          </div>
          <div className="col-span-2 overflow-scroll">
            {/*  <DrawerCourse /> */}
            <TestColap check={check} handleVideo={handleVideo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lession;
