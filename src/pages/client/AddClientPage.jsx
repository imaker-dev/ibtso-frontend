import React, { useEffect } from "react";
import PageHeader from "../../components/layout/PageHeader";
import ClientForm from "../../partial/client/ClientForm";
import { useQueryParams } from "../../hooks/useQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDealers } from "../../redux/slices/dealerSlice";
import { handleResponse } from "../../utils/helpers/helpers";
import {
  clearClientDetails,
  createClient,
  fetchClientById,
  updateClient,
} from "../../redux/slices/clientSlice";
import { useNavigate } from "react-router-dom";
import LoaderOverlay from "../../components/LoaderOverlay";

const AddClientPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useQueryParams();
  const { allDealersData } = useSelector((state) => state.dealer);
  const {
    clientDetails,
    isFetchingClientDetail,
    isCreatingClient,
    isUpdatingClient,
  } = useSelector((state) => state.client);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchClientById(clientId));
    }
    if (!allDealersData) {
      dispatch(fetchAllDealers());
    }
    return () => {
      dispatch(clearClientDetails());
    };
  }, [clientId]);

  const handleClientSubmit = async ({ values, resetForm }) => {
    const action = clientId
      ? updateClient({ id: clientId, values })
      : createClient(values);

    await handleResponse(dispatch(action), () => {
      resetForm();
      navigate(`/clients`);
    });
  };

  return (
    <>
      <LoaderOverlay
        show={clientId && isFetchingClientDetail}
        text="Fetching client details…"
      />
      <div className="space-y-6">
        <PageHeader
          title={clientId ? "Update Client" : "Add Client"}
          description={
            clientId
              ? "Modify client details and dealer associations."
              : "Create a new client by entering the required details below."
          }
          showBackButton
        />

        <ClientForm
          onSubmit={handleClientSubmit}
          dealers={allDealersData?.data}
          client={clientDetails}
          loading={isCreatingClient || isUpdatingClient}
        />
      </div>
    </>
  );
};

export default AddClientPage;
