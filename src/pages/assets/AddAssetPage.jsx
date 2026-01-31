import React, { useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import AssetForm from "../../partial/asset/AssetForm";
import { fetchAllDealers } from "../../redux/slices/dealerSlice";
import { brands } from "../../constants/brands";
import { handleResponse } from "../../utils/helpers/helpers";
import {
  clearAssetDetails,
  createAsset,
  fetchAssetById,
  updateAsset,
} from "../../redux/slices/assetSlice";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "../../hooks/useQueryParams";
import LoaderOverlay from "../../components/LoaderOverlay";

const AddAssetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assetId } = useQueryParams();

  const { allDealersData } = useSelector((state) => state.dealer);
  const { isCreatingAsset, isUpdatingAsset, isFetchingDetails, assetDetails } =
    useSelector((state) => state.asset);

  useEffect(() => {
    if (assetId) {
      dispatch(fetchAssetById(assetId));
    }

    if (!allDealersData) {
      dispatch(fetchAllDealers());
    }

    return () => {
      dispatch(clearAssetDetails());
    };
  }, [assetId]);

  const handleAssetSubmit = async ({ values, resetForm }) => {
    const action = assetId
      ? updateAsset({ id: assetId, values })
      : createAsset(values);

    await handleResponse(dispatch(action), () => {
      resetForm();
      navigate("/assets");
    });
  };

  return (
    <>
      <LoaderOverlay
        show={assetId && isFetchingDetails}
        text="Fetching asset details…"
      />
      <div className="space-y-6">
        <PageHeader
          title={assetId ? "Update Asset" : "Add Asset"}
          description={
            assetId
              ? "Update asset information."
              : "Fill in the information below to add a new asset."
          }
          showBackButton
        />

        <AssetForm
          onSubmit={handleAssetSubmit}
          dealers={allDealersData?.data}
          brands={brands}
          asset={assetDetails}
          loading={isCreatingAsset || isUpdatingAsset}
        />
      </div>
    </>
  );
};

export default AddAssetPage;
