import React from 'react';
import axios from 'axios';
import { waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import Rankings from '../../client/src/components/HomeFeed/Rankings';
import sortFriends from '../../client/src/components/HomeFeed/Rankings';

jest.mock('axios');

beforeEach(()=>{
  jest.clearAllMocks()
})

test('show name', async () => {
  jest.spyOn(sortFriends, 'default').mockResolvedValue({test:'test'})
  const wrapper = render(<Rankings />);
  await waitFor(() => expect(wrapper.queryAllByText('abc')).toHaveLength(1));
});

xtest('show name error', async () => {
  jest.spyOn(axios, 'default').mockRejectedValue(()=>({}));
  const wrapper = render(<App />);
  await waitFor(() => expect(wrapper.container.innerHTML).toEqual('error'));
});