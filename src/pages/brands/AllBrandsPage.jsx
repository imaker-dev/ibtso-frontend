import React, { useEffect, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { Calendar, Plus, Tag } from "lucide-react";
import AddBrandModal from "../../partial/brand/AddBrandModal";
import { useDispatch, useSelector } from "react-redux";
import { createBrand, fetchAllBrands } from "../../redux/slices/brandSlice";
import { handleResponse } from "../../utils/helpers/helpers";
import { formatDate } from "../../utils/dateFormatter";
import SmartTable from "../../components/layout/SmartTable";

const AllBrandsPage = () => {
  const dispatch = useDispatch();
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const { allBrandsData, loading, isCreatingBrand } = useSelector(
    (state) => state.brand,
  );
  const { brands, totalBrands } = allBrandsData || {};
  const fetchBrands = () => {
    dispatch(fetchAllBrands());
  };
  useEffect(() => {
    fetchBrands();
  }, []);

  const actions = [
    {
      label: "Add Brand",
      type: "secondary",
      icon: Plus,
      onClick: () => setShowAddBrandModal(true),
    },
  ];

  const handleAddBrand = async ({ values, resetForm }) => {
    await handleResponse(dispatch(createBrand(values)), () => {
      fetchBrands();
      setShowAddBrandModal(false);
      resetForm();
    });
  };

  const brandColumns = [
    {
      label: "Brand",
      key: "name",
      render: (brand) => (
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white">
            <Tag className="h-5 w-5 text-slate-700" />
          </div>

          <div className="text-sm font-semibold text-slate-900 truncate">
            {brand?.name || "—"}
          </div>
        </div>
      ),
    },

    {
      label: "Created On",
      key: "createdAt",
      render: (brand) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-700">
            {formatDate(brand?.createdAt, "long")}
          </span>
        </div>
      ),
    },

    {
      label: "Status",
      key: "status",
      render: (brand) => (
        <span
          className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
            brand?.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {brand?.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  console.log(allBrandsData);

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="All Brands"
          description="Central list of brands available for assets and dealer assignments."
          actions={actions}
        />

        <SmartTable
          title="All Brands"
          totalcount={totalBrands ?? 0}
          data={brands || []}
          columns={brandColumns}
          emptyMessage="No brands found"
          emptyDescription="There are no brands added yet."
          loading={loading}
        />
      </div>

      <AddBrandModal
        isOpen={showAddBrandModal}
        onClose={() => setShowAddBrandModal(false)}
        onSubmit={handleAddBrand}
        loading={isCreatingBrand}
      />
    </>
  );
};

export default AllBrandsPage;
