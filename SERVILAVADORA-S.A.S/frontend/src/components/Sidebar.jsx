import { HomeIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const menu = [
  { name: "Inicio", icon: <HomeIcon className="h-5 w-5" />, path: "/" },
  { name: "Servicios", icon: <Cog6ToothIcon className="h-5 w-5" />, path: "/servicios" },
  { name: "Perfil", icon: <UserIcon className="h-5 w-5" />, path: "/perfil" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:block">
      <div className="p-4 font-bold text-lg">Panel</div>
      <ul className="space-y-2 px-4">
        {menu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
