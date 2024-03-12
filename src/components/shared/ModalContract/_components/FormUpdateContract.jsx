// import React from 'react'
// import { MdDeleteOutline, MdOutlineDelete } from 'react-icons/md';
// import DatePicker from 'react-datepicker';
// import Hint from '../../Hint';
// import { IoIosInformation } from 'react-icons/io';
// import { useDropzone } from 'react-dropzone';
// import { convertRangePriceToVNDFormat } from '../../../../utils/handleFunction';
// import { CiCirclePlus } from 'react-icons/ci';
// import toast from 'react-hot-toast';
// import { Container } from 'react-bootstrap';

// const FormUpdateContract = (props) => {

//     const {
//         transactionSelected,
//         imagesContract, setImagesContract, imagesContractOrigin, setImagesContractOrigin,
//         fileContract, setFileContract, fileContractOrigin, setFileContractOrigin,
//         phases, setPhases, minDates, setMinDates,
//         finalPrice, setFinalPrice, newDataContract,
//         setNewDataContract, newPhase, setNewPhase

//     } = props

//     const addPhase = () => {
//         if (phases.length < 5) {
//             const totalPercent = phases.reduce((acc, curr) => acc + parseFloat(curr.percent || 0), 0);
//             if (totalPercent >= 100) {
//                 toast('Tổng phần trăm các giai đoạn đã vượt quá 100%', { icon: '⚠' });
//                 return;
//             }

//             const lastPhaseIndex = phases.length - 1;
//             let newMinDate = new Date();
//             if (lastPhaseIndex >= 0) {
//                 const lastPhaseDate = phases[lastPhaseIndex].deadline;
//                 if (lastPhaseDate instanceof Date && !isNaN(lastPhaseDate)) {
//                     newMinDate = new Date(lastPhaseDate.getTime() + 86400000);
//                 }
//             }

//             setMinDates([...minDates, newMinDate]);
//             setPhases([...phases, { deadline: "", percent: "" }]);
//         } else {
//             toast('Bạn đã đạt đến số lượng giai đoạn thanh toán tối đa (5) của một hợp đồng!', { icon: '⚠' })
//         }
//     };

//     const handleDeadlineChange = (value, index) => {


//         const newPhases = [...phases];
//         newPhases[index].deadline = value;
//         setPhases(newPhases);

//         const lastPhaseIndex = index - 1;
//         if (lastPhaseIndex >= 0) {
//             const lastPhaseDate = newPhases[lastPhaseIndex].deadline;
//             if (!(lastPhaseDate instanceof Date) || isNaN(lastPhaseDate)) {
//                 toast('Vui lòng chọn ngày cho giai đoạn trước đó trước khi chọn ngày cho giai đoạn hiện tại!', { icon: '⚠' });
//                 return;
//             }
//         }

//         const newMinDates = [...minDates];
//         newMinDates[index] = new Date(value.getTime() + 86400000);
//         setMinDates(newMinDates);
//     };

//     const handlePercentChange = (value, index) => {

//         let newValue = value.replace(/[^\d]/g, '');

//         if (newValue === '0' || (newValue.length > 1 && newValue.charAt(0) === '0')) {
//             newValue = '';
//         }

//         const limitedValue = isNaN(parseInt(newValue)) ? '' : Math.min(parseInt(newValue), 100);

//         const newPhases = [...phases];
//         newPhases[index].percent = limitedValue;
//         setPhases(newPhases);
//     };

//     const removePhase = (index) => {
//         if (phases.length > 1) {
//             const newPhases = [...phases];
//             newPhases.splice(index, 1);
//             setPhases(newPhases);
//         } else {
//             toast('Bạn phải có ít nhất một giai đoạn thanh toán!', { icon: '⚠' })
//         }
//     };

//     // xử lý ẢNH hợp đồng
//     const handleOnDropImagesContract = (acceptedFiles) => {
//         setImagesContractOrigin([...imagesContractOrigin, ...acceptedFiles])
//         setImagesContract([...imagesContract, ...acceptedFiles]);

//         acceptedFiles?.forEach((file) => {
//             previewImage(file);
//         });

//         const isValidImage = [...imagesContract, ...acceptedFiles].length >= 1;


//     };

