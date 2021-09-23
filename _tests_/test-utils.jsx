import React from 'react'
import {render} from '@testing-library/react'
import { ProvideAuth } from '../client/src/components/user-auth.js'


const customRender = (ui, options) =>
  render(ui, {wrapper: ProvideAuth, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}