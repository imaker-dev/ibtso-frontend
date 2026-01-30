import React from "react";
import PageHeader from "../../components/layout/PageHeader";
import DealerForm from "../../partial/dealer/DealerForm";
import { useDispatch, useSelector } from "react-redux";
import { handleResponse } from "../../utils/helpers/helpers";
import { createDealer } from "../../redux/slices/dealerSlice";
import { useNavigate } from "react-router-dom";

const AddDealerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isCreatingDealer} = useSelector((state) => state.dealer);
  
  const handleDealerSubmit = async ({ values, resetForm }) => {
    await handleResponse(dispatch(createDealer(values)), () => {
      resetForm();
      navigate(`/dealers`);
    });
  };
  return (
    <div className="space-y-8">
      <PageHeader
        title="Add New Dealer"
        description="Create and register a new dealer profile in the system."
        showBackButton
      />

      <DealerForm onSubmit={handleDealerSubmit} loading={isCreatingDealer}/>

      {/* Help Text */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
        <p className="text-blue-800 text-sm">
          To find the latitude and longitude coordinates, you can use Google
          Maps. Right-click on the location and select the coordinates that
          appear.
        </p>
      </div>
    </div>
  );
};

export default AddDealerPage;
