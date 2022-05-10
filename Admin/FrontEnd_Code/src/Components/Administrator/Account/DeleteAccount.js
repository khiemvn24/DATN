import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAccount, getChiTietAccount } from '../../../Features/AcountSlice';

export default function DeleteAccount() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [Account, setAccount] = useState();
  const [data, setData] = useState({});
  const DeleteAccountID = useSelector((state) => state.listAccount);
  const deleteAccountID = DeleteAccountID.AccountDetail;
  const getAccount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/vnkfood/api/get/account/${params.ID_Account}`
      );
      setAccount(res.data);
      const initState = {
        ID_Account:res.data.ID_Account,
        UserName:res.data.UserName,
        Email:res.data.Email,
        Password:res.data.Password,
        FullName: "",
        Phone: "",
        Address: "",
        }
      setData(initState);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getChiTietAccount(params.ID_Account));
  }, []);

  const onSubmit = async () => {
    // e.preventDefault();
    
    try {
      dispatch(deleteAccount(params.ID_Account))
      
      alert("Xóa thành công thành công");
      navigate(`/Admin/QuanLyAccount`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="">
        <h2 className="text-[#f73d3d] text-[40px] w-full text-center bg-[#e2e2e2] p-[15px] rounded-xl">
          XÓA TÀI KHOẢN
        </h2>
        <Link to="/Admin/QuanLyAccount" className="">
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
          {/* <label htmlFor="">Mã ID :</label>
          <label className="border p-[10px] mr-[20px] outline-none">{deleteAccountID?.ID_Account}</label>
          <label htmlFor="">Tên :</label>
          <label className="border p-[10px] mr-[20px] outline-none">{}</label>
          <label htmlFor="">Họ và tên :</label>
          <label className="border p-[10px] mr-[20px] outline-none">{}</label> */}
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
