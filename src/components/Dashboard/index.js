import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import Tabs from '../../common/Tabs';
import Campaigns from '../Campaigns';
import LanguageSelector from '../../common/LanguageSelector';
import { checkDateStatus, isMobileDevice } from '../../common/utilities';
import { LIVE, PAST, UPCOMING } from '../../constants';

import './styles/index.scss';
const Dashboard = props => {
  const { t } = useTranslation();
  const { campaigns = [], scheduleCampaign } = props;
  const liveCampaigns = campaigns.filter(campaign => checkDateStatus(campaign.createdOn) === LIVE);
  const pastCampaigns = campaigns.filter(campaign => checkDateStatus(campaign.createdOn) === PAST);
  const upcomingCampaigns = campaigns.filter(campaign => checkDateStatus(campaign.createdOn) === UPCOMING);
  // to check if mobile device.
  const isMobile = isMobileDevice();
  return (
    <>
      <div className="header-section"></div>
      <LanguageSelector />
      <div className="dashboard">
        <h1 className={classnames('header', isMobile && 'ml-24')}>{t('campaignTitle')}</h1>
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
    </>
  );
};
export default Dashboard;
