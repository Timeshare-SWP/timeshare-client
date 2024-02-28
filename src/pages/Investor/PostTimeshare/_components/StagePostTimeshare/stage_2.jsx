import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { truncateString } from "../../../../../utils/handleFunction"

const Stage_2 = (props) => {
  const { selectedJuridicalFiles, setSelectedJuridicalFiles } = props

  const handleOnDrop = (acceptedFiles) => {
    setSelectedJuridicalFiles([...selectedJuridicalFiles, ...acceptedFiles]);

    acceptedFiles.forEach((file) => {
      previewImage(file);
    });
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({

    onDrop: handleOnDrop
  });

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const imageUrl = e.target.result;

      setSelectedJuridicalFiles((prevFiles) =>
        prevFiles.map((prevFile) =>
          prevFile.name === file.name ? { ...prevFile, previewUrl: imageUrl } : prevFile
        )
      );
    };
  };

  const removeImage = (path) => {
    setSelectedJuridicalFiles((prevFiles) => prevFiles.filter((file) => file.path !== path));
  };

  return (
    <div className='stage-container d-flex flex-column justify-content-center align-items-center'>
      <h4 className='title'>Đăng thông tin về trọn bộ hồ sơ pháp lý của timeshare</h4>
      <p className='sub-title mt-2'>Bổ sung các thông tin cần thiết về dự án của bạn để có thể hoàn thành
        các bước đăng tin thành công </p>
      <p className='note-title'>(Bấm tiếp tục nếu không có và bỏ qua giai đoạn này)</p>

      <div className='stage-2'>
        <label style={{ cursor: 'pointer' }}
          htmlFor="select_photos"
          className="photo-upload mb-2"
          {...getRootProps(isFocused, isDragAccept, isDragReject)}
        >
          <FiUploadCloud />

          <h5 className="photo-upload-title">
            Chọn hoặc kéo thả tệp tại đây{" "}
          </h5>
          <p>JPG, PNG hoặc PDF, tệp có dung lượng không trên 10MB</p>
        </label>

        {selectedJuridicalFiles.length > 0 && (
          <div className="form-group mb-0 mt-4" >
            <div className="photo-uploaded">
              <h4 className='fw-bold text-center'>Các file đã đăng</h4>

              <ul className="list-photo">
                {selectedJuridicalFiles.map((file) => (
                  <li key={file.path}>
                    <div className='photo-item'>
                      {file.previewUrl ? (
                        <p>{truncateString(file.path, 20)}</p>
                      ) : (
                        <p>Loading...</p>
                      )}
                      <div className='delete-item'>
                        <MdDeleteOutline onClick={() => removeImage(file.path)} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stage_2