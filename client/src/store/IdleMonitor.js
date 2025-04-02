import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAuth } from './auth'; 
import './idle-monitor.css'; 

function IdleMonitor() {
  const { LogoutUser } = useAuth(); 
  const [idleModal, setIdleModal] = useState(false);

  let idleTimeout = 1000 * 60 * 5;  // 5 minute
  let idleLogout = 1000 * 60 * 10; // 10 Minutes
  let idleEvent;
  let idleLogoutEvent;

  const events = [
    'mousemove',
    'click',
    'keypress'
  ];
  const sessionTimeout = () => {
    if (idleEvent) clearTimeout(idleEvent);
    if (idleLogoutEvent) clearTimeout(idleLogoutEvent);
  
    idleEvent = setTimeout(() => setIdleModal(true), idleTimeout);
    idleLogoutEvent = setTimeout(() => LogoutUser(), idleLogout);
  };
  
  const extendSession = () => {
    clearTimeout(idleEvent);
    setIdleModal(false);
    sessionTimeout(); // Restart idle timeout
  }

  useEffect(() => {
    for (let e of events) {
      window.addEventListener(e, sessionTimeout);
    }

    return () => {
      for (let e of events) {
        window.removeEventListener(e, sessionTimeout);
      }
    }
  }, []);

  return (
    <Modal isOpen={idleModal} toggle={() => setIdleModal(false)} className="idle-modal">
      <ModalHeader toggle={() => setIdleModal(false)} className="idle-modal-header">
        Session Expire Warning
      </ModalHeader>
      <ModalBody className="idle-modal-body">
        Your session will expire in {idleLogout / 60 / 1000} minutes. Do you want to extend the session?
      </ModalBody>
      <ModalFooter className="idle-modal-footer">
        <button className="btn btn-info" onClick={() => LogoutUser()}>Logout</button>
        <button className="btn btn-success" onClick={() => extendSession()}>Extend Session</button>
      </ModalFooter>
    </Modal>
  );
}

export default IdleMonitor;
