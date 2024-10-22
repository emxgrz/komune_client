import React from 'react'
import UserDetails from './UserDetails'
import WorkList from '../components/work/WorkList'
import ReviewList from '../components/review/ReviewList'

export default function ProfilePage() {
  return (
    <div>
      <UserDetails/>
      <WorkList />
      <ReviewList />
    </div>
  )
}
