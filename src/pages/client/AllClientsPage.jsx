import React, { useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClients } from "../../redux/slices/clientSlice";
import { formatDate } from "../../utils/dateFormatter";
import {
  Calendar,
  CheckCircle,
  Edit2,
  Eye,
  Mail,
  Plus,
  User,
  Users,
  XCircle,
} from "lucide-react";
import SmartTable from "../../components/layout/SmartTable";
import { useNavigate } from "react-router-dom";

const AllClientsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allClientsData, loading } = useSelector((state) => state.client);

  const { clients, totalClients } = allClientsData || {};
  const fetchClients = () => {
    dispatch(fetchAllClients());
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const clientColumns = [
    /* ---------------- Client ---------------- */
    {
      label: "Client",
      key: "client",
      render: (client) => (
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white">
            <User className="h-5 w-5 text-slate-700" />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {client?.name || "—"}
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500 truncate">
              <Mail className="h-3 w-3" />
              {client?.email || "No Email"}
            </div>
          </div>
        </div>
      ),
    },

    /* ---------------- Company ---------------- */
    {
      label: "Company",
      key: "company",
      render: (client) => (
        <div className="text-sm text-slate-700 truncate max-w-[180px]">
          {client?.company || "—"}
        </div>
      ),
    },

    /* ---------------- Phone ---------------- */
    {
      label: "Phone",
      key: "phone",
      render: (client) => (
        <div className="text-sm text-slate-600">{client?.phone || "—"}</div>
      ),
    },

    /* ---------------- Dealers Count ---------------- */
    {
      label: "Dealers",
      key: "dealers",
      render: (client) => {
        const count = client?.dealerIds?.length || 0;

        return count > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            <Users className="h-3.5 w-3.5" />
            {count} Dealer{count > 1 ? "s" : ""}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            <Users className="h-3.5 w-3.5" />
            None
          </span>
        );
      },
    },

    /* ---------------- Status ---------------- */
    {
      label: "Status",
      key: "status",
      render: (client) => (
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold
          ${
            client?.isActive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {client?.isActive ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          {client?.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    /* ---------------- Created On ---------------- */
    {
      label: "Created On",
      key: "createdAt",
      render: (client) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-medium text-slate-700">
            {formatDate(client?.createdAt, "long")}
          </span>
        </div>
      ),
    },
  ];

  const rowActions = [
    {
      label: "View Client",
      onClick: (client) => navigate(`/clients/client?clientId=${client?._id}`),
      icon: Eye,
    },
    {
      label: "Update Client",
      onClick: (client) => navigate(`/clients/add?clientId=${client?._id}`),
      icon: Edit2,
      color: "blue",
    },
  ];

  const actions = [
    {
      label: "Add Client",
      type: "secondary",
      icon: Plus,
      onClick: () => navigate(`/clients/add`),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Clients"
        description="Manage and view all registered clients in one place."
        actions={actions}
      />

      <SmartTable
        title="All Clients"
        totalcount={totalClients ?? 0}
        data={clients || []}
        columns={clientColumns}
        actions={rowActions}
        emptyMessage="No clients found"
        emptyDescription="There are no clients registered yet."
        loading={loading}
      />
    </div>
  );
};

export default AllClientsPage;
