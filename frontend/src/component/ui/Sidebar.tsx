import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  FileText,
  Bell,
  Search,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: User, label: "Profile", href: "#" },
    { icon: FileText, label: "Documents", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: Search, label: "Search", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } transition-all duration-300`}
          >
            <h1 className="text-xl font-bold text-gray-800">MyApp</h1>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
                  >
                    <IconComponent className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                    <span
                      className={`ml-3 ${
                        isOpen ? "block" : "hidden"
                      } transition-all duration-300`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div
              className={`ml-3 ${
                isOpen ? "block" : "hidden"
              } transition-all duration-300`}
            >
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
    </div>
  );
}
