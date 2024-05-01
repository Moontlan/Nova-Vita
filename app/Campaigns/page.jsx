'use client';
import React from "react";
import TableC from "../components/TableC";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TabC from "../components/TabC";
/* import { useSelector } from "react-redux"; */

function CampaignsTable() {
  const [campaigns, setCampaigns] = useState([]);
  const pathname = usePathname();
  /* const inst = useSelector((state) => state.institucion); */
  /* confirm(inst); */

  useEffect(() => {
    confirm(localStorage.getItem("Institution"));
    if (typeof window !== "undefined") {
      fetch(`http://localhost:3000/api/campaigns/active/${localStorage.getItem("Institution")}`)
        .then((response) => response.json())
        .then((data) => {
          setCampaigns(data);
        });
    }
  }, []);

  const mockCampaigns = [
    {
      idCampaign: "1",
      campaignName: "Campaign 1",
      description: "This is campaign 1",
      beneficiaryType: "Type 1",
      status: "active",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      images: [
        "https://www.detroitnews.com/gcdn/presto/2020/07/08/PDTN/bb23f931-f437-4ae9-bbab-ef1a06c38f69-2020-0708-mo-COVID478.JPG?crop=1968,2624,x984,y0",
        "https://www.detroitnews.com/gcdn/presto/2020/07/08/PDTN/bb23f931-f437-4ae9-bbab-ef1a06c38f69-2020-0708-mo-COVID478.JPG?crop=1968,2624,x984,y0",
        "https://www.detroitnews.com/gcdn/presto/2020/07/08/PDTN/bb23f931-f437-4ae9-bbab-ef1a06c38f69-2020-0708-mo-COVID478.JPG?crop=1968,2624,x984,y0",
      ],
    },
    {
      idCampaign: "2",
      campaignName: "Campaign 2",
      description: "This is campaign 2",
      beneficiaryType: "Type 2",
      status: "active",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      images: [
        "https://www.detroitnews.com/gcdn/presto/2020/07/08/PDTN/bb23f931-f437-4ae9-bbab-ef1a06c38f69-2020-0708-mo-COVID478.JPG?crop=1968,2624,x984,y0",
        "https://www.detroitnews.com/gcdn/presto/2020/07/08/PDTN/bb23f931-f437-4ae9-bbab-ef1a06c38f69-2020-0708-mo-COVID478.JPG?crop=1968,2624,x984,y0",
        "https://www.detroitnews.com/gcdn/presto/2020/07/08/PDTN/bb23f931-f437-4ae9-bbab-ef1a06c38f69-2020-0708-mo-COVID478.JPG?crop=1968,2624,x984,y0",
      ],
    },
    // Add more campaign objects as needed
  ];

  return (
    <div>
      
      <TabC/>
      {/* CampaignTables */}
      <TableC dataC={mockCampaigns} tipo="activo"/>
    </div>
  );
}

export default CampaignsTable;
