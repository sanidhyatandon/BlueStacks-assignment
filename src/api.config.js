const MOCK_SERVICE = 'http://localhost:3004';

const defaultValues = {
  retry: 0,
  interval: 0,
  timeout: 2000
};

const localConfig = {
  // Current User
  getCampaigns: {
    ...defaultValues,
    url: `${MOCK_SERVICE}/campaigns`
  }
};

const config = localConfig;
export default config;
