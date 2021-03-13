import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import { Modal } from '@material-ui/core';
import { MdInsertDriveFile, MdGraphicEq } from 'react-icons/md';
import { GoCalendar } from 'react-icons/go';

import { Table, TableRow, TableCell } from '../../common/Table';

import './index.scss';

export const CampaignRow = props => {
  const { t } = useTranslation();

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
      <div className="flex mb-32">
        <img width={80} height={80} src={image_url} alt={name} />
        <div className="ml-32">
          {name}
          <br />
          <span className="text-small text-gray">{region}</span>
        </div>
      </div>
      <h4>{t('pricing')}</h4>
      {!!price &&
        !!price.length &&
        price.map((elem, index) => (
          <dl className="pricing flex mb-64" key={`elem-${index}`}>
            <dt className="flex--1">{priceLabels[index]}</dt>
            <dd>{elem[priceValueLabels[index]]}</dd>
          </dl>
        ))}
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
          <div className="flex">
            <img width={40} height={40} src={image_url} alt={name} />
            <div className="ml-8">
              {name}
              <br />
              <span className="text-small text-gray">{region}</span>
            </div>
          </div>
        </TableCell>
        <TableCell width="20%">
          <button className="btn-link" onClick={handlePricingModalOpen}>
            {t('viewPricing')}
          </button>
          <Modal open={pricingModalOpen} onClose={handlePricingModalClose}>
            {body}
          </Modal>
        </TableCell>
        <TableCell width="60%">
          <div className="flex">
            <MdInsertDriveFile size={20} className="pointer mr-8" color="#16a769" />
            <label className="mr-24 small">CSV</label>
            <MdGraphicEq size={20} className="pointer mr-8" color="#16a769" />
            <label className="mr-24 small">{t('report')}</label>
            <GoCalendar size={20} className="pointer mr-2" color="#16a769" onClick={handleDatePickerOpen} />
            <label className="mr-24 small">{t('scheduleAgain')}</label>
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
        customRow={CampaignRow}
        tableHeaderSize="small"
      />
    </>
  );
};
export default Campaigns;
