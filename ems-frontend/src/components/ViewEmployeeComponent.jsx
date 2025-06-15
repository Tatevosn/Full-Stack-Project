import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';


class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id, // Use params from props
            employee: {}
        };
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        });
    }

    render() {
        const { employee } = this.state;
        return (
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h3 className="text-center mb-0">Employee Details</h3>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <tbody>
                                <tr>
                                    <th className="bg-light" style={{width: '30%'}}>First Name</th>
                                    <td>{employee.firstName}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light">Last Name</th>
                                    <td>{employee.lastName}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light">Email</th>
                                    <td>{employee.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center mt-3">
                            <button 
                                className="btn btn-primary"
                                onClick={() => this.props.navigate('/employees')}
                            >
                                <i className="fas fa-arrow-left me-2"></i>
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (ViewEmployeeComponent);