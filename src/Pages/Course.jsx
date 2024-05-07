import { Modal, Pagination, notification } from "antd";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import FormDisabledDemo from "../components/Form/FormCourse";
import { NavLink } from "react-router-dom";
import publicAxios from "../database/publicAxios";
import FormEdit from "../components/Form/FormCourseEdit";
import { getALlCourseApi } from "../api/course";
const TableCourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [itemEdit, setItemEdit] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const openNotificationWithIcon = () => {
    api.success({
      message: "Thành Công",
      description: "Thay đổi trạng thái thành công",
      duration: 1,
    });
  };
  /* call api  */
  const [brandData, setBrandData] = useState([]);

  const takeDataInDb = async () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const data = await getALlCourseApi();

    setBrandData(data.data);
    console.log(data.data);
    setCurrentBrandData(data.data.slice(indexOfFirstItem, indexOfLastItem));
  };
  useEffect(() => {
    takeDataInDb();
  }, []);
  const showModal = (item) => {
    setItemEdit(item);
    setIsModalOpen(true);
  };
  const handleClose1 = () => {
    setIsModalOpen1(false);
    takeDataInDb();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    takeDataInDb();
  };
  /* phân trang */
  // số lượng items mỗi trang
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
      {isModalOpen && (
        <Modal
          maskClosable={false}
          title="Thay đổi trạng thái"
          open={isModalOpen}
          footer={null}
          width={600}
          style={{ left: "150px" }}
        >
          <FormEdit data1={itemEdit} handleClose={handleClose} />
        </Modal>
      )}
      <Modal
        title="Thêm Khóa Học"
        maskClosable={false}
        okType="default"
        width={600}
        footer={null}
        style={{ left: "150px" }}
        open={isModalOpen1}
      >
        <FormDisabledDemo handleClose1={handleClose1} />
      </Modal>
      <div className=" h-[80vh] rounded-sm border border-stroke bg-white px-5 pt-4 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center">
          {" "}
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Quản Lý Khóa Học
          </h4>
          <div className="mb-6">
            <button
              onClick={() => setIsModalOpen1(true)}
              className=" flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              <CiCirclePlus />
              Thêm Khóa Học
            </button>
          </div>
        </div>
        <div className="flex flex-col max-h-[80vh] relative ">
          <div className="py-[10px] grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-1 text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên Khóa Học
              </h5>
            </div>
            <div className="p-1 text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Thầy Giáo
              </h5>
            </div>
            <div className="hidden p-1 text-center sm:block">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Ảnh
              </h5>
            </div>
            <div className="hidden p-1 text-center sm:block">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Trạng Thái
              </h5>
            </div>
            <div className="hidden p-1 text-center sm:block">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {" "}
                Chức năng
              </h5>
            </div>{" "}
            <div className="hidden p-1 text-center sm:block">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nội Dung
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
                <div className="flex justify-center items-center p-2.5 mr-[27px]">
                  <p className="hidden text-black  dark:text-white sm:block">
                    {brand.title}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5">
                  <p className="text-black dark:text-white font-bold">
                    {brand.teacher.name}
                  </p>
                </div>
                <div className="flex items-center justify-center p-2.5">
                  <div>
                    <img src={brand.image} alt="" className="w-[400px] " />
                  </div>
                </div>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">
                    {brand.status ? "Hoạt Động" : "Không hoạt động"}
                  </p>
                </div>

                <div className="  flex items-center justify-start ml-[40px]">
                  <p
                    onClick={() => showModal(brand)}
                    className="text-black cursor-pointer px-[20px] py-[7px] rounded-md hover:bg-slate-500 hover:text-white bg-slate-200"
                  >
                    Chỉnh Sửa
                  </p>
                </div>
                <div className="  flex items-center justify-start ml-[40px]">
                  <NavLink
                    to={`/course-detail/${brand.id}`}
                    className="text-black cursor-pointer px-[20px] py-[7px] rounded-md hover:bg-slate-500 hover:text-white bg-slate-200"
                  >
                    Xem Chi Tiết
                  </NavLink>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute flex justify-center left-[40%] bottom-[20px]">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            pageSize={itemsPerPage}
            total={brandData?.length}
          />
        </div>
      </div>
    </>
  );
};

export default TableCourse;
