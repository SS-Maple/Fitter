import { shallow, configure } from 'enzyme';
import axios from 'axios';
import generateNewNotifications from '../../client/src/components/notifications/notificationHelpers/generateNewNotifications.js';

describe('getNotifications', () => {
  test('returns data', () => {
    expect(generateNewNotifications(2)).toBeTruthy;
  });
});