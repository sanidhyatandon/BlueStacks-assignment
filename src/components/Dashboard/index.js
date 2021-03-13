import React from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from '../../common/Tabs';
import Campaigns from '../Campaigns';
import { checkDateStatus } from '../../common/utilities';
import { LIVE, PAST, UPCOMING } from '../../constants';

import './styles/index.scss';
const Dashboard = props => {
  const { t } = useTranslation();
  const { campaigns = [], scheduleCampaign } = props;
  const liveCampaigns = campaigns.filter(campaign => checkDateStatus(campaign.createdOn) === LIVE);
  const pastCampaigns = campaigns.filter(campaign => checkDateStatus(campaign.createdOn) === PAST);
  const upcomingCampaigns = campaigns.filter(campaign => checkDateStatus(campaign.createdOn) === UPCOMING);
  return (
    <div className="dashboard">
      <h3>{t('campaignTitle')}</h3>
      <Tabs>
        <div label="Upcoming Campaigns" tabTitle={t('upcomingCampaigns')}>
          <Campaigns campaigns={upcomingCampaigns} scheduleCampaign={scheduleCampaign} />
        </div>
        <div label="Live Campaigns" tabTitle={t('liveCampaigns')}>
          <Campaigns campaigns={liveCampaigns} scheduleCampaign={scheduleCampaign} />
        </div>
        <div label="Past Campaigns" tabTitle={t('pastCampaigns')}>
          <Campaigns campaigns={pastCampaigns} scheduleCampaign={scheduleCampaign} />
        </div>
      </Tabs>
    </div>
  );
};
export default Dashboard;
