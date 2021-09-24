import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({adapter: new Adapter()});
import MockAdapter from 'axios-mock-adapter'

import AddCalorieModal from './addCalorieModal';
import AddWaterModal from './addWaterModal';
import LineChart from './charts';
import EditGoals from './editGoals';
import MyGoals from './myGoals';
import MyProfile from './myProfile';
import PreviousStats from './previousStats';
import TodaysGoals from './todaysGoal';
import UpdateWeightModal from './updateWeightModal';
import axios from 'axios';



let data = {
  userid: 1
}

it ('Renders MyProfile', () => {
  const myProfile = shallow(<MyProfile  />)
  expect(myProfile.exists()).toBe(true);
})

it ('Renders MyGoals', () => {
  const myGoals = shallow(<MyGoals goals={[]}  />)
  expect(myGoals.exists()).toBe(true);
})

it ('Renders TodaysGoals', () => {
  const todaysGoals = shallow(<TodaysGoals userid={1} goals={[]}  />)
  expect(todaysGoals.exists()).toBe(true);
})

it ('Renders PreviousStats', () => {
  const previousStats = shallow(<PreviousStats stats={[{}]} goals={[]} handleShare={() => {}} />)
  expect(previousStats.exists()).toBe(true);
})

it ('Renders EditGoalsModal', () => {
  const editGoalsModal = shallow(<EditGoals show={true} userid={1} handleSubmit={() => {}} close={() => {}} />)
  expect(editGoalsModal.exists()).toBe(true);
})

it('Renders Charts', () => {
  const lineChart = shallow(<LineChart />)
  expect(lineChart.exists()).toBe(true);

})

describe('Renders Modals for TodaysGoals', () => {
  const addcalorie = shallow(<AddCalorieModal show={true} userid={1} close={() => {}} handleSubmit={() => {}} />)
  const addwater = shallow(<AddWaterModal show={true} userid={1} close={() => {}} handleSubmit={() => {}} />)
  const updateWeight = shallow(<UpdateWeightModal show={true} userid={1} close={() => {}} handleSubmit={() => {}} />)


  it('addCalorieModal renders', () => {
    expect(addcalorie.exists()).toBe(true);
  })

  it('addWaterModal renders', () => {
    expect(addwater.exists()).toBe(true);
  })

  it('updateWeightModal renders', () => {
    expect(updateWeight.exists()).toBe(true);
  })
})

describe('Testing axios calls', () => {
  const myProfile = shallow(<MyProfile />)
  myProfile.find('.edit-goal-btn').simulate('click');
  expect(myProfile.find('.edit-goal-btn'))
})