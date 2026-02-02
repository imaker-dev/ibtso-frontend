import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Search, Check } from "lucide-react";

const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Select items...",
  variant = "default",
  searchable = false,
  disabled = false,
  maxSelections,
  className = "",
  showSelectAll = false,
  error = false,
  helpText = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const searchInputRef = useRef(null);

  /* ---------------- Outside Click ---------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Focus & Reset ---------------- */
  useEffect(() => {
    if (isOpen && searchable) searchInputRef.current?.focus();
    if (!isOpen) {
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  }, [isOpen, searchable]);

  /* ---------------- Helpers ---------------- */
  const safeOptions = Array.isArray(options) ? options : [];
  const getOptionById = (id) => safeOptions.find((o) => o.value === id);
  const isSelected = (id) => value.includes(id);
  const maxReached = maxSelections && value.length >= maxSelections;

  /* ---------------- Filter ---------------- */
  const filteredOptions = safeOptions.filter((o) =>
    (o.label || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ---------------- Select ---------------- */
  const handleSelect = (option) => {
    if (disabled || !option) return;

    if (isSelected(option.value)) {
      onChange(value.filter((id) => id !== option.value));
    } else {
      if (!maxReached) onChange([...value, option.value]);
    }
  };

  const removeSelected = (id, e) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== id));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    onChange([]);
    setSearchTerm("");
  };

  const handleSelectAll = () => {
    if (value.length === safeOptions.length) onChange([]);
    else onChange(safeOptions.map((o) => o.value));
  };

  /* ---------------- Styles ---------------- */
  const triggerBase = `
    w-full rounded-md border bg-white/90 backdrop-blur
    flex items-center justify-between
    shadow-sm transition-all duration-200
    ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "cursor-pointer"}
    ${
      error
        ? "border-red-400 focus-within:ring-red-400"
        : "border-slate-300 hover:border-slate-400"
    }
    ${isOpen ? "ring ring-emerald-500 border-emerald-500 shadow-md" : ""}
  `;

  const sizeMap = {
    compact: "py-2 px-3 text-sm min-h-[38px]",
    pill: "p-2 min-h-[44px]",
    tags: "p-2 min-h-[44px]",
    default: "py-3 px-4 min-h-[48px]",
  };

  /* ====================== RENDER ====================== */
  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      {/* Trigger */}
      <div
        className={`${triggerBase} ${sizeMap[variant]}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {value.length === 0 ? (
            <span className="text-slate-400">{placeholder}</span>
          ) : variant === "tags" || variant === "pill" ? (
            value.map((id) => {
              const item = getOptionById(id);
              if (!item) return null;

              return (
                <span
                  key={id}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg
                    ${
                      variant === "pill"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                >
                  {item.label || "Unknown"}
                  <button
                    onClick={(e) => removeSelected(id, e)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })
          ) : (
            <span className="font-medium text-slate-700">
              {value.length} selected
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-2">
          {value.length > 0 && (
            <button
              onClick={clearAll}
              className="p-1 rounded-md hover:bg-slate-100 transition"
            >
              <X size={16} />
            </button>
          )}
          <ChevronDown
            size={20}
            className={`text-slate-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow overflow-hidden">
          {/* Search */}
          {searchable && (
            <div className="p-3 border-b border-slate-200 bg-slate-50">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full form-input pl-9 pr-8 py-2"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* No Options */}
          {safeOptions.length === 0 && (
            <div className="p-6 text-center text-slate-500 text-sm">
              No options available
            </div>
          )}

          {/* No Search Results */}
          {safeOptions.length > 0 && filteredOptions.length === 0 && (
            <div className="p-6 text-center text-slate-500 text-sm">
              No results found
            </div>
          )}

          {/* Options */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.map((option, i) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2.5 cursor-pointer flex items-center gap-3 text-sm transition
                  ${isSelected(option.value) ? "bg-emerald-50" : ""}
                  ${i === highlightedIndex ? "bg-slate-100" : "hover:bg-slate-50"}
                  ${maxReached && !isSelected(option.value) ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <div
                  className={`w-4 h-4 border rounded flex items-center justify-center
                    ${
                      isSelected(option.value)
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-slate-400"
                    }`}
                >
                  {isSelected(option.value) && <Check size={12} />}
                </div>

                <span className="flex-1 truncate text-slate-700">
                  {option.label || "Unnamed"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {helpText && !error && (
        <p className="text-xs text-slate-500 mt-1">{helpText}</p>
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelect;
