import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { CiCircleRemove } from "react-icons/ci";
import { generateFallbackAvatar } from '../../../utils/handleFunction';
import Skeleton from '../Skeleton';
import './style.scss'
import { searchCustomerByNameToInvite } from '../../../redux/features/transactionSlice';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../contexts/authContext';

const ModalInvite = (props) => {
    const { show, handleClose, handleAccept, memberList, setMemberList } = props
    const dispatch = useDispatch();

    const { userDecode } = useContext(AuthContext);

    const [newMember, setNewMember] = React.useState("");
    const [loadingSearchResult, setLoadingSearchResult] = React.useState(false);
    const [memberResultSearch, setMemberResultSearch] = React.useState([]);
    const [error, setError] = React.useState(false);

    const handleNewMemberChange = (e) => {
        setError(false)
        setLoadingSearchResult(true);
        setNewMember(e.target.value);
        dispatch(
            searchCustomerByNameToInvite(e.target.value,)
        ).then((result) => {
            // Lọc ra những người có ._id không trùng với userDecode._id
            const filteredResults = result?.payload?.filter(member => member._id !== userDecode._id);
            // Loại bỏ những người đã có trong memberList
            const finalResults = filteredResults.filter(member => !memberList.some(existingMember => existingMember._id === member._id));

            setMemberResultSearch(finalResults);
            setLoadingSearchResult(false);
        });
    };

    const handleClickSelectMember = (selectedMember) => {
        setMemberList((prevMembers) => [...prevMembers, selectedMember]);
        setNewMember("");
        setMemberResultSearch([]);
    };

    const removeSelectedUserFromMemberList = (selectedMember) => {
        setMemberList((prevMembers) =>
            prevMembers.filter((member) => member !== selectedMember)
        );
    };

    const checkInviteMember = () => {
        if (memberList.length === 0) {
            setError(true)
        } else {
            handleAccept()
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" >
            <Modal.Header closeButton={handleClose}>
                <Modal.Title>Mời tham gia timeshare</Modal.Title>
            </Modal.Header>

            <Modal.Body className='body-invite-form'>
                <div className="relative">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="invited_member"
                    >
                        Người tham gia
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="invited_member"
                        type="text"
                        placeholder="Vui lòng nhập email để mời"
                        value={newMember}
                        onChange={handleNewMemberChange}
                    />

                    {error && <p className="mt-2" style={{ color: 'red' }}>Chưa tìm thấy ai để có thể mời!</p>}

                    {newMember && (
                        <div className="absolute z-50 w-full bg-white max-h-44 overflow-y-scroll shadow-lg border flex justify-start flex-col">
                            {loadingSearchResult ? (
                                <div className="flex items-center gap-3 px-3 py-2 text-gray-500 text-sm">
                                    <Skeleton style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                                    <div className="flex flex-col gap-2">
                                        <Skeleton style={{ width: '180px', height: '10px' }} />
                                        <Skeleton style={{ width: '180px', height: '10px' }} />
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
                                    >
                                        <img
                                            src={
                                                result.avatar_url ||
                                                generateFallbackAvatar(result.email)
                                            }
                                            alt={result.fullName}
                                            className="w-10 h-10 object-cover rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-normal text-sm">{result.fullName}</p>
                                            <p className="font-normal opacity-70 text-sm">
                                                {result.email}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-3 py-2 text-gray-500 text-sm">
                                    Không tìm thấy người phù hợp.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    {memberList.length !== 0 && (
                        <label className="block text-gray-700 font-bold">
                            Những người đã mời
                        </label>
                    )}

                    <div>
                        {memberList.map((member, index) => (
                            <div
                                className="d-flex align-items-center justify-content-between gap-3 mt-4"
                                key={index}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={
                                            member.avatar_url ||
                                            generateFallbackAvatar(member.email)
                                        }
                                        alt={""}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <p className={`font-normal text-sm`}>{member.fullName}</p>

                                        <p className={`font-normal opacity-70 text-sm`}>
                                            {member.email}
                                        </p>
                                    </div>
                                </div>

                                <CiCircleRemove
                                    className="cursor-pointer w-5 h-5 text-gray-500"
                                    onClick={() => removeSelectedUserFromMemberList(member)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Hủy
                </button>
                <button className="btn btn-primary" onClick={checkInviteMember}>
                    Mời
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalInvite