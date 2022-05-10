import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRestaurant } from '../../../Features/RestaurantSlice';

export default function DeleteRestaurant() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit = async () => {
    
    try {
      dispatch(deleteRestaurant(params.ID_Restaurant))
      
      alert("Xóa thành công thành công");
      navigate(`/Admin/QuanLyRestaurant`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="">
        <h2 className="text-[#f73d3d] text-[40px] w-full text-center bg-[#e2e2e2] p-[15px] rounded-xl">
          XÓA CỬA HÀNG
        </h2>
        <Link to="/Admin/QuanLyRestaurant" className="">
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
        {/* <form className="flex flex-row justify-between items-center p-[50px]">
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={onSubmit}
          >
            Delete
          </button>
        </form> */}
      </div>
    </div>
  );
}
