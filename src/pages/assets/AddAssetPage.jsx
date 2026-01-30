import React, { useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import AssetForm from "../../partial/asset/AssetForm";
import { fetchAllDealers } from "../../redux/slices/dealerSlice";
import { brands } from "../../constants/brands";
import { handleResponse } from "../../utils/helpers/helpers";
import { createAsset } from "../../redux/slices/assetSlice";
import { useNavigate } from "react-router-dom";

const AddAssetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allDealersData } = useSelector((state) => state.dealer);
  const { isCreatingAsset } = useSelector((state) => state.asset);
  useEffect(() => {
    if (!allDealersData) {
      dispatch(fetchAllDealers());
    }
  }, []);

  const handleAssetSubmit = async ({ values, resetForm }) => {
    await handleResponse(dispatch(createAsset(values)), () => {
      resetForm();
      navigate(`/assets`);
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Asset"
        description="Fill in the information below to add a new asset to your inventory."
        showBackButton
      />

      <AssetForm
        onSubmit={handleAssetSubmit}
        dealers={allDealersData?.data}
        brands={brands}
        loading={isCreatingAsset}
      />
    </div>
  );
};

export default AddAssetPage;
