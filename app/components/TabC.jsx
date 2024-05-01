import React from 'react'
import { usePathname } from "next/navigation";

function TabC() {
  const pathname = usePathname();
  return (
    <div className="pt-6 pl-6 pr-6 sm:flex items-center justify-between">
        <div className="flex items-center">
          <a
            className={`rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ${
              pathname === "/Campaigns" ? "bg-indigo-100" : ""
            }`}
            href="/Campaigns"
          >
            <div className="py-2 px-8 text-indigo-700 rounded-full">
              <p>Activas</p>
            </div>
          </a>
          <a
            className={`rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 ${
              pathname === "/ExpiredCampaigns" ? "bg-indigo-100" : ""
            }`}
            href="/ExpiredCampaigns"
          >
            <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full">
              <p>Cerradas</p>
            </div>
          </a>
        </div>
        <a
          href="/CampaignForm"
          className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
        >
          <p className="text-sm font-medium leading-none text-white">Añadir Campaña</p>
        </a>
      </div>
  )
}

export default TabC