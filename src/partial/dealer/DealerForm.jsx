import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  User,
  Mail,
  Phone,
  Store,
  FileText,
  MapPin,
  Loader,
  Tag,
} from "lucide-react";
import { brands } from "../../constants/brands";
import MultiSelect from "../../components/MultiSelect";

/* -------------------- Validation -------------------- */
const dealerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),
  // phone: Yup.string()
  //   .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
  //   .required("Phone number is required"),

  // email: Yup.string().email("Invalid email").required("Email is required"),
  // shopName: Yup.string()
  //   .min(3, "Minimum 3 characters")
  //   .required("Shop name is required"),
  // vatRegistration: Yup.string()
  //   .min(5, "Minimum 5 characters")
  //   .required("VAT registration is required"),
  // address: Yup.string()
  //   .min(10, "Minimum 10 characters")
  //   .required("Address is required"),
  // googleMapLink: Yup.string()
  //   .url("Invalid URL")
  //   .required("Google Maps link is required"),

  brandIds: Yup.array().nullable(),
});

/* -------------------- Error Text -------------------- */
const SimpleError = ({ name }) => (
  <ErrorMessage
    name={name}
    render={(msg) => <p className="mt-1 text-sm text-red-600">{msg}</p>}
  />
);

/* -------------------- Component -------------------- */
const DealerForm = ({ onSubmit, loading = false, dealer, brands = [] }) => {
  // Convert dealers to options for MultiSelect
  const brandOptions = brands?.map((brand) => ({
    value: brand._id,
    label: `${brand.name}`,
    data: brand,
  }));

  const initialValues = {
    name: dealer?.dealer?.name || "",
    phone: dealer?.dealer?.phone || "",
    email: dealer?.dealer?.email || "",
    shopName: dealer?.dealer?.shopName || "",
    vatRegistration: dealer?.dealer?.vatRegistration || "",
    address: dealer?.dealer?.location?.address || "",
    googleMapLink: dealer?.dealer?.location?.googleMapLink || "",

    brandIds: dealer?.assignedBrands
      ? dealer.assignedBrands.map((b) => b?.brand?._id)
      : [],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const payload = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      shopName: values.shopName,
      vatRegistration: values.vatRegistration,
      brandIds: values.brandIds,
      location: {
        address: values.address,
        googleMapLink: values.googleMapLink,
      },
    };

    if (onSubmit) await onSubmit({ values: payload, resetForm });
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={dealerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ dirty, values, setFieldValue }) => (
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
                  Full Name
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
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full pl-10 form-input py-3"
                  />
                </div>
                <SimpleError name="email" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <Field
                    name="phone"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full pl-10 form-input py-3"
                  />
                </div>
                <SimpleError name="phone" />
              </div>
            </div>
          </section>

          {/* -------- Business Info -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <Store className="w-5 h-5 text-secondary-500" />
              Business Information
            </div>

            <div className="grid sm:grid-cols-2 gap-6 p-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Shop Name
                </label>
                <Field
                  name="shopName"
                  placeholder="Doe Electronics"
                  className="w-full form-input py-3"
                />
                <SimpleError name="shopName" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  VAT Number
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                  <Field
                    name="vatRegistration"
                    placeholder="VAT123456"
                    className="w-full pl-10 form-input py-3"
                  />
                </div>
                <SimpleError name="vatRegistration" />
              </div>
            </div>
          </section>

          {/* -------- Brands -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <Tag className="w-5 h-5 text-secondary-500" />
              Brands
            </div>

            <div className="p-5">
              <MultiSelect
                options={brandOptions}
                value={values.brandIds}
                onChange={(ids) => setFieldValue("brandIds", ids)}
                searchable
                variant="tags"
                placeholder="Search & select brands..."
                helpText="Select brands associated with this dealer"
              />
              <SimpleError name="brandIds" />
            </div>
          </section>

          {/* -------- Location Info -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary-500" />
              Location Information
            </div>

            <div className="space-y-6 p-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Field
                  as="textarea"
                  name="address"
                  rows="2"
                  placeholder="123 Main Street, City, State, ZIP"
                  className="w-full form-textarea resize-none"
                />
                <SimpleError name="address" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Google Maps Link
                </label>
                <Field
                  name="googleMapLink"
                  placeholder="https://maps.google.com/?q=lat,lng"
                  className="w-full form-input py-3"
                />
                <SimpleError name="googleMapLink" />
              </div>
            </div>
          </section>

          {/* -------- Actions -------- */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              className="btn w-full lg:w-fit py-3 border bg-white hover:bg-slate-100 border-slate-300 shadow-none"
            >
              Clear Form
            </button>

            <button
              type="submit"
              className="btn w-full lg:w-fit py-3 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading && <Loader className="w-5 h-5 animate-spin mr-2" />}
              {dealer ? "Update Dealer" : "Create Dealer"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DealerForm;
