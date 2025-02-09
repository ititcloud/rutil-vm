import React, { useMemo } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { warnButton, xButton } from '../../../../utils/Icon';
import { useDeleteDataCenter } from '../../../../api/RQHook';

const DataCenterDeleteModal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();
  const { mutate: deleteDataCenter } = useDeleteDataCenter();
  
  const { ids, names } = useMemo(() => {
    if (!data) return { ids: [], names: [] };
    
    const dataArray = Array.isArray(data) ? data : [data];
    return {
      ids: dataArray.map((item) => item.id),
      names: dataArray.map((item) => item.name),
    };
  }, [data]);

  const handleDelete = () => {
    if (!ids.length) return console.error('삭제할 데이터센터 ID가 없습니다.');    
  
    ids.forEach((datacenterId, index) => {
      deleteDataCenter(datacenterId, {
        onSuccess: () => {
          if (ids.length === 1 || index === ids.length - 1) { 
            onClose(); 
            toast.success('데이터센터 삭제 완료');
            navigate('/computing/rutil-manager/datacenters');
          }
        },
        onError: (error) => {
          toast.success('데이터센터 삭제 오류:', error.message);
        },
      });
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="Modal" overlayClassName="Overlay" shouldCloseOnOverlayClick={false} >
      <div className="storage-delete-popup modal">
        <div className="popup-header">
          <h1>데이터센터 삭제</h1>
          <button onClick={onClose}>{ xButton() }</button>
        </div>

        <div className="disk-delete-box">
          <div>
            { warnButton() }
            <span> {names.join(', ')} 를(을) 삭제하시겠습니까? </span>
          </div>
        </div>

        <div className="edit-footer">
          <button style={{ display: 'none' }}></button>
          <button onClick={handleDelete}>OK</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </Modal>
  );
};

export default DataCenterDeleteModal;

