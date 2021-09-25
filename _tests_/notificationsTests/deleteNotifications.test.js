import { shallow, configure } from 'enzyme';
import axios from 'axios';
import deleteNotifications from '../../client/src/components/notifications/notificationHelpers/deleteNotifications.js';

describe('getNotifications', () => {
  test('returns data', () => {
    expect(deleteNotifications(2)).toBeTruthy;
  });
});