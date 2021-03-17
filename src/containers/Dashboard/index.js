import React, { useState, useEffect } from 'react';
import axios from 'axios';

import apiConfig from '../../api.config';
import DashboardView from '../../components/Dashboard';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);

  const scheduleCampaign = (id, value) => {
    const {
      getCampaigns: { url: getCampaignsURL }
    } = apiConfig;
    let targetCampaignIndex = campaigns.findIndex(campaign => campaign.campaignId === id);
    campaigns[targetCampaignIndex].createdOn = value;
    const requestPayload = [...campaigns];
    // axios.put(getCampaignsURL, requestPayload, { 'Content-Type': 'application/json; charset=utf-8' });
    fetch(`${getCampaignsURL}/1`, {
      method: 'POST',
      body: JSON.stringify(requestPayload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    setCampaigns(requestPayload);
  };

  useEffect(() => {
    const {
      getCampaigns: { url: getCampaignsURL }
    } = apiConfig;
    axios
      .get(getCampaignsURL)
      .then(({ data }) => {
        setCampaigns(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <div className="campaign-list">
        {campaigns && campaigns.length ? (
          <DashboardView campaigns={campaigns} scheduleCampaign={scheduleCampaign} />
        ) : (
          <div> No Data Available</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
