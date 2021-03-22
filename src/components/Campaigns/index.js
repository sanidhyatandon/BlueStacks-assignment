import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import { Modal } from '@material-ui/core';
import { isMobileDevice } from '../../common/utilities';

import { Table, TableRow, TableCell } from '../../common/Table';

import './index.scss';

export const CampaignRow = props => {
  const { t } = useTranslation();
  const isMobile = isMobileDevice();
  console.log(isMobile);

  // Destructure Incoming props.
  const {
    rowData: { campaignId, createdOn, image_url, name, price, region } = {},
    rowProps: { scheduleCampaign }
  } = props;
  const formattedDate = moment(Number(createdOn)).format('MMM YYYY, DD');

  const relativeDate = moment(Number(createdOn)).fromNow();

  const [pricingModalOpen, setPricingModalOpen] = React.useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const scheduleCampaignHandler = value => {
    const newDate = moment(value).format();
    const timeStamp = moment(newDate).format('x');

    scheduleCampaign(campaignId, timeStamp);
  };

  const handlePricingModalOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingModalClose = () => {
    setPricingModalOpen(false);
  };

  const handleDatePickerOpen = () => {
    setDatePickerOpen(true);
  };

  const handleDatePickerClose = () => {
    setDatePickerOpen(false);
  };

  const priceLabels = ['1 week - 1 Month', '6 Months', '1 Year'];
  const priceValueLabels = ['monthly', 'halfYearly', 'annually'];

  const body = (
    <div className="modal-body">
      <div className={!isMobile ? 'flex align-end' : 'align-center mb-16'}>
        <img src={image_url} alt={name} className="ml-24 mt-24" />
        <div className="ml-16">
          <h2>{name}</h2>
          <h3 className="text-gray mb-0">{region}</h3>
        </div>
      </div>
      <div className="ml-16 mr-24">
        <h2>{t('pricing')}</h2>
        {!!price &&
          !!price.length &&
          price.map((elem, index) => (
            <dl className="pricing flex mb-64" key={`elem-${index}`}>
              <dt className="flex--1">{priceLabels[index]}</dt>
              <dd>{elem[priceValueLabels[index]]}</dd>
            </dl>
          ))}
      </div>
      <button type="button" onClick={handlePricingModalClose}>
        {t('closeModal')}
      </button>
    </div>
  );

  const datePicker = (
    <DatePicker
      isOpen={datePickerOpen}
      onChange={scheduleCampaignHandler}
      value={new Date()}
      onCalendarClose={handleDatePickerClose}
    />
  );

  return (
    <>
      <TableRow>
        <TableCell width="20%">
          <>
            {formattedDate}
            <br />
            <span className="text-small text-gray">{relativeDate}</span>
          </>
        </TableCell>
        <TableCell width="20%">
          <div className={!isMobile && 'flex'}>
            <img width={40} height={40} src={image_url} alt={name} />
            <div className={!isMobile && 'ml-8'}>
              {name}
              <br />
              <span className="text-small text-gray">{region}</span>
            </div>
          </div>
        </TableCell>
        <TableCell width="20%">
          <div className={classnames(isMobile ? 'align-center' : 'flex flex-center')}>
            <img src="price.png" width={20} height={20} alt="price" className={classnames(!isMobile && 'mr-8')} />
            <button className="btn-link" onClick={handlePricingModalOpen}>
              {t('viewPricing')}
            </button>
          </div>
          <Modal open={pricingModalOpen} onClose={handlePricingModalClose}>
            {body}
          </Modal>
        </TableCell>
        <TableCell width="60%">
          <div className={!isMobile && 'flex'}>
            <div className={classnames(isMobile ? 'mb-8' : 'flex flex-center')}>
              <img src="file.png" width={20} height={20} alt="report" className="pointer mr-8" />
              <label className="mr-24 small">CSV</label>
            </div>
            <div className={classnames(isMobile ? 'mb-8' : 'flex flex-center')}>
              <img src="statistics-report.png" width={20} height={20} alt="file" className="pointer mr-8" />
              <label className="mr-24 small">{t('report')}</label>
            </div>
            <div className={classnames(isMobile ? 'mb-8' : 'flex flex-center')}>
              <img
                src="calendar.png"
                width={20}
                height={20}
                alt="file"
                className="pointer mr-8"
                onClick={handleDatePickerOpen}
              />
              <label className="mr-24 small">{t('scheduleAgain')}</label>
            </div>
            <Modal open={datePickerOpen} onClose={handleDatePickerClose}>
              {datePicker}
            </Modal>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

const Campaigns = props => {
  const { t } = useTranslation();
  // returns the UI for Campaigns Table.

  const getHeader = () => [`${t('date')}`, `${t('campaign')}`, `${t('view')}`, `${t('actions')}`];

  const { campaigns = [], scheduleCampaign } = props;

  return (
    <>
      <Table
        rowsData={campaigns}
        rowProps={{ scheduleCampaign }}
        header={getHeader()}
        tableHeaderCellClassName="header"
        customRow={CampaignRow}
        tableHeaderSize="small"
      />
    </>
  );
};
export default Campaigns;
