import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBill, getChiTietBill } from '../../../Features/BillSlice';

export default function DeleteBill() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [Cate, setCate] = useState();
  // const [data, setData] = useState({});
  // const getBill = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:5000/vnkfood/api/get/Bills/${params.ID_Bill}`
  //     );
  //     setCate(res.data);
  //     const initState = {
  //       ID_Bill:res.data.ID_Bill,
  //       }
  //     setData(initState);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getBill();
  // }, []);
  // console.log(Cate);
  const onSubmit = async () => {
    // e.preventDefault();
    
    try {
      dispatch(deleteBill(params.ID_Bill))
      
      alert("Xóa thành công thành công");
      navigate(`/Admin/QuanLyBill`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="">
        <h2 className="text-[#f73d3d] text-[40px] w-full text-center bg-[#e2e2e2] p-[15px] rounded-xl">
          XÓA HÓA ĐƠN
        </h2>
        <Link to="/Admin/QuanLyBill" className="">
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
          <label className="border p-[10px] mr-[20px] outline-none">{Bill[0].ID_Bill}</label>
          <label htmlFor="">Tên </label>
          <label className="border p-[10px] mr-[20px] outline-none">{Bill[0].BillName}</label> */}
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
