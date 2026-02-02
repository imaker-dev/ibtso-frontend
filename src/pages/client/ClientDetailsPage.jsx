import React, { useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientById } from "../../redux/slices/clientSlice";
import {
  User,
  Mail,
  Store,
  Calendar,
  MapPin,
  Phone,
  ExternalLink,
  Users,
  Edit,
  Eye,
} from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../../components/NoDataFound";
import SmartTable from "../../components/layout/SmartTable";
import ClientDetailsSkeleton from "./ClientDetailsSkeleton";

const ClientDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { clientId } = useQueryParams();

  const { clientDetails, isFetchingClientDetails } = useSelector(
    (state) => state.client,
  );

  const { dealerIds } = clientDetails || {};
  console.log(dealerIds);

  useEffect(() => {
    if (clientId) dispatch(fetchClientById(clientId));
  }, [clientId]);

  if (isFetchingClientDetails) return <ClientDetailsSkeleton />;

  if (!isFetchingClientDetails && !clientDetails) {
    return (
      <NoDataFound
        title="Client Not Found"
        description="The client you’re looking for doesn’t exist or may have been removed."
        className="h-[80dvh]"
        icon={User}
      />
    );
  }

  const dealerColumns = [
    {
      label: "Dealer",
      key: "dealer",
      render: (dealer) => (
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white">
            <Store className="h-5 w-5 text-slate-700" />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {dealer?.name || "—"}
            </div>
            <div className="text-xs font-medium text-slate-500 truncate mt-0.5">
              {dealer?.shopName || "—"}
            </div>
          </div>
        </div>
      ),
    },

    {
      label: "Contact",
      key: "contact",
      render: (dealer) => (
        <div className="flex flex-col gap-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[180px]">
              {dealer?.email || "—"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{dealer?.phone || "—"}</span>
          </div>
        </div>
      ),
    },

    {
      label: "Location",
      key: "location",
      render: (dealer) => (
        <div className="flex items-start gap-2 max-w-[240px]">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />

          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-600 line-clamp-2">
              {dealer?.location?.address || "—"}
            </span>

            {dealer?.location?.googleMapLink ? (
              <button
                onClick={() =>
                  window.open(dealer.location.googleMapLink, "_blank")
                }
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
              >
                View Map
                <ExternalLink className="h-3 w-3" />
              </button>
            ) : (
              <span className="text-xs text-slate-400">Map not available</span>
            )}
          </div>
        </div>
      ),
    },
  ];

  const rowActions = [
    {
      label: "View Details",
      onClick: (dealer) => navigate(`/dealers/dealer?dealerId=${dealer._id}`),
      icon: Eye,
    },
  ];

  const actions = [
    {
      label: "Update Client",
      type: "secondary",
      icon: Edit,
      onClick: () => navigate(`/clients/add?clientId=${clientId}`),
    },
  ];

  const InfoRow = ({ label, value, icon: Icon, isLink, link, mono }) => {
    const display = value && value !== "" ? value : "N/A";

    return (
      <div>
        <p className="text-xs font-medium text-gray-600 uppercase mb-1">
          {label}
        </p>

        {isLink && display !== "N/A" ? (
          <a
            href={link}
            className="text-sm font-semibold text-blue-600 hover:underline flex gap-2 items-center"
          >
            {Icon && <Icon className="h-4 w-4" />}
            {display}
          </a>
        ) : (
          <p
            className={`text-sm font-semibold text-gray-900 ${
              mono
                ? "font-mono bg-gray-50 px-2 py-1 rounded border border-slate-200"
                : ""
            }`}
          >
            {display}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Client Details"
        description="View and manage client information and associated dealers."
        actions={actions}
        showBackButton
      />

      {/* Top Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* -------- Personal Info -------- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-200 p-5">
            <User className="h-5 w-5 text-secondary-600" />
            Personal Information
          </h3>

          <div className="p-5 space-y-4">
            <InfoRow label="Full Name" value={clientDetails?.name} />

            <InfoRow
              label="Email"
              value={clientDetails?.email}
              icon={Mail}
              isLink
              link={`mailto:${clientDetails?.email}`}
            />

            <InfoRow
              label="Phone"
              value={clientDetails?.phone}
              icon={Phone}
              isLink
              link={`tel:${clientDetails?.phone}`}
            />
          </div>
        </div>

        {/* -------- Business Info -------- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-200 p-5">
            <Store className="h-5 w-5 text-secondary-600" />
            Business Information
          </h3>

          <div className="p-5 space-y-4">
            <InfoRow label="Company" value={clientDetails?.company} />

            <InfoRow label="VATIN" value={clientDetails?.vatin} mono />

            <InfoRow
              label="Place of Supply"
              value={clientDetails?.placeOfSupply}
            />

            <InfoRow label="Country" value={clientDetails?.country} />

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase mb-1">
                Address
              </p>
              <p className="text-sm text-gray-900 leading-relaxed">
                {clientDetails?.address || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* -------- Meta Info -------- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-200 p-5">
            <Calendar className="h-5 w-5 text-secondary-600" />
            Meta Information
          </h3>

          <div className="p-5 space-y-4">
            <InfoRow
              label="Created On"
              value={formatDate(clientDetails?.createdAt, "long")}
            />

            <InfoRow
              label="Updated On"
              value={formatDate(clientDetails?.updatedAt, "long")}
            />

            <InfoRow
              label="Created By"
              value={clientDetails?.createdBy?.name}
            />

            <div>
              <p className="text-xs font-medium text-gray-600 uppercase mb-1">
                Status
              </p>
              <span
                className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  clientDetails?.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {clientDetails?.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dealers Section */}
      <SmartTable
        title="Client Dealers"
        totalcount={dealerIds?.length ?? 0}
        data={dealerIds || []}
        columns={dealerColumns}
        actions={rowActions}
        emptyMessage="No dealers found"
        emptyDescription="There are no dealers added yet. Once dealers are created, they will appear here with their contact details, location, and status."
        loading={isFetchingClientDetails}
      />
    </div>
  );
};

export default ClientDetailsPage;
