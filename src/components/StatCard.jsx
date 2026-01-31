import { cn } from "../utils/utils"

/* ============================================
   SAFE HELPERS
   ============================================ */
const safeValue = (val, fallback = 0) =>
  val === null || val === undefined || Number.isNaN(val) ? fallback : val

const safeTrend = (trend) =>
  trend && typeof trend === "object"
    ? {
        isPositive: Boolean(trend.isPositive),
        value: trend.value ?? "",
      }
    : null

/* ============================================
   COLOR STYLES - Premium Light Theme Palette
   ============================================ */
export const colorStyles = {
  slate: {
    card: "bg-white border border-slate-200/60",
    iconBg: "bg-slate-100 text-slate-600",
    accent: "text-slate-600",
    badge: "bg-slate-100 text-slate-700",
    title: "text-slate-500",
    value: "text-slate-900",
    subtitle: "text-slate-500",
  },
  emerald: {
    card: "bg-white border border-emerald-200/50",
    iconBg: "bg-emerald-100 text-emerald-600",
    accent: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    title: "text-emerald-600",
    value: "text-emerald-900",
    subtitle: "text-emerald-600",
  },
  blue: {
    card: "bg-white border border-blue-200/50",
    iconBg: "bg-blue-100 text-blue-600",
    accent: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    title: "text-blue-600",
    value: "text-blue-900",
    subtitle: "text-blue-600",
  },
  purple: {
    card: "bg-white border border-purple-200/50",
    iconBg: "bg-purple-100 text-purple-600",
    accent: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
    title: "text-purple-600",
    value: "text-purple-900",
    subtitle: "text-purple-600",
  },
  rose: {
    card: "bg-white border border-rose-200/50",
    iconBg: "bg-rose-100 text-rose-600",
    accent: "text-rose-600",
    badge: "bg-rose-100 text-rose-700",
    title: "text-rose-600",
    value: "text-rose-900",
    subtitle: "text-rose-600",
  },
  amber: {
    card: "bg-white border border-amber-200/50",
    iconBg: "bg-amber-100 text-amber-600",
    accent: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    title: "text-amber-600",
    value: "text-amber-900",
    subtitle: "text-amber-600",
  },
  cyan: {
    card: "bg-white border border-cyan-200/50",
    iconBg: "bg-cyan-100 text-cyan-600",
    accent: "text-cyan-600",
    badge: "bg-cyan-100 text-cyan-700",
    title: "text-cyan-600",
    value: "text-cyan-900",
    subtitle: "text-cyan-600",
  },
}

/* ============================================
   PREMIUM STAT CARD COMPONENT
   ============================================ */
export default function StatCard({
  title = "",
  value,
  subtitle,
  icon: Icon,
  color = "slate",
  variant = "default", // default | compact | minimal
  onClick,
  trend,
  className,
}) {
  const styles = colorStyles[color] || colorStyles.slate
  const displayValue = safeValue(value)
  const safeTrendData = safeTrend(trend)

  /* ---------- DEFAULT (PREMIUM) VARIANT ---------- */
  if (variant === "default") {
    return (
      <div
        onClick={onClick}
        className={cn(
          "group relative overflow-hidden rounded-2xl px-6 py-8 transition-all duration-300",
          "hover:shadow-lg hover:shadow-black/10",
          styles.card,
          onClick && "cursor-pointer hover:border-slate-300/80",
          className
        )}
      >
        {/* Premium gradient background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Animated background elements */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-slate-200/30 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-gradient-to-tr from-slate-200/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className={cn("text-sm font-medium mb-2", styles.title)}>{title}</p>
            <div className="flex items-baseline gap-2">
              <p className={cn("text-5xl font-bold tracking-tight", styles.value)}>
                {displayValue}
              </p>
            </div>
            
            {subtitle && (
              <p className={cn("text-sm mt-3", styles.subtitle)}>{subtitle}</p>
            )}

            {safeTrendData && (
              <div className="mt-4 inline-flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
                    styles.badge,
                    safeTrendData.isPositive ? "text-emerald-600" : "text-rose-600"
                  )}
                >
                  <span className="text-lg">
                    {safeTrendData.isPositive ? "↑" : "↓"}
                  </span>
                  {safeTrendData.value}
                </span>
              </div>
            )}
          </div>

          {Icon && (
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300",
                "group-hover:scale-110 group-hover:shadow-md",
                styles.iconBg
              )}
            >
              <Icon className="h-8 w-8" />
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ---------- COMPACT VARIANT ---------- */
  if (variant === "compact") {
    return (
      <div
        onClick={onClick}
        className={cn(
          "group relative overflow-hidden rounded-xl px-4 py-5 transition-all duration-300",
          "hover:shadow-md hover:shadow-black/8",
          styles.card,
          onClick && "cursor-pointer hover:border-slate-300/60",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            {Icon && (
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", styles.iconBg)}>
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div className="min-w-0">
              <p className={cn("text-xs font-medium", styles.title)}>{title}</p>
              <p className={cn("text-2xl font-bold mt-0.5", styles.value)}>{displayValue}</p>
            </div>
          </div>

          {safeTrendData && (
            <span className={cn("text-sm font-semibold", safeTrendData.isPositive ? "text-emerald-600" : "text-rose-600")}>
              {safeTrendData.isPositive ? "↑" : "↓"} {safeTrendData.value}
            </span>
          )}
        </div>

        {subtitle && (
          <p className={cn("text-xs mt-2", styles.subtitle)}>{subtitle}</p>
        )}
      </div>
    )
  }

  /* ---------- MINIMAL VARIANT ---------- */
  if (variant === "minimal") {
    return (
      <div
        onClick={onClick}
        className={cn(
          "group relative overflow-hidden rounded-lg px-4 py-4 transition-all duration-300",
          "border border-slate-200/80 bg-slate-50/50",
          "hover:bg-white hover:border-slate-300/80",
          onClick && "cursor-pointer",
          className
        )}
      >
        <p className={cn("text-xs font-medium", styles.title)}>{title}</p>
        <p className={cn("text-3xl font-bold mt-1", styles.value)}>{displayValue}</p>
        {subtitle && <p className={cn("text-xs mt-2", styles.subtitle)}>{subtitle}</p>}
        
        {safeTrendData && (
          <p className={cn("text-xs font-semibold mt-2", safeTrendData.isPositive ? "text-emerald-600" : "text-rose-600")}>
            {safeTrendData.isPositive ? "↑" : "↓"} {safeTrendData.value}
          </p>
        )}
      </div>
    )
  }

  return null
}
