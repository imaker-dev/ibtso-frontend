import React, { useEffect } from 'react'
import PageHeader from '../components/layout/PageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashbordStats } from '../redux/slices/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
const {dashordStats} = useSelector((state) => state.dashboard);
console.log(dashordStats)

  useEffect(() => {
    dispatch(fetchDashbordStats())
  },[])

  return (
    <div>
      <PageHeader title={'Dashboard'} description={''}/>
    </div>
  )
}

export default Dashboard
