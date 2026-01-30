import {
  Gauge,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  Tag,
  Settings,
  ImageIcon,
  Menu,
  MessagesSquare,
  Star,
  Users2,
  Zap,
  CalendarClock,
  Repeat,
  Percent,
  Plus,
} from "lucide-react";

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
            path: "/assets",
          },
          {
            name: "Add Asset",
            path: "/assets/add",
          },
        ],
      },
    ],
  },
];
