import React, { useContext, useState } from 'react'
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEmojiPeople } from "react-icons/md";
import { AuthContext } from '../../../../contexts/authContext';
import Skeleton from '../../../../components/shared/Skeleton';
import { generateFallbackAvatar } from '../../../../utils/handleFunction';
import { searchCustomerByNameToInvite } from '../../../../redux/features/transactionSlice';
import { CiCircleRemove } from 'react-icons/ci';
import { useDispatch } from 'react-redux';

const Stage_1 = (props) => {

  const { item, error, setError, memberList, setMemberList,
    apartmentData, setApartmentData, selectedIdApartmentData, setSelectedIdApartmentData } = props

  const handleRadioChange = (e) => {
    setSelectedIdApartmentData(e.target.value)
  }
  
  const dispatch = useDispatch();

  const { userDecode } = useContext(AuthContext);

  return (
    <div className="container d-flex gap-2 justify-content-center">
      {apartmentData.length === 0 ? (
        <div>
          <h5>Không còn căn hộ nào còn trống để có thể giữ chân, bạn vẫn muốn tiếp tục chứ?</h5>
          <p className='text-danger'>p/s: Nếu tiếp tục chủ đầu tư sẽ không có trách nhiệm hoàn lại tiền cọc trong trường hợp quý khách không mua được timeshare này!</p>
        </div>
      ) : (
        apartmentData.map((obj, index) => (
          obj.is_selected === false && (
            <div className="radio-tile-group gap-3" key={index}>
              <div className="input-container">
                <input
                  id="bike"
                  className="radio-button"
                  type="radio"
                  value={obj?._id}
                  name="radio"
                  onChange={handleRadioChange}
                  defaultChecked={selectedIdApartmentData === obj._id}
                />
                <div className="radio-tile">
                  <label htmlFor="individual" className="radio-tile-label">
                    Căn hộ số: {obj?.apartment_number}
                  </label>
                </div>
              </div>
            </div>
          )
        ))
      )}

    </div>
  )
}

export default Stage_1