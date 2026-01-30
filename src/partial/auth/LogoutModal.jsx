import { LogOut, X } from "lucide-react";
import React from "react";
import ModalBlank from "../../components/ModalBlank";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <ModalBlank id={"logout-overlay"} isOpen={isOpen} onClose={onClose} size="md">
      <div className="bg-white p-6 ">
        <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
        <p className="mt-2 text-gray-600">Are you sure you want to log out?</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </ModalBlank>
  );
};

export default LogoutModal;
