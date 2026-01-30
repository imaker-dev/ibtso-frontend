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
} from "lucide-react";

/* -------------------- Validation -------------------- */
const dealerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  shopName: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Shop name is required"),
  vatRegistration: Yup.string()
    .min(5, "Minimum 5 characters")
    .required("VAT registration is required"),

  address: Yup.string()
    .min(10, "Minimum 10 characters")
    .required("Address is required"),
  latitude: Yup.number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),
  longitude: Yup.number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),
  googleMapLink: Yup.string()
    .url("Invalid URL")
    .required("Google Maps link is required"),
});

/* -------------------- Error Text -------------------- */
const SimpleError = ({ name }) => (
  <ErrorMessage
    name={name}
    render={(msg) => <p className="mt-1 text-sm text-red-600">{msg}</p>}
  />
);

/* -------------------- Component -------------------- */
const DealerForm = ({ onSubmit, loading = false }) => {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    shopName: "",
    vatRegistration: "",
    address: "",
    latitude: "",
    longitude: "",
    googleMapLink: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const payload = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      shopName: values.shopName,
      vatRegistration: values.vatRegistration,
      location: {
        address: values.address,
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        googleMapLink: values.googleMapLink,
      },
    };

    if (onSubmit) await onSubmit({ values: payload, resetForm });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={dealerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ dirty }) => (
        <Form autoComplete="off" className="space-y-6">
          {/* -------- Personal Info -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
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
                    placeholder="+1 234 567 8900"
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
              <Store className="w-5 h-5 text-blue-600" />
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

          {/* -------- Location Info -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
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

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Latitude
                  </label>
                  <Field
                    name="latitude"
                    type="number"
                    placeholder="12.9716"
                    className="w-full form-input py-3"
                  />
                  <SimpleError name="latitude" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Longitude
                  </label>
                  <Field
                    name="longitude"
                    type="number"
                    placeholder="77.5946"
                    className="w-full form-input py-3"
                  />
                  <SimpleError name="longitude" />
                </div>
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
          <div className="flex gap-4">
            <button
              type="reset"
              className="btn flex-1 py-3 border border-slate-300"
            >
              Clear Form
            </button>

            <button
              type="submit"
              // disabled={loading || !dirty}
              className="btn flex-1 py-3 bg-primary-500 hover:bg-primary-600 text-white disabled:bg-slate-200"
            >
              {loading && <Loader className="w-5 h-5 animate-spin mr-2" />}
              Create Dealer Profile
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DealerForm;