//     const previewImage = (file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = (e) => {
//             const imageUrl = e.target.result;

//             setImagesContract((prevFiles) =>
//                 prevFiles.map((prevFile) =>
//                     prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
//                 )
//             );
//         };
//     };

//     const {
//         getRootProps: getRootPropsImagesContract,
//         getInputProps: getInputPropsImagesContract,
//         isFocused: isFocusedImagesContract,
//         isDragAccept: isDragAcceptImagesContract,
//         isDragReject: isDragRejectImagesContract,
//         acceptedFiles: acceptedFilesImagesContract,
//         fileRejections: fileRejectionsImagesContract,
//     } = useDropzone({
//         accept: {
//             'image/*': ['.jpeg', '.png']
//         },
//         onDrop: handleOnDropImagesContract
//     });

//     const removeImagesContract = (path) => {
//         setImagesContract((prevFiles) => prevFiles.filter((file) => file.path !== path));
//         setImagesContractOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
//     };

//     // xử lý FILE hợp đồng
//     const handleOnDropFileContract = (acceptedFiles) => {
//         setFileContractOrigin([...fileContractOrigin, ...acceptedFiles])
//         setFileContract([...fileContract, ...acceptedFiles]);

//         acceptedFiles?.forEach((file) => {
//             previewFile(file);
//         });

//         const isValidFile = [...fileContract, ...acceptedFiles].length >= 1;


//     };

//     const previewFile = (file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = (e) => {
//             const imageUrl = e.target.result;

//             setFileContract((prevFiles) =>
//                 prevFiles.map((prevFile) =>
//                     prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
//                 )
//             );
//         };
//     };

//     const {
//         getRootProps: getRootPropsFileContract,
//         getInputProps: getInputPropsFileContract,
//         isFocused: isFocusedFileContract,
//         isDragAccept: isDragAcceptFileContract,
//         isDragReject: isDragRejectFileContract,
//         acceptedFiles: acceptedFilesFileContract,
//         fileRejections: fileRejectionsFileContract,
//     } = useDropzone({
//         onDrop: handleOnDropFileContract
//     });

//     const removeFileContract = (path) => {
//         setFileContract((prevFiles) => prevFiles.filter((file) => file.path !== path));
//         setFileContractOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
//     };

//     //Xử lý giá chốt sổ, final price
//     const handleInputChange = (e) => {
//         let value = e.target.value;

//         value = value.replace(/\D/g, '');
//         if (parseInt(value) > 1000) {
//             value = parseInt(value).toLocaleString();
//         }

//         setFinalPrice(value)

//     };

//     const handleOnBlurFinalPrice = () => {
//         let newValue = finalPrice;

//         newValue = newValue.replace(/\D/g, '');

//         let intValue = parseInt(newValue);

//         if (intValue > transactionSelected?.timeshare_id?.max_price) {
//             intValue = transactionSelected?.timeshare_id?.max_price;
//         }

//         if (intValue < transactionSelected?.timeshare_id?.price) {
//             intValue = transactionSelected?.timeshare_id?.price;
//         }

//         const formattedValue = intValue.toLocaleString();
//         setFinalPrice(formattedValue);

//     }

//     return (
//         <div className='create-contract-container d-flex flex-column justify-content-center align-items-center'>
//             <Container>
//                 <div className='create-contract-content row'>

//                     <div className='section-document'>
//                         <h5 className='mb-4'>File hợp đồng</h5>

//                         <div className='btn btn-danger d-flex gap-2 justify-content-center align-items-center'
//                             style={{ width: 'fit-content' }}
//                         >
//                             <div className='stage-2'>
//                                 <label style={{ cursor: 'pointer' }}
//                                     htmlFor="select_photos"
//                                     className="photo-upload mb-2"
//                                     {...getRootProps(isFocused, isDragAccept, isDragReject)}
//                                 >
//                                     <FiUploadCloud />

//                                     <h5 className="photo-upload-title">
//                                         Chọn hoặc kéo thả tệp tại đây{" "}
//                                     </h5>
//                                     <p>JPG, PNG hoặc PDF, tệp có dung lượng không trên 10MB</p>
//                                 </label>

//                                 {errorStage2 && <span className='error-message'>{errorStage2}</span>}

