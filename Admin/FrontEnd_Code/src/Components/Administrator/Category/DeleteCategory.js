import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCategory, getChiTietCategory } from '../../../Features/CategorySlice';

export default function DeleteCategory() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [Cate, setCate] = useState();
  // const [data, setData] = useState({});
  // const getCategory = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:5000/vnkfood/api/get/categorys/${params.ID_Category}`
  //     );
  //     setCate(res.data);
  //     const initState = {
  //       ID_Category:res.data.ID_Category,
  //       }
  //     setData(initState);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCategory();
  // }, []);
  // console.log(Cate);
  const onSubmit = async () => {
    // e.preventDefault();
    
    try {
      dispatch(deleteCategory(params.ID_Category))
      
      alert("Xóa thành công thành công");
      navigate(`/Admin/QuanLyCategory`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="">
        <h2 className="text-[#f73d3d] text-[40px] w-full text-center bg-[#e2e2e2] p-[15px] rounded-xl">
          XÓA DANH MỤC
        </h2>
        <Link to="/Admin/QuanLyCategory" className="">
          <button className="my-[10px] ml-[10px] p-[10px] border-2 btn btn-outline-danger rounded-xl font-Roboto font-[500] text-[20px]">
            <i className="fa-solid fa-arrow-rotate-left"></i>Trở Lại
          </button>
        </Link>
        <button
            type="button"
            className="btn btn-outline-info"
            onClick={onSubmit}
          >
            Delete
          </button>
        <form className="flex flex-row justify-between items-center p-[50px]">
          {/* <label htmlFor="">Mã ID</label>
          <label className="border p-[10px] mr-[20px] outline-none">{Category[0].ID_Category}</label>
          <label htmlFor="">Tên </label>
          <label className="border p-[10px] mr-[20px] outline-none">{Category[0].categoryName}</label> */}
          {/* <button
            type="button"
            className="btn btn-outline-info"
            onClick={onSubmit}
          >
            Delete
          </button> */}
        </form>
      </div>
    </div>
  );
}
