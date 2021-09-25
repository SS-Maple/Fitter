import { shallow, configure } from 'enzyme';
import axios from 'axios';
import getNotifications from '../../client/src/components/notifications/notificationHelpers/getNotifications.js';

describe('getNotifications', () => {
  test('returns data', () => {
    expect(getNotifications(2)).toBeTruthy;
  });
});