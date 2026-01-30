import { saveAs } from "file-saver";

export function downloadBlob({
  data,
  fileName = "file",
  showToast = true,
  onError,
} = {}) {
  try {
    if (!data) {
      toast.error("Nothing to download");
      return;
    }

    const blob =
      data instanceof Blob
        ? data
        : new Blob([data], { type: "application/octet-stream" });

    saveAs(blob, fileName);

  } catch (err) {
    console.error("Download failed:", err);

    if (showToast && typeof toast === "function") {
      toast.error("Download failed");
    }

    if (typeof onError === "function") {
      onError(err);
    }
  }
}