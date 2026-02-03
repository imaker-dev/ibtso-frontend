import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  FileText,
  Users,
  Loader,
} from "lucide-react";
import MultiSelect from "../../components/MultiSelect";

/* -------------------- Validation -------------------- */
const clientValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 characters")
    .required("Client name is required"),

  email: Yup.string().email("Invalid email").nullable(),
  phone: Yup.string().nullable(),
  company: Yup.string().nullable(),
  address: Yup.string().nullable(),
  vatin: Yup.string().nullable(),
  placeOfSupply: Yup.string().nullable(),
  country: Yup.string().nullable(),
  dealerIds: Yup.array().nullable(),
});

/* -------------------- Error Text -------------------- */
const SimpleError = ({ name }) => (
  <ErrorMessage
    name={name}
    render={(msg) => <p className="mt-1 text-sm text-red-600">{msg}</p>}
  />
);

/* -------------------- Component -------------------- */
const ClientForm = ({ onSubmit, loading = false, dealers = [], client }) => {
  const initialValues = {
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    company: client?.company || "",
    address: client?.address || "",
    vatin: client?.vatin || "",
    placeOfSupply: client?.placeOfSupply || "",
    country: client?.country || "",
    dealerIds: client?.dealerIds ? client.dealerIds.map((d) => d._id) : [],
  };

  // Convert dealers to options for MultiSelect
  const dealerOptions = dealers.map((dealer) => ({
    value: dealer._id,
    label: `${dealer.name} (${dealer.shopName || "No Shop Name"})`,
    // description: `${dealer.location?.address || ''} • ${dealer.phone}`,
    data: dealer,
  }));

  const handleSubmit = async (values, { resetForm }) => {
    if (onSubmit) await onSubmit({ values, resetForm });
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={clientValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form autoComplete="off" className="space-y-6">
          {/* -------- Personal Info -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <User className="w-5 h-5 text-secondary-500" />
              Personal Information
            </div>

            <div className="grid sm:grid-cols-3 gap-6 p-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <Field
                  name="name"
                  placeholder="John Doe"
                  className="w-full form-input py-3"
                />
                <SimpleError name="name" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full form-input py-3"
                />
                <SimpleError name="email" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Field
                  name="phone"
                  placeholder="+1 234 567 890"
                  className="w-full form-input py-3"
                />
              </div>
            </div>
          </section>

          {/* -------- Business Info -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-secondary-500" />
              Business Information
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-5">
              <Field
                name="company"
                placeholder="Company"
                className="form-input py-3"
              />

              <div className="relative">
                <FileText className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <Field
                  name="vatin"
                  placeholder="VATIN"
                  className="w-full pl-10 form-input py-3"
                  onChange={(e) => setFieldValue("vatin", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* -------- Dealers -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary-500" />
              Dealers
            </div>

            <div className="p-5">
              <MultiSelect
                options={dealerOptions}
                value={values.dealerIds}
                onChange={(ids) => setFieldValue("dealerIds", ids)}
                searchable
                variant="tags"
                placeholder="Search & select dealers..."
                helpText="Select dealers associated with this client"
              />
              <SimpleError name="dealerIds" />
            </div>
          </section>

          {/* -------- Address -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary-500" />
              Address
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-5">
              <div className="sm:col-span-2">
                <Field
                  as="textarea"
                  name="address"
                  rows="2"
                  placeholder="Street, Area, Landmark..."
                  className="w-full form-textarea resize-none"
                />
              </div>
              <Field
                name="placeOfSupply"
                placeholder="Place of Supply"
                className="form-input py-3"
              />
              <Field
                name="country"
                placeholder="Country"
                className="form-input py-3"
              />
            </div>
          </section>

          {/* -------- Actions -------- */}
          <div className="flex justify-end gap-4">
            <button type="reset" className="btn border bg-white">
              Clear
            </button>

            <button
              type="submit"
              className="btn bg-emerald-600 hover:bg-emerald-700 text-white flex items-center"
              disabled={loading}
            >
              {loading && <Loader className="w-5 h-5 animate-spin mr-2" />}
              {client ? "Update Client" : "Create Client"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ClientForm;
