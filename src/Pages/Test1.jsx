import { Modal, Pagination, Radio, notification } from "antd";
import { useEffect, useState } from "react";

/* fake data */
const brandData = [
  {
    id: 1,
    fullname: "loc",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: 1,
  },
  {
    id: 2,
    fullname: "loc",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: null,
  },
  {
    id: 1,
    fullname: "loc",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: 1,
  },
  {
    id: 2,
    fullname: "loc",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: null,
  },
  {
    id: 1,
    fullname: "loc1",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: null,
  },
  {
    id: 2,
    fullname: "loc2",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: 1,
  },
  {
    id: 1,
    fullname: "lo3c",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: 1,
  },
  {
    id: 2,
    fullname: "lo4c",
    phone: "0123456789",
    create_date: "2022-07-01",
    active: 1,
  },
];
const TableUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api.success({
      message: "Thành Công",
      description: "Thay đổi trạng thái thành công",
      duration: 1,
    });
  };
  /* call api  */
  /*  const [brandData,setBrandData] = useState([])
   */
  /* const takeDataInDb  = async () => {
    const data = await publicAxios.get("/takeAllUser")
    setBrandData(data.data)
  }
  useEffect(() => {
    takeDataInDb()
  }, []) */
  const showModal = () => {
    setStatus(item);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    /*   const data = await publicAxios.put(`/changeStatusUser/${status?.id}`, {
      active: status?.active,
    }); */
    openNotificationWithIcon();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setStatus("");
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    setStatus({ ...status, active: e.target.value });
  };

  /* phân trang */

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // số lượng items mỗi trang

  // Tạo một state mới để lưu trữ dữ liệu hiển thị trên trang hiện tại
  const [currentBrandData, setCurrentBrandData] = useState([]);

  // Hàm này sẽ được gọi mỗi khi trang thay đổi
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentBrandData(brandData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage]);

  // Hàm này sẽ được gọi khi người dùng thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <Radio.Group onChange={onChange} value={status?.active} name="active">
          <Radio value={1}>Mở hoạt động</Radio>
          <Radio value={null}>Ngừng hoạt động</Radio>
        </Radio.Group>
      </Modal>

      <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Quản Lý Người Dùng
        </h4>

        <div className="flex flex-col h-[68vh] relative ">
          <div className="py-[10px] grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5  text-center xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                STT
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên Người Dùng
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Số Điện Thoại
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Ngày Tạo
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Trạng thái
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-2">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Chức năng
              </h5>
            </div>
          </div>
          {currentBrandData.length > 0 &&
            currentBrandData.map((brand, key) => (
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
                    {brand.fullname}
                  </p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-8">
                  <p className="text-black dark:text-white">{brand.phone}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{brand.create_date}</p>
                </div>
                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  {brand.active === 1 ? (
                    <>
                      <p className="text-green-600 font-bold">Đang Hoạt Động</p>
                    </>
                  ) : (
                    <>
                      {" "}
                      <p className="text-red-600 font-bold  ">
                        Ngừng Hoạt Động
                      </p>
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
            ))}
          <div className="absolute flex justify-center left-[25%] bottom-[40px]">
            <Pagination
              showQuickJumper
              current={currentPage}
              onChange={handlePageChange}
              pageSize={itemsPerPage}
              total={500}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableUser;
