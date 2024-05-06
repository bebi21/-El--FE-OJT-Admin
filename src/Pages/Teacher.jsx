import React from 'react'
import { Modal, Pagination, Radio, notification } from "antd";
import { useEffect, useState } from "react";
import publicAxios from "../database/publicAxios";
export default function Teacher() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState();
    const [api, contextHolder] = notification.useNotification();
    const [teacherData, setTeacherData] = useState([]);
    const openNotificationWithIcon = () => {
        api.success({
          message: "Thành Công",
          description: "Thay đổi trạng thái thành công",
          duration: 1,
        });
      };

      const showModal = (item) => {
        setStatus(item);
        setIsModalOpen(true);
      };

      const handleOk = async () => {
        // const data = {
        //   is_active: status?.change_active,
        //   id: status?.id,
        // };
        // const response = await publicAxios.put("/users/updateStatus/", data);
        // handlePaginationRenderOne();
        // openNotificationWithIcon();
        // setIsModalOpen(false);
      };
      useEffect(() => {
        // handlePaginationRenderOne();
      }, []);

      const handleCancel = () => {
        setStatus("");
        setIsModalOpen(false);
      };

      const onChange = (e) => {
        setStatus({ ...status, change_active: e.target.value });
      };


  return (
    <>
         {contextHolder}
      <Modal
        maskClosable={false}
        title="Thông Tin Người Dùng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="default"
      >
        <Radio.Group
          onChange={onChange}
          value={status?.change_active}
          // name="active"
        >
          <Radio value={true}>Mở hoạt động</Radio>
          <Radio value={false}>Ngừng hoạt động</Radio>
        </Radio.Group>
      </Modal>

      <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Quản Lý Giáo Viên
        </h4> 
        <div className="flex flex-col h-[68vh] relative ">
          <div className="py-[10px] grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5  text-center xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                STT
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Ảnh
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Giới thiệu
              </h5>
            </div>
           
            <div className="hidden p-2.5 text-center sm:block xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Chức năng
              </h5>
            </div>
          </div>
          {/* {teacherData.data?.map((brand, key) => (
            <div
              className={
                "grid grid-cols-3 sm:grid-cols-6 text-[14px] hover:bg-slate-50"
              }
              key={key}
            >
              <div className="flex justify-center items-center p-2.5 ">
                <p className="hidden text-black  dark:text-white sm:block">
                  {key + 1}
                </p>
              </div>
              <div className="flex justify-center items-center p-2.5 mr-[27px]">
                <p className="hidden text-black  dark:text-white sm:block">
                  {brand.full_name}
                </p>
              </div>
              <div className="flex items-center justify-start p-2.5 xl:p-8">
                <p className="text-black dark:text-white">{brand.phone}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{brand.create_date}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                {brand.is_active === true ? (
                  <>
                    {" "}
                    <p className="text-green-600 font-bold">Đang Hoạt Động</p>
                  </>
                ) : (
                  <>
                    {" "}
                    <p className="text-red-600 font-bold  ">Ngừng Hoạt Động</p>
                  </>
                )}
              </div>
              <div className="  flex items-center justify-start ml-[40px]">
                <p
                  onClick={() => showModal(brand)}
                  className="text-black cursor-pointer px-[20px] py-[7px] rounded-md hover:bg-slate-500 hover:text-white bg-slate-200"
                >
                  Chỉnh Sửa
                </p>
              </div>
            </div>
          ))} */}
          <div className="absolute flex justify-center left-[35%] bottom-[40px]">
            {/* <Pagination
              onChange={handlePagination}
              defaultCurrent={1}
              pageSize={brandData?.itemByPage}
              total={totalPage}
              showSizeChanger={false}
            /> */}
          </div>
        </div>
      </div>

    </>
  )
}
