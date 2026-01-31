import React, { useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";
import DealerForm from "../../partial/dealer/DealerForm";
import { useDispatch, useSelector } from "react-redux";
import { handleResponse } from "../../utils/helpers/helpers";
import {
  clearDealerDetails,
  createDealer,
  fetchDealerById,
  updateDealer,
} from "../../redux/slices/dealerSlice";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "../../hooks/useQueryParams";
import { Loader } from "lucide-react";
import LoaderOverlay from "../../components/LoaderOverlay";

const AddDealerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dealerId } = useQueryParams();

  const {
    isFetchingDealerDetails,
    delearDetails,
    isCreatingDealer,
    isUpdatingDealer,
  } = useSelector((state) => state.dealer);
  const { dealer } = delearDetails || {};

  useEffect(() => {
    if (dealerId) {
      dispatch(fetchDealerById(dealerId));
    }

    return () => {
      dispatch(clearDealerDetails());
    };
  }, [dealerId]);

  const handleDealerSubmit = async ({ values, resetForm }) => {
    const action = dealerId
      ? updateDealer({ id: dealerId, values })
      : createDealer(values);

    await handleResponse(dispatch(action), () => {
      resetForm();
      navigate(`/dealers`);
    });
  };

  return (
    <>
      <LoaderOverlay
        show={dealerId && isFetchingDealerDetails}
        text="Fetching dealer details…"
      />
      <div className="space-y-8">
        <PageHeader
          title={dealerId ? "Update Dealer" : "Add New Dealer"}
          description={
            dealerId
              ? "Update dealer profile information."
              : "Create and register a new dealer profile in the system."
          }
          showBackButton
        />

        <DealerForm
          onSubmit={handleDealerSubmit}
          loading={isCreatingDealer || isUpdatingDealer}
          dealer={dealer}
        />

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
    </>
  );
};

export default AddDealerPage;
