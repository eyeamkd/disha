import React, { Component } from 'react'
import AdminSignIn from './AdminSignIn'
import AdminDashboard from './AdminDashboard'

export class Admin extends Component {
    render() {
        return (
            <div>
                <AdminDashboard/>
            </div>
        )
    }
}

export default Admin