//                                 {fileContract.length > 0 && (
//                                     <div className="form-group mb-0 mt-4" >
//                                         <div className="photo-uploaded">
//                                             <h4 className='fw-bold text-center'>Các file đã đăng</h4>

//                                             <ul className="list-photo">
//                                                 {fileContract.map((file) => (
//                                                     <li key={file.path}>
//                                                         <div className='photo-item'>
//                                                             {file.previewUrl ? (
//                                                                 <p>{truncateString(file.path, 20)}</p>
//                                                             ) : (
//                                                                 <p>Loading...</p>
//                                                             )}
//                                                             <div className='delete-item'>
//                                                                 <MdDeleteOutline onClick={() => removeImage(file.path)} />
//                                                             </div>
//                                                         </div>
//                                                     </li>
//                                                 ))}
//                                             </ul>


//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* chọn giá chốt sổ */}
//                     <div className='section-form'>
//                         <div className='d-flex flex-row align-items-center'>
//                             <h2 className="form-title">
//                                 Giá chốt sổ
//                             </h2>
//                         </div>

//                         <div className='final-price-container d-flex justify-content-center align-items-center flex-column'>
//                             <p className='note' style={{ fontWeight: 'bold', fontStyle: 'italic' }}>P/s: Timeshare này bạn đang để khoảng giá là {convertRangePriceToVNDFormat(transactionSelected?.timeshare_id?.price, transactionSelected?.timeshare_id?.max_price)}</p>

//                             <div className="form-group-material" style={{ width: '500px' }}>
//                                 <input type="text" required="required" className="form-control"
//                                     value={finalPrice}
//                                     onChange={(e) => handleInputChange(e)}
//                                     placeholder='000.000.000.000đ'
//                                     onBlur={handleOnBlurFinalPrice}
//                                 />
//                                 <label>Giá chốt sổ mong muốn <span className="text-danger">*</span></label>
//                                 <p className='unit-area'>/m&#178;</p>
//                             </div>

//                         </div>
//                     </div>

//                     {/* các giai đoạn thanh toán */}
//                     <div className='section-form'>
//                         <div className='d-flex flex-row align-items-center'>
//                             <h2 className="form-title">
//                                 Các giai đoạn thanh toán
//                             </h2>
//                             <Hint content="Giai đoạn thanh toán phải ít nhất là 1 và nhiều nhất là 5">
//                                 <div className='d-flex justify-content-center align-items-center bg-body-secondary rounded-circle'
//                                     style={{
//                                         cursor: "pointer", width: "15px", height: "15px",
//                                         position: 'relative', top: '-15px'
//                                     }}>
//                                     <IoIosInformation className='text-black' />
//                                 </div>
//                             </Hint>
//                             <CiCirclePlus
//                                 style={{ cursor: 'pointer', width: '20px', height: '20px' }}
//                                 onClick={addPhase}
//                             />
//                         </div>

//                         <div className='phases-container'>
//                             <div className='d-flex flex-column gap-3 justify-content-center align-items-center'>
//                                 {phases.map((phase, index) => (
//                                     <div className='phases-item d-flex flex-row gap-3 justify-content-center align-items-center' key={index}>
//                                         <div>Giai đoạn thanh toán {index + 1}</div>

//                                         <div className="form-group-material mb-0 year-select">
//                                             <input type="text" required="required" className="form-control" />
//                                             <label>Hạn thanh toán</label>
//                                             <DatePicker
//                                                 showIcon
//                                                 selected={phase.deadline}
//                                                 onChange={(date) => handleDeadlineChange(date, index)}
//                                                 dateFormat="dd-MM-yyyy"
//                                                 minDate={minDates[index]}
//                                             />
//                                         </div>

//                                         <div className="form-group-material">
//                                             <input
//                                                 type="text"
//                                                 required="required"
//                                                 className="form-control"
//                                                 value={phase.percent}
//                                                 onChange={(e) => handlePercentChange(e.target.value, index)}
//                                             />
//                                             <label>Phần trăm cần thanh toán <span className="text-danger">*</span></label>
//                                             <p className='unit-area'>%</p>
//                                         </div>

//                                         <div>
//                                             <MdOutlineDelete
//                                                 style={{ cursor: 'pointer', width: '25px', height: '25px' }}
//                                                 onClick={() => removePhase(index)} />
//                                         </div>
//                                     </div>
//                                 ))}


