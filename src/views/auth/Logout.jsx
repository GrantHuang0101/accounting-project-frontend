import React, { useEffect } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Logout = ({ onCloseModal }) => {
  const { logout, authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      alert("No account login");
      navigate("/");
    }
  }, [authToken, navigate]);

  const handleLogout = () => {
    logout();
    onCloseModal;
    navigate("/", { replace: true });
  };

  return (
    <>
      <Modal show={true} size="md" onClick={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleLogout}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onCloseModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Logout;
