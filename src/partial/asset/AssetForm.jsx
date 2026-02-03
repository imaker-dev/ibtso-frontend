import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Package, Ruler, Calendar, MapPin, Loader, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealerById } from "../../redux/slices/dealerSlice";

/* -------------------- Validation -------------------- */
const assetValidationSchema = Yup.object().shape({
  fixtureNo: Yup.string().required("Fixture number is required"),
  assetNo: Yup.string().required("Asset number is required"),

  brand: Yup.string().required("Brand is required"),
  standType: Yup.string().required("Stand type is required"),
  clientId: Yup.string().required("Client is required"),
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

const MAX_FILES = 8;
const MAX_SIZE_MB = 5;

/* -------------------- Component -------------------- */
const AssetForm = ({ onSubmit, loading = false, clients = [], asset }) => {
  const dispatch = useDispatch();
  const { delearDetails, isFetchingDealerDetails } = useSelector(
    (state) => state.dealer,
  );

  const { assignedBrands } = delearDetails || {};

  useEffect(() => {
    if (asset?.dealerId?._id) {
      dispatch(fetchDealerById(asset?.dealerId?._id));
    }
  }, [asset, dispatch]);

  const initialValues = {
    fixtureNo: asset?.fixtureNo || "",
    assetNo: asset?.assetNo || "",

    // FIXED
    brand: asset?.brandId?._id || "",
    standType: asset?.standType || "",
    clientId: asset?.clientId?._id || "",
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

    // NEW
    images: asset?.imageUrls || [],
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    /* ---------- Basic Fields ---------- */
    formData.append("fixtureNo", values.fixtureNo);
    formData.append("assetNo", values.assetNo);
    formData.append("standType", values.standType || "");
    formData.append("status", values.status);

    /* ---------- IDs ---------- */
    formData.append("brandId", values.brand); // backend expects brandId
    formData.append("dealerId", values.dealerId);

    if (values.clientId) {
      formData.append("clientId", values.clientId);
    }

    /* ---------- Date ---------- */
    if (values.installationDate) {
      formData.append(
        "installationDate",
        new Date(values.installationDate).toISOString(),
      );
    }

    /* ---------- Dimension (JSON STRING) ---------- */
    const dimensionPayload = {
      length: Number(values.dimension.length),
      height: Number(values.dimension.height),
      depth: Number(values.dimension.depth),
      unit: values.dimension.unit,
    };

    formData.append("dimension", JSON.stringify(dimensionPayload));

    /* ---------- Images ---------- */
    values.images.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img); // binary
      } else if (typeof img === "string") {
        formData.append("images", img); // url
      }
    });

    /* ---------- Submit ---------- */
    if (onSubmit) {
      await onSubmit({ values: formData, resetForm });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={assetValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        console.log(initialValues);
        const selectedClient = clients.find((c) => c._id === values.clientId);

        const clientDealers = selectedClient?.dealerIds || [];
        return (
          <Form autoComplete="off" className="space-y-6">
            {/* -------- Asset Info -------- */}
            <section className="bg-white rounded-xl">
              <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
                <Package className="w-5 h-5 text-secondary-500" />
                Asset Information
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
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
              </div>
            </section>

            {/* -------- Dimensions -------- */}
            <section className="bg-white rounded-xl">
              <div className="text-xl font-bold p-5 border-b border-slate-200 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-secondary-500" />
                Dimensions
              </div>

              <div className="grid sm:grid-cols-4 gap-6 p-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Length
                  </label>
                  <Field
                    name="dimension.length"
                    type="number"
                    className="w-full form-input py-3"
                  />
                  <SimpleError name="dimension.length" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Height
                  </label>
                  <Field
                    name="dimension.height"
                    type="number"
                    className="w-full form-input py-3"
                  />
                  <SimpleError name="dimension.height" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Depth
                  </label>
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
                <Calendar className="w-5 h-5 text-secondary-500" />
                Installation Details
              </div>

              <div className="grid sm:grid-cols-3 gap-6 p-5">
                {/* client */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Client
                  </label>

                  <Field
                    as="select"
                    name="clientId"
                    className="w-full form-select py-3"
                    onChange={(e) => {
                      setFieldValue("clientId", e.target.value);
                      setFieldValue("dealerId", "");
                    }}
                  >
                    <option value="">Select Client</option>

                    {clients.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} • {c.company || "No Company"}
                      </option>
                    ))}
                  </Field>

                  <SimpleError name="clientId" />
                </div>

                {/* dealer  */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Dealer
                  </label>

                  <Field
                    as="select"
                    name="dealerId"
                    className="w-full form-select py-3"
                    disabled={!values.clientId || clientDealers?.length === 0}
                    onChange={(e) => {
                      const dealerId = e.target.value;
                      setFieldValue("dealerId", dealerId);
                      setFieldValue("brand", ""); // reset brand

                      if (dealerId) {
                        dispatch(fetchDealerById(dealerId));
                      } else {
                        setDealerBrands([]);
                      }
                    }}
                  >
                    {!values.clientId ? (
                      <option value="">Select Client First</option>
                    ) : clientDealers?.length === 0 ? (
                      <option value="">No dealers available</option>
                    ) : (
                      <>
                        <option value="">Select Dealer</option>
                        {clientDealers?.map((d) => (
                          <option key={d._id} value={d._id}>
                            {d.name} • {d.shopName}
                          </option>
                        ))}
                      </>
                    )}
                  </Field>

                  <SimpleError name="dealerId" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Brand
                  </label>

                  <Field
                    as="select"
                    name="brand"
                    className="w-full form-select py-3"
                    disabled={!values?.dealerId || assignedBrands?.length === 0}
                  >
                    {!values?.dealerId ? (
                      <option value="">Select Dealer First</option>
                    ) : isFetchingDealerDetails ? (
                      <option value="">Loading brands...</option>
                    ) : assignedBrands?.length === 0 ? (
                      <option value="">No brands assigned</option>
                    ) : (
                      <>
                        <option value="">Select Brand</option>
                        {assignedBrands?.map((b) => (
                          <option key={b?.brand?._id} value={b?.brand?._id}>
                            {b?.brand?.name}
                          </option>
                        ))}
                      </>
                    )}
                  </Field>

                  <SimpleError name="brand" />
                </div>
              </div>
            </section>

            {/* -------- Premium Images -------- */}
            <section className="bg-white rounded-xl border border-slate-200">
              {/* HEADER */}
              <div className="flex items-center justify-between p-5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-secondary-500" />
                  <h2 className="text-xl font-bold">Asset Images</h2>
                </div>

                {values.images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFieldValue("images", [])}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* UPLOAD BOX */}
                <label
                  className={`block border border-dashed rounded-lg p-8 text-center cursor-pointer transition
      ${
        values.images.length >= MAX_FILES
          ? "border-slate-200 bg-slate-50 cursor-not-allowed"
          : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
      }`}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    disabled={values.images.length >= MAX_FILES}
                    onChange={(e) => {
                      let files = Array.from(e.target.files || []);

                      // SIZE FILTER
                      files = files.filter(
                        (f) => f.size <= MAX_SIZE_MB * 1024 * 1024,
                      );

                      // COUNT LIMIT
                      const remaining = MAX_FILES - values.images.length;
                      files = files.slice(0, remaining);

                      setFieldValue("images", [...values.images, ...files]);
                    }}
                  />

                  <p className="text-sm font-medium text-slate-700">
                    Click to upload or drag images here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PNG, JPG • Max {MAX_FILES} files • {MAX_SIZE_MB}MB each
                  </p>
                </label>

                {/* COUNT INFO */}
                {values.images.length > 0 && (
                  <p className="text-sm text-slate-600">
                    {values.images.length} of {MAX_FILES} images selected
                  </p>
                )}

                {/* IMAGE GRID */}
                {values.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {values.images.map((file, index) => {
                      const preview =
                        typeof file === "string"
                          ? file
                          : URL.createObjectURL(file);

                      return (
                        <div
                          key={index}
                          className="relative border border-slate-200 rounded-md overflow-hidden bg-slate-50 group"
                        >
                          <img
                            src={preview}
                            alt="preview"
                            className="w-full h-32 object-cover"
                          />

                          {/* REMOVE BUTTON */}
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = values.images.filter(
                                (_, i) => i !== index,
                              );
                              setFieldValue("images", newImages);
                            }}
                            className="
    absolute top-2 right-2
    bg-red-500 text-white p-1 rounded-full shadow
    
  "
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* FOOTER */}
                          <div className="px-2 py-1 bg-white text-xs text-slate-600 truncate border-t border-slate-200">
                            {typeof file === "string"
                              ? file.split("/").pop()
                              : file.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                disabled={loading}
                className="btn w-full lg:w-fit py-3 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading && <Loader className="w-5 h-5 animate-spin mr-2" />}
                {asset ? "Update Asset" : "Create Asset"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AssetForm;
