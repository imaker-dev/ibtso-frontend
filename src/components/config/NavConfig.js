import { Gauge, Package, Users, Tag, Building2 } from "lucide-react";

export const navConfig = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Overview",
        icon: Gauge,
        path: "/",
      },
    ],
  },
  {
    title: "Client Management",
    items: [
      {
        name: "Clients",
        icon: Building2,
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
    items: [{ name: "Brands", icon: Tag, path: "/brands" }],
  },
];
