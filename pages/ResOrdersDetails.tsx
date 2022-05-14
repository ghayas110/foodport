import React from 'react'
import Head from 'next/head'
import ResturentSidebar from './ResturentSidebar'
import DCss from '../styles/dashboard.module.css'
export default function ResOrdersDetails() {
  return (
    <>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
        </Head>

        <main>
            <ResturentSidebar/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className={`${DCss.Order_panel}`}>
                            <div className={`${DCss.Order_panel_heading}`}>
                                <div className="row">
                                    <div className="col col-sm-5 col-xs-12">
                                        <h4 className={`${DCss.panel_title}`}>Order Details</h4>
                                    </div>
                                </div>
                            </div>
                            <div className={`${DCss.order_panel_body}`}>
                                <table className={`${DCss.order_table}`}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Users</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Payment Status</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                {/* <!-- <div className="user_icon">
                                                    <img src="images/img1.jpg" alt="">
                                                </div> --> */}
                                                Michael Holz
                                            </td>
                                            <td>Jun 15,2020</td>
                                            <td>$555</td>
                                            <td>Paid</td>
                                            <td><span className={`${DCss.status}`}>Completed</span></td>
                                            <td>
                                                <ul className={`${DCss.action_list}`}>
                                                    <li><a href="#" className="btn"><em className="fa fa-trash"></em></a></li>
                                                    <li><a href="#" className="btn"><em className="fa fa-edit"></em></a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                {/* <!-- <div className="user_icon">
                                                    <img src="images/img1.jpg" alt="">
                                                </div> --> */}
                                                Michael Holz
                                            </td>
                                            <td>Jun 15,2020</td>
                                            <td>$555</td>
                                            <td>Paid</td>
                                            <td><span className={`${DCss.status}`}>Completed</span></td>
                                            <td>
                                                <ul className={`${DCss.action_list}`}>
                                                    <li><a href="#" className="btn"><em className="fa fa-trash"></em></a></li>
                                                    <li><a href="#" className="btn"><em className="fa fa-edit"></em></a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>
                                                {/* <!-- <div className="user_icon">
                                                    <img src="images/img1.jpg" alt="">
                                                </div> --> */}
                                                Michael Holz
                                            </td>
                                            <td>Jun 15,2020</td>
                                            <td>$555</td>
                                            <td>Paid</td>
                                            <td><span className={`${DCss.status}`}>Completed</span></td>
                                            <td>
                                                <ul className={`${DCss.action_list}`}>
                                                    <li><a href="#" className="btn"><em className="fa fa-trash"></em></a></li>
                                                    <li><a href="#" className="btn"><em className="fa fa-edit"></em></a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={`${DCss.panel_footer}`}>
                                <div className="row">
                                    <div className="col col-xs-6"> Showing <b>5</b> out of <b>25</b> entries</div>
                                    <div className="col-xs-6">
                                        <ul className={`${DCss.pagination}`}>
                                            <li><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                                            <li><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li className={`${DCss.active}`}><a href="#">3</a></li>
                                            <li><a href="#">4</a></li>
                                            <li><a href="#">5</a></li>
                                            <li><a href="#"><i className="fa fa-angle-double-right"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}