//                             </div>
//                         </div>
//                     </div>

//                     {/* xử lý ẢNH trên UI */}
//                     <div className='d-flex flex-row gap-2'>
//                         <div className='section-form col-6'>
//                             <h2 className="form-title">Hình ảnh về hợp đồng</h2>

//                             <label htmlFor="select_photos"
//                                 className="photo-upload mb-2"
//                                 {...getRootPropsImagesContract(isFocusedImagesContract, isDragAcceptImagesContract, isDragRejectImagesContract)}>

//                                 <img
//                                     src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
//                                     title="Tải ảnh lên"
//                                     alt="timeshare"
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                                 <h5 className="photo-upload-title">
//                                     Kéo thả hình ảnh hợp đồng hoặc {" "}
//                                     <span className="label-file">
//                                         bấm vào đây để tải lên
//                                     </span>
//                                 </h5>
//                                 <p>Yêu cầu tối thiểu 1 hình ảnh</p>
//                             </label>

//                             {imagesContract.length > 0 && (
//                                 <div className="form-group mb-0" >
//                                     <div className="photo-uploaded">
//                                         <h4>Ảnh đã tải</h4>

//                                         <ul className="list-photo">
//                                             {imagesContract.map((file) => (
//                                                 <li key={file.path}>
//                                                     <div className='photo-item'>
//                                                         {file.previewUrl ? (
//                                                             <img src={file.previewUrl} alt={file.path} />
//                                                         ) : (
//                                                             <p>Loading...</p>
//                                                         )}
//                                                         <div className='delete-item'>
//                                                             <MdDeleteOutline onClick={() => removeImagesContract(file.path)} />
//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             )}

//                             {fileRejectionsImagesContract.length > 0 && (
//                                 <div className="form-group mb-0" >
//                                     <div className="photo-uploaded">
//                                         <h4>File bị từ chối</h4>

//                                         <ul className="list-photo">
//                                             {fileRejectionsImagesContract.map((file, index) => (
//                                                 <li key={index}>
//                                                     <div className='photo-item'>
//                                                         <img src={file.previewUrl} alt={file.file.path} />
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             )}


//                         </div>

//                         {/* xử lý File trên UI */}
//                         <div className='section-form col-6'>
//                             <h2 className="form-title">File tài liệu</h2>

//                             <label htmlFor="select_floor_plan_photos"
//                                 className="photo-upload mb-2"
//                                 {...getRootPropsFileContract(isFocusedFileContract, isDragAcceptFileContract, isDragRejectFileContract)}
//                             >
//                                 <img
//                                     src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
//                                     title="Tải ảnh lên"
//                                     alt="timeshare"
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                                 <h5 className="photo-upload-title">
//                                     Kéo thả file tài liệu hoặc{" "}
//                                     <span className="label-file">
//                                         bấm vào đây để tải lên
//                                     </span>
//                                 </h5>
//                                 <p>Yêu cầu tối thiểu 1 file tài liệu</p>
//                             </label>

//                             {fileContract.length > 0 && (
//                                 <div className="form-group mb-0" >
//                                     <div className="photo-uploaded">
//                                         <h4>File đã tải lên</h4>

//                                         <ul className="list-photo">
//                                             {fileContract.map((file) => (
//                                                 <li key={file.path}>
//                                                     <div className='photo-item'>
//                                                         {file.previewUrl ? (
//                                                             <img src={file.previewUrl} alt={file.path} />
//                                                         ) : (
//                                                             <p>Loading...</p>
//                                                         )}
//                                                         <div className='delete-item'>
//                                                             <MdDeleteOutline onClick={() => removeFileContract(file.path)} />
//                                                         </div>
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             )}

//                             {fileRejectionsFileContract.length > 0 && (
//                                 <div className="photo-uploaded">
//                                     <h4>File bị từ chối</h4>
//                                     <ul className="list-photo">
//                                         {fileRejectionsFileContract.map((file, index) => (
//                                             <li key={index}>
//                                                 <div className='photo-item'>
//                                                     <img src={file.previewUrl} alt={file.file.path} />
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}

//                         </div>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     )
// }

// export default FormUpdateContract