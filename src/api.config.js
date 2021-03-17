const MOCK_SERVICE = 'https://my-json-server.typicode.com/sanidhyatandon/blustacks-server';

const defaultValues = {
  retry: 0,
  interval: 0,
  timeout: 2000
};

const localConfig = {
  // Current User
  getCampaigns: {
    ...defaultValues,
    url: `${MOCK_SERVICE}/campaignList`
  }
};

const config = localConfig;
export default config;
