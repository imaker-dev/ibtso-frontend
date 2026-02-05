import { Gauge, Package, Users, Tag, Building2 } from "lucide-react";
import { PERMISSIONS } from "../../constants/roles";

export const navConfig = [
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
    title: "Client Management",
    items: [
      {
        name: "Clients",
        icon: Building2,
        permissions: [PERMISSIONS.VIEW_ALL_CLIENTS],
        children: [
          { name: "All Clients", path: "/clients" },
          { name: "Add Client", path: "/clients/add" },
        ],
      },
    ],
  },
  {
    title: "Dealer Management",
    items: [
      {
        name: "Dealers",
        icon: Users,
        permissions: [PERMISSIONS.VIEW_ALL_DEALERS],
        children: [
          { name: "All Dealers", path: "/dealers" },
          { name: "Add Dealer", path: "/dealers/add" },
        ],
      },
    ],
  },
  {
    title: "Asset Management",
    items: [
      {
        name: "Assets",
        icon: Package,
        permissions: [PERMISSIONS.VIEW_ALL_ASSETS],
        children: [
          {
            name: "All Assets",
            path: "/asset-management",
          },
          {
            name: "Add Asset",
            path: "/asset-management/add",
          },
        ],
      },
    ],
  },

  {
    title: "Brands Management",
    items: [{ 
      name: "Brands", 
      icon: Tag, 
      path: "/brands",
      permissions: [PERMISSIONS.VIEW_BRANDS],
    }],
  },
];
