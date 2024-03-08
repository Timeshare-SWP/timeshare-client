import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsThreeDots } from "react-icons/bs";
import { TRANSACTION_LIST_ACTION_INVESTOR } from "../../../../constants/action"
import { useDispatch, useSelector } from 'react-redux';
import ModalContract from '../../../../components/shared/ModalContract';
import ModalConfirm from '../../../../components/shared/ModalConfirm';
import SpinnerLoading from "../../../../components/shared/SpinnerLoading"
import { createPhase } from '../../../../redux/features/phaseSlice';
import { createContract, createContractImage } from '../../../../redux/features/contractSlice';
import toast from 'react-hot-toast';
import { generateRandomString } from '../../../../utils/handleFunction';
import { storage } from '../../../../utils/configFirebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createNotification } from '../../../../redux/features/notificationSlice';
import DrawerPaymentProgress from '../../../../components/shared/DrawerPaymentProgress';

const MoreAction = ({ item, transactionList, setTransactionList, userDecode }) => {

    const [isLoadingHandleApi, setIsLoadingHandleApi] = useState(false);

    const [formErrors, setFormErrors] = useState({
        images_contract: false,
        file_contract: false
    })

    const dispatch = useDispatch();

    //phases state
    const [phases, setPhases] = useState([{ deadline: "", percent: "" }]);
    const [minDates, setMinDates] = useState([new Date()]);
    const [phaseError, setPhaseError] = useState({
        percent: '',
        deadline: ''
    })

    //modal state
    const [openModalContract, setOpenModalContract] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [openModalPaymentProgress, setOpenModalPaymentProgress] = useState(false);

    //xử lý ẢNH hợp đồng
    const [imagesContract, setImagesContract] = useState([]); //list ảnh này là để preview trên UI
    const [imagesContractOrigin, setImagesContractOrigin] = useState([]) //list ảnh này là file gốc khi vừa mới drop lên

    //xử lý FILE hợp đồng
    const [fileContract, setFileContract] = useState([]); //list file này là để preview trên UI
    const [fileContractOrigin, setFileContractOrigin] = useState([]) //list ảnh này là file gốc khi vừa mới drop lên

    const handleItemClick = (id) => {
        switch (id) {
            case 1:
                //hợp đồng
                setOpenModalContract(true)
                break;
            case 2:
                //tiến độ thanh toán
                setOpenModalPaymentProgress(true)
                break;
            default:
                alert('Hmmmm, something wrong!')
        }
    }

    const renderDropDownMenuItem = () => {

        let actionsToShow = TRANSACTION_LIST_ACTION_INVESTOR;

        if (item?.transaction_status === "Waiting") {
            actionsToShow = actionsToShow.filter(item => item.id !== 2);
        }

        return actionsToShow.map((item, index) => (
            <Dropdown.Item
                key={index}
                className='d-flex align-items-center gap-2'
                onClick={() => handleItemClick(item?.id)}
            >
                {item?.icon}
                {item?.name}
            </Dropdown.Item>
        ));
    }

    const handleOpenModalConfirmToCreateContract = () => {

        const totalPercent = phases.reduce((acc, curr) => acc + parseInt(curr.percent || 0), 0);
        const hasEmptyValues = phases.some(phase => phase.deadline === "" || phase.percent === "");

        const isValidImagesContract = imagesContract.length >= 1;
        const isValidFileContract = fileContract.length >= 1;

        if (totalPercent < 100) {
            setPhaseError(prevErrors => ({
                ...prevErrors,
                percent: 'Tổng số phần trăm thanh toán chưa đủ 100%'
            }));
        }

        if (totalPercent > 100) {
            setPhaseError(prevErrors => ({
                ...prevErrors,
                percent: 'Tổng số phần trăm thanh toán đã vượt quá 100%'
            }));
        }

        if (hasEmptyValues) {
            setPhaseError(prevErrors => ({
                ...prevErrors,
                percent: 'Vui lòng điền đầy đủ thông tin cho tất cả các giai đoạn'
            }));
        }

        if (isValidImagesContract && isValidFileContract && totalPercent === 100) {
            setPhaseError(prevErrors => ({
                ...prevErrors,
                percent: ''
            }));
            setOpenModalConfirm(true)
            setOpenModalContract(false)
        } else {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                images_contract: !isValidImagesContract
            }));
            setFormErrors(prevErrors => ({
                ...prevErrors,
                file_contract: !isValidFileContract
            }));
        }
    };

    const handleCloseModalContract = () => {
        setOpenModalContract(false)
        setPhases([{ deadline: "", percent: "" }])
        setPhaseError({
            percent: '',
            deadline: ''
        })
        setFormErrors({
            images_contract: false,
            file_contract: false
        })
    }

    const handleCloseModalConfirm = () => {
        setOpenModalConfirm(false)
        setOpenModalContract(true)
    }

    // xử lý API
    const handleCallApiForCreateContract = async () => {

        setIsLoadingHandleApi(true)

        //xử lý up ảnh lên firebase
        toast('Quá trình diễn ra sẽ hơi lâu, vui lòng chờ trong giây lát!', { icon: '⚠' })

        const uploadPromises = [];
        const uploadedFiles = [];

        // Tải lên ảnh từ imagesContractOrigin
        const imagesContractOriginDownload = imagesContractOrigin.map((file) => {
            const randomFileName = generateRandomString();
            const storageRef = ref(storage, `timeshare-images/${randomFileName}`);
            const uploadTask = uploadBytes(storageRef, file);
            uploadPromises.push(uploadTask);
            uploadedFiles.push({ path: `timeshare-images/${randomFileName}`, file });
            return uploadTask.then(() => getDownloadURL(storageRef));
        });

        // Tải lên ảnh từ fileContractOrigin
        const fileContractOriginDownload = fileContractOrigin.map((file) => {
            const randomFileName = generateRandomString();
            const storageRef = ref(storage, `timeshare-images/${randomFileName}`);
            const uploadTask = uploadBytes(storageRef, file);
            uploadPromises.push(uploadTask);
            uploadedFiles.push({ path: `timeshare-images/${randomFileName}`, file });
            return uploadTask.then(() => getDownloadURL(storageRef));
        });

        await Promise.all(uploadPromises);
        const imagesContractOriginURLs = await Promise.all(imagesContractOriginDownload);
        const fileContractOriginURLs = await Promise.all(fileContractOriginDownload);

        const compileAllImages = [
            ...imagesContractOriginURLs.map((url) => ({ contract_img_description: "Ảnh hợp đồng", contract_url: url })),
        ];

        const contract_related_link = fileContractOriginURLs.map((url) => url);

        let contract_image = [];

        const dispatchPromises = compileAllImages.map((data) => {
            return dispatch(createContractImage(data)).then((result) => {
                if (createContractImage.fulfilled.match(result)) {
                    contract_image.push(result.payload._id);
                }
            });
        });

        Promise.all(dispatchPromises).then(() => {

            console.log('item', item);


            const filteredTransactions = transactionList.filter(
                (transaction) => transaction?.timeshare_id?._id === item?.timeshare_id?._id
            );

            const selectedTransaction = filteredTransactions.find(
                (transaction) => transaction.transaction_status === "Selected"
            );

            const dataCreateContract = {
                transaction_id: selectedTransaction._id,
                contract_image: contract_image,
                contract_related_link: contract_related_link
            }

            console.log('dataCreateContract', dataCreateContract)

            dispatch(createContract(dataCreateContract)).then((resContract) => {
                console.log("resContract", resContract)
                if (createContract.fulfilled.match(resContract)) {

                    // tạo phases
                    for (const eachPhase of phases) {

                        const dataPhases = {
                            contract_id: resContract.payload._id,
                            phase_price_percent: parseInt(eachPhase.percent),
                            remittance_deadline: eachPhase.deadline
                        }

                        console.log("dataPhases", dataPhases)

                        dispatch(createPhase(dataPhases)).then((resPhase) => {
                            console.log("resPhase", resPhase)
                            if (createPhase.fulfilled.match(resPhase)) {

                            } else {

                            }
                        })
                    }

                    // tạo noti
                    for (const user of selectedTransaction.customers) {
                        const dataBodyNoti = {
                            user_id: user._id,
                            notification_content: `${userDecode?.fullName} đã đăng hợp đồng cho ${item.timeshare_name} mà bạn đã mua. Vui lòng vào xác nhận!`,
                            notification_title: `REQUEST_CONFIRM_CONTRACT_TO_CUSTOMER`,
                            notification_type: `REQUEST_CONFIRM_CONTRACT_TO_CUSTOMER`,
                        };

                        dispatch(createNotification(dataBodyNoti)).then((resNoti) => {
                            console.log("resPhase", resNoti)
                        })
                    }

                    toast.success('Đăng hợp đồng thành công!')
                } else {
                    toast.error(`${resContract.payload}`)
                }

                setOpenModalConfirm(false)
            })

            setIsLoadingHandleApi(false);
        });

        // const resCreateContractImage = await dispatch(createContractImage(dataContractImage))

        // const dataPhases = {
        //     contract_id: ,
        //     phase_price_percent:,
        //     remittance_deadline
        // }

        // dispatch(createPhase)
    }

    return (
        <Dropdown className='notification-container'>
            <Dropdown.Toggle variant="ghost" id="dropdown-basic" className='d-flex justify-content-center align-items-center '>
                <BsThreeDots style={{ cursor: 'pointer' }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {renderDropDownMenuItem()}
            </Dropdown.Menu>

            {openModalContract
                &&
                <ModalContract
                    show={openModalContract}
                    transactionSelected={item}
                    transactionList={transactionList}
                    setTransactionList={setTransactionList}
                    handleClose={handleCloseModalContract}
                    handleAccept={() => setOpenModalContract(true)}
                    handleOpenModalConfirmToCreateContract={handleOpenModalConfirmToCreateContract}
                    imagesContract={imagesContract}
                    setImagesContract={setImagesContract}
                    imagesContractOrigin={imagesContractOrigin}
                    setImagesContractOrigin={setImagesContractOrigin}
                    fileContract={fileContract}
                    setFileContract={setFileContract}
                    fileContractOrigin={fileContractOrigin}
                    setFileContractOrigin={setFileContractOrigin}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors}
                    phases={phases}
                    setPhases={setPhases}
                    minDates={minDates}
                    setMinDates={setMinDates}
                    phaseError={phaseError}
                    setPhaseError={setPhaseError}
                />
            }

            {openModalConfirm
                &&
                <ModalConfirm
                    show={openModalConfirm}
                    handleClose={handleCloseModalConfirm}
                    handleAccept={handleCallApiForCreateContract}
                    nameBtnCLose={'Quay lại'}
                    body={<h5>Bạn có chắc muốn thêm hợp đồng này?</h5>} />
            }

            {openModalPaymentProgress
                &&
                <DrawerPaymentProgress
                    show={openModalPaymentProgress}
                    handleClose={() => setOpenModalPaymentProgress(false)}
                    transactionSelected={item}
                    transactionList={transactionList}
                    setTransactionList={setTransactionList}
                />
            }


            {isLoadingHandleApi && <SpinnerLoading />}
        </Dropdown>
    )
}

export default MoreAction