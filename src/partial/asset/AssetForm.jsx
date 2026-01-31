import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Package, Ruler, Calendar, MapPin, Loader } from "lucide-react";

/* -------------------- Validation -------------------- */
const assetValidationSchema = Yup.object().shape({
  fixtureNo: Yup.string().required("Fixture number is required"),
  assetNo: Yup.string().required("Asset number is required"),

  brand: Yup.string().required("Brand is required"),
  standType: Yup.string().required("Stand type is required"),
  dealerId: Yup.string().required("Dealer is required"),

  installationDate: Yup.date().required("Installation date is required"),

  dimension: Yup.object().shape({
    length: Yup.number().typeError("Must be a number").required("Required"),
    height: Yup.number().typeError("Must be a number").required("Required"),
    depth: Yup.number().typeError("Must be a number").required("Required"),
    unit: Yup.string().required("Unit is required"),
  }),

  status: Yup.string().required("Status is required"),
});

/* -------------------- Error Text -------------------- */
const SimpleError = ({ name }) => (
  <ErrorMessage
    name={name}
    render={(msg) => <p className="mt-1 text-sm text-red-600">{msg}</p>}
  />
);

/* -------------------- Component -------------------- */
const AssetForm = ({
  onSubmit,
  loading = false,
  dealers = [],
  brands = [],
  asset,
}) => {
  const initialValues = {
    fixtureNo: asset?.fixtureNo || "",
    assetNo: asset?.assetNo || "",
    brand: asset?.brand || "",
    standType: asset?.standType || "",
    dealerId: asset?.dealerId?._id || "",
    installationDate: asset?.installationDate
      ? asset.installationDate.split("T")[0]
      : "",

    dimension: {
      length: asset?.dimension?.length || "",
      height: asset?.dimension?.height || "",
      depth: asset?.dimension?.depth || "",
      unit: asset?.dimension?.unit || "cm",
    },

    status: asset?.status || "ACTIVE",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      ...values,
      dimension: {
        ...values.dimension,
        length: Number(values.dimension.length),
        height: Number(values.dimension.height),
        depth: Number(values.dimension.depth),
      },
    };

    if (onSubmit) await onSubmit({ values: payload, resetForm });
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={assetValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form autoComplete="off" className="space-y-6">
          {/* -------- Asset Info -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Asset Information
            </div>

            <div className="grid sm:grid-cols-3 gap-6 p-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fixture No
                </label>
                <Field
                  name="fixtureNo"
                  placeholder="e.g. FIX-001"
                  className="w-full form-input py-3"
                />
                <SimpleError name="fixtureNo" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Asset No
                </label>
                <Field
                  name="assetNo"
                  placeholder="e.g. ASSET-001"
                  className="w-full form-input py-3"
                />
                <SimpleError name="assetNo" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <Field
                  as="select"
                  name="brand"
                  className="w-full form-select py-3"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Field>
                <SimpleError name="brand" />
              </div>
            </div>
          </section>

          {/* -------- Dimensions -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-600" />
              Dimensions
            </div>

            <div className="grid sm:grid-cols-4 gap-6 p-5">
              <div>
                <label className="block text-sm font-medium mb-1">Length</label>
                <Field
                  name="dimension.length"
                  type="number"
                  className="w-full form-input py-3"
                />
                <SimpleError name="dimension.length" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Height</label>
                <Field
                  name="dimension.height"
                  type="number"
                  className="w-full form-input py-3"
                />
                <SimpleError name="dimension.height" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Depth</label>
                <Field
                  name="dimension.depth"
                  type="number"
                  className="w-full form-input py-3"
                />
                <SimpleError name="dimension.depth" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Unit</label>
                <Field
                  as="select"
                  name="dimension.unit"
                  className="w-full form-select py-3"
                >
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                  <option value="inch">inch</option>
                </Field>
              </div>
            </div>
          </section>

          {/* -------- Installation & Dealer -------- */}
          <section className="bg-white rounded-xl">
            <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Installation Details
            </div>

            <div className="grid sm:grid-cols-3 gap-6 p-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Installation Date
                </label>
                <Field
                  name="installationDate"
                  type="date"
                  className="w-full form-input py-3"
                />
                <SimpleError name="installationDate" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Stand Type
                </label>
                <Field name="standType" className="w-full form-input py-3" />
                <SimpleError name="standType" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Dealer</label>
                <Field
                  as="select"
                  name="dealerId"
                  className="w-full form-select py-3"
                >
                  <option value="">Select Dealer</option>
                  {dealers?.map((d) => (
                    <option key={d?._id} value={d?._id}>
                      {d?.name} • {d?.shopName}
                    </option>
                  ))}
                </Field>
                <SimpleError name="dealerId" />
              </div>
            </div>
          </section>

          {/* -------- Actions -------- */}
          <div className="flex gap-4">
            <button type="reset" className="btn py-3 flex-1 border">
              Clear Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn py-3 flex-1 bg-primary-500 text-white"
            >
              {loading && <Loader className="w-5 h-5 animate-spin mr-2" />}
              {asset ? "Update Asset" : "Create Asset"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AssetForm;
