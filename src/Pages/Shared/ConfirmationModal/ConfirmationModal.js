import React from "react";

const ConfirmationModal = ({ modalData, title, message, successAction, closeModal, successButtonName }) => {
    return (
        <>
            <div className="">
                <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box dark:bg-slate-600">
                        <h3 className="font-bold text-lg">{title}</h3>
                        <p className="py-4">{message}</p>
                        <div className="modal-action">
                            <label
                                onClick={() => successAction(modalData)}
                                htmlFor="confirmation-modal"
                                className="btn btn-primary bg-red-500 hover:bg-red-700"
                            >
                                {successButtonName}
                            </label>
                            <button onClick={closeModal} className="btn btn-outline">
                                cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;
