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
import { fetchAllBrands } from "../../redux/slices/brandSlice";

const AddDealerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dealerId } = useQueryParams();

    const { allBrandsData,  } = useSelector(
      (state) => state.brand,
    );

  const {
    isFetchingDealerDetails,
    delearDetails,
    isCreatingDealer,
    isUpdatingDealer,
  } = useSelector((state) => state.dealer);

  useEffect(() => {
    if (dealerId) {
      dispatch(fetchDealerById(dealerId));
    }

    if(!allBrandsData){
      dispatch(fetchAllBrands());
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
          dealer={delearDetails}
          brands={allBrandsData?.brands}
        />

        {/* Help Text */}
        <div className="mt-8 p-6 bg-secondary-50 rounded-xl border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-2">Need Help?</h3>
          <p className="text-secondary-800 text-sm">
            To get the location link, open the place in Google Maps, then copy
            the URL from your browser’s address bar and paste it here.
          </p>
        </div>
      </div>
    </>
  );
};

export default AddDealerPage;
