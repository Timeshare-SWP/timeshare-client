import React, { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'

const FormCreateContract = () => {
     //xử lý ảnh hợp đồng
    //  const [imagesContract, setImagesContract] = useState([]); //list ảnh này là để preview trên UI
    //  const [imagesContractOrigin, setImagesContractOrigin] = useState([]) //list ảnh này là file gốc khi vừa mới drop lên
 
    //  const handleOnDrop = (acceptedFiles) => {
    //      setImagesContractOrigin([...imagesContractOrigin, ...acceptedFiles])
    //      setImagesContract([...imagesContract, ...acceptedFiles]);
 
    //      acceptedFiles.forEach((file) => {
    //          previewImage(file);
    //      });
 
    //      const isValidImage = [...imagesContract, ...acceptedFiles].length >= 5;
 
    //      if (isValidImage) {
    //          setFormImageErrors(prevErrors => ({
    //              ...prevErrors,
    //              general_timeshare_image: false
    //          }));
    //      }
    //  };
 
    //  const previewImage = (file) => {
    //      const reader = new FileReader();
    //      reader.readAsDataURL(file);
    //      reader.onload = (e) => {
    //          const imageUrl = e.target.result;
 
    //          setImagesContract((prevFiles) =>
    //              prevFiles.map((prevFile) =>
    //                  prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
    //              )
    //          );
    //      };
    //  };
 
    //  const {
    //      getRootProps,
    //      getInputProps,
    //      isFocused,
    //      isDragAccept,
    //      isDragReject,
    //      acceptedFiles,
    //      fileRejections,
    //  } = useDropzone({
    //      accept: {
    //          'image/*': ['.jpeg', '.png']
    //      },
    //      onDrop: handleOnDrop
    //  });
 
    //  const removeGeneralImage = (path) => {
    //      setImagesContract((prevFiles) => prevFiles.filter((file) => file.path !== path));
    //      setImagesContractOrigin((prevFiles) => prevFiles.filter((file) => file.path !== path));
    //  };

    return (
        <></>
        // <div className='create-contract-container d-flex flex-column justify-content-center align-items-center'>
        //     <h4 className='title'>Giá thành theo từng giai đoạn và hợp đồng liên quan</h4>
        //     <p className='sub-title mt-2'>
        //         Bổ sung các thông tin cần thiết về timeshare của bạn
        //     </p>

        //     <div className='create-contract-content'>
        //         <div className='section-form'>
        //             <h2 className="form-title">Các giai đoạn thanh toán</h2>
        //         </div>

        //         <div className='section-form'>
        //             <h2 className="form-title">Hình ảnh về hợp đồng</h2>

        //             <label htmlFor="select_photos" className="photo-upload mb-2" {...getRootProps(isFocused, isDragAccept, isDragReject)}>
        //                 <img
        //                     src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
        //                     title="Tải ảnh lên"
        //                     alt="timeshare"
        //                     style={{ cursor: 'pointer' }}
        //                 />
        //                 <h5 className="photo-upload-title">
        //                     Kéo thả hình ảnh nhà đất hoặc{" "}
        //                     <span className="label-file">
        //                         bấm vào đây để tải lên
        //                     </span>
        //                 </h5>
        //                 <p>Yêu cầu tối thiểu 5 hình ảnh</p>
        //             </label>

        //             {imagesContract.length > 0 && (
        //                 <div className="form-group mb-0" >
        //                     <div className="photo-uploaded">
        //                         <h4>Ảnh đã tải</h4>

        //                         <ul className="list-photo">
        //                             {imagesContract.map((file) => (
        //                                 <li key={file.path}>
        //                                     <div className='photo-item'>
        //                                         {file.previewUrl ? (
        //                                             <img src={file.previewUrl} alt={file.path} />
        //                                         ) : (
        //                                             <p>Loading...</p>
        //                                         )}
        //                                         <div className='delete-item'>
        //                                             <MdDeleteOutline onClick={() => removeGeneralImage(file.path)} />
        //                                         </div>
        //                                     </div>
        //                                 </li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 </div>
        //             )}

        //             {fileRejections.length > 0 && (
        //                 <div className="form-group mb-0" >
        //                     <div className="photo-uploaded">
        //                         <h4>File bị từ chối</h4>

        //                         <ul className="list-photo">
        //                             {fileRejections.map((file, index) => (
        //                                 <li key={index}>
        //                                     <div className='photo-item'>
        //                                         <img src={file.previewUrl} alt={file.file.path} />
        //                                     </div>
        //                                 </li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 </div>
        //             )}

        //             {formImageErrors.general_timeshare_image && <span className="error-message">Vui lòng chọn đủ ít nhất 5 tấm hình!</span>}

        //         </div>

        //         <div className='section-form'>
        //             <h2 className="form-title">File tài liệu</h2>

        //             <label htmlFor="select_floor_plan_photos" className="photo-upload mb-2" {...getRootPropsFloorPlan(isFocusedFloorPlan, isDragAcceptFloorPlan, isDragRejectFloorPlan)}>
        //                 <input {...getInputPropsFloorPlan()} />
        //                 <img
        //                     src="https://s3-cdn.rever.vn/p/v2.48.39/images/icon/upload.svg"
        //                     title="Tải ảnh lên"
        //                     alt="timeshare"
        //                     style={{ cursor: 'pointer' }}
        //                 />
        //                 <h5 className="photo-upload-title">
        //                     Kéo thả hình ảnh mặt bằng timeshare hoặc{" "}
        //                     <span className="label-file">
        //                         bấm vào đây để tải lên
        //                     </span>
        //                 </h5>
        //                 <p>Yêu cầu tối thiểu 1 hình ảnh</p>
        //             </label>

        //             {floorPlanImages.length > 0 && (
        //                 <div className="form-group mb-0" >
        //                     <div className="photo-uploaded">
        //                         <h4>Ảnh mặt bằng đã tải</h4>

        //                         <ul className="list-photo">
        //                             {floorPlanImages.map((file) => (
        //                                 <li key={file.path}>
        //                                     <div className='photo-item'>
        //                                         {file.previewUrl ? (
        //                                             <img src={file.previewUrl} alt={file.path} />
        //                                         ) : (
        //                                             <p>Loading...</p>
        //                                         )}
        //                                         <div className='delete-item'>
        //                                             <MdDeleteOutline onClick={() => removeFloorImage(file.path)} />
        //                                         </div>
        //                                     </div>
        //                                 </li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 </div>
        //             )}

        //             {fileRejectionsFloorPlan.length > 0 && (
        //                 <div className="photo-uploaded">
        //                     <h4>File mặt bằng bị từ chối</h4>
        //                     <ul className="list-photo">
        //                         {fileRejectionsFloorPlan.map((file, index) => (
        //                             <li key={index}>
        //                                 <div className='photo-item'>
        //                                     <img src={file.previewUrl} alt={file.file.path} />
        //                                 </div>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 </div>
        //             )}

        //             {formImageErrors.floor_plan_image && <span className="error-message">Vui lòng chọn đủ ít nhất 1 tấm hình về mặt bằng!</span>}

        //         </div>
        //     </div>
        // </div>
    )
}

export default FormCreateContract