import React, { useContext } from 'react'
import './style.scss'
import { BiSearchAlt2 } from "react-icons/bi";
import Hint from "../../shared/Hint"
import { IoIosInformation } from "react-icons/io";
import { AuthContext } from '../../../contexts/authContext';
import Skeleton from '../../shared/Skeleton';
import { convertToSlug } from '../../../utils/handleFunction';
import { useDispatch } from 'react-redux';
import { searchTimeshareByName } from '../../../redux/features/timeshareSlice'
import { useNavigate } from 'react-router-dom';

const BannerSection = () => {
    const [newMember, setNewMember] = React.useState("");
    const [loadingSearchResult, setLoadingSearchResult] = React.useState(false);
    const [memberResultSearch, setMemberResultSearch] = React.useState([]);
    const [error, setError] = React.useState(false);
    const { userDecode } = useContext(AuthContext);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleNewMemberChange = (e) => {
        setError(false)
        setLoadingSearchResult(true);
        setNewMember(e.target.value);
        dispatch(
            searchTimeshareByName(e.target.value,)
        ).then((result) => {
            console.log("result.payload", result.payload)
            setMemberResultSearch(result.payload);
            setLoadingSearchResult(false);
        });
    };

    const handleClickSelectMember = (item) => {
        console.log("selectedMember", item)
        navigate(`/timeshare-list/${convertToSlug(item?.timeshare_name)}`, { state: { item } })
        setNewMember("");
        setMemberResultSearch([]);
    };

    return (
        <section className="p-0 banner-section">
            <div className="overlay"></div>

            <div className='container banner-content'>
                <div className='d-flex gap-2'>
                    <p className='fw-semibold'>An tâm với 100% bất động sản xác thực</p>
                    <Hint content="Tồn tại thực - Hình ảnh thực tế - Giá đúng thị trường - Sẵn sàng giao dịch">
                        <div className='d-flex justify-content-center align-items-center bg-body-secondary rounded-circle' style={{ cursor: "pointer", width: "15px", height: "15px" }}><IoIosInformation className='text-black' /></div>
                    </Hint>
                </div>

                <h1 className='my-3'>Lựa chọn timeshare ưng ý của bạn</h1>

                <div className='d-flex gap-5'>
                    <p
                        className="nav__item fw-bold active"
                    >
                        Mua nhà
                    </p>

                    <p
                        className="nav__item fw-bold"
                    >
                        Thuê nhà
                    </p>
                </div>

                <div className="form-search d-flex align-items-center mt-4">
                    <BiSearchAlt2 className='text-black mx-2' />
                    <input className=""
                        type="search"
                        placeholder="Tìm kiếm nhà đất"
                        value={newMember}
                        onChange={handleNewMemberChange}
                    />
                    <button className="btn btn-danger">Tìm kiếm</button>
                </div>
                {error && <p className="mt-2" style={{ color: 'red' }}>Không tìm thấy timeshare nào!</p>}
                {newMember && (
                    <div className="absolute z-50 w-full bg-white max-h-44 overflow-y-scroll shadow-lg border flex justify-start flex-col"
                        style={{ width: '68%' }}
                    >
                        {loadingSearchResult ? (
                            <div className="flex items-center gap-3 px-3 py-2 text-gray-500 text-sm" style={{ width: '70%' }}>
                                <div className="flex flex-row gap-2">
                                    <Skeleton style={{ width: '200px', height: '10px' }} />
                                </div>
                            </div>
                        ) : memberResultSearch &&
                            Array.isArray(memberResultSearch) &&
                            memberResultSearch.length > 0 ? (
                            memberResultSearch?.map((result, index) => (
                                <div
                                    key={index}
                                    className="flex cursor-pointer hover:bg-gray-200 px-3 py-2 items-center gap-3 transition-all duration-300 ease-in-out"
                                    onClick={() => handleClickSelectMember(result)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="flex flex-row" style={{gap: '2rem'}}>
                                        <p className="font-normal text-sm text-black">{result.timeshare_name}</p>
                                        <p className="font-normal opacity-70 text-sm text-black" style={{ fontStyle: 'italic' }}>
                                            {result.timeshare_address}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2 text-gray-500 text-sm" style={{ width: '70%' }}>
                                Không tìm thấy timeshare phù hợp.
                            </div>
                        )}
                    </div>
                )}

                <div className='d-flex align-items-center gap-2 mt-4'>
                    <p className="fw-semibold">Gợi ý: </p>
                    <div className='list-suggest d-flex align-items-center gap-2'>
                        <div className='btn btn-outline-light'>The Rivana</div>
                        <div className='btn btn-outline-light'>The Rivana</div>
                        <div className='btn btn-outline-light'>The Rivana</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerSection