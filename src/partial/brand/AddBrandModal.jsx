import React from "react";
import ModalBasic from "../../components/ModalBasic";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Loader } from "lucide-react";

/* ---------------- Validation ---------------- */
const brandSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 characters")
    .max(50, "Max 50 characters")
    .required("Brand name is required"),
});

/* ---------------- Error Component ---------------- */
const SimpleError = ({ name }) => (
  <ErrorMessage
    name={name}
    render={(msg) => <p className="text-sm text-red-600 mt-1">{msg}</p>}
  />
);

/* ---------------- Component ---------------- */
const AddBrandModal = ({ isOpen, onClose, onSubmit, loading = false }) => {
  const initialValues = {
    name: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (onSubmit) {
      await onSubmit({ values, resetForm });
    }
  };

  return (
    <ModalBasic
      id="add-brand-modal"
      title="Add Brand"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={brandSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form autoComplete="off">
            <div className="p-4 space-y-4">
              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <Field
                  name="name"
                  placeholder="e.g. Apple"
                  className="w-full form-input py-2"
                  autoComplete="off"
                />
                <SimpleError name="name" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 p-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="btn border bg-gray-100 hover:bg-slate-200 shadow-none"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn bg-emerald-600 hover:bg-emerald-700 text-white flex items-center"
                disabled={loading}
              >
                {loading && <Loader className="w-4 h-4 animate-spin mr-2" />}
                {loading ? "Saving..." : "Save Brand"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalBasic>
  );
};

export default AddBrandModal;
