/**
 * @jest-environment jsdom
 */

 import React, {useState} from 'react';
 import { cleanup, fireEvent, render, screen } from '@testing-library/react';
 import { act } from 'react-dom/test-utils';
 import ChatMain from '../client/src/components/Chat/ChatMain.jsx';
 import DirectChatPage from '../client/src/components/Chat/DirectChatPage.jsx';

 let container;

 beforeEach(() => {
   container = document.createElement('div');
   document.body.appendChild(container);
 });

 afterEach(() => {
   document.body.removeChild(container);
   container = null;
 });

 xdescribe('ChatMain component', () => {
   it('should render an element with the id chat-main', () => {
     act(() => {
       render(<ChatMain />, container);
     });
     expect(document.getElementsById('chat-main')).toBeTruthy();
   });
 });

 xdescribe('DirectChatPage component', () => {
  it('should render an element with the id direct-chat-page', () => {
    act(() => {
      render(<DirectChatPage />, container);
    });
    expect(document.getElementsById('direct-chat-page')).toBeTruthy();
  });
});