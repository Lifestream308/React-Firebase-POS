import React from 'react'

export default function UserInfo({individualUser}) {
  return (
    <div>
    <h3>Name: {individualUser.name}</h3>
    <h3>Age: {individualUser.age}</h3>
  </div>  )
}
