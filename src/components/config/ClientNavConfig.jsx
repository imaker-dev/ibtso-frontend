import { Gauge, Package, User, Lock } from "lucide-react";
import { PERMISSIONS } from "../../constants/roles";

export const clientNavConfig = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Overview",
        icon: Gauge,
        path: "/",
        permissions: [PERMISSIONS.VIEW_DASHBOARD],
      },
    ],
  },
  {
    title: "My Account",
    items: [
      {
        name: "Profile",
        icon: User,
        path: "/profile",
        permissions: [PERMISSIONS.VIEW_OWN_CLIENT_DATA],
      },
      {
        name: "Change Password",
        icon: Lock,
        path: "/change-password",
        permissions: [], // No permissions required - all clients can access
      },
    ],
  },
  {
    title: "Assets",
    items: [
      {
        name: "My Assets",
        icon: Package,
        path: "/my-assets",
        permissions: [PERMISSIONS.VIEW_OWN_ASSETS],
      },
    ],
  },
];
