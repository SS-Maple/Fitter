import React, { useState as originalState, useEffect as originalEffect } from 'react';

export const useState = state => originalState(state);
export const useEffect = () => originalEffect();