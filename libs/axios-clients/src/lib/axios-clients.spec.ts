import { axiosClients } from './axios-clients';

describe('axiosClients', () => {
  it('should work', () => {
    expect(axiosClients()).toEqual('axios-clients');
  });
});
