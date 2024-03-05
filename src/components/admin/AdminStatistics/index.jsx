import React from "react";
import "./index.css"
import { LikeOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import { Divider, Table } from 'antd';
const columns = [
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Số lượng',
        dataIndex: 'amount',
    },
    
];
const data = [
    {
        key: '1',
        address: 'Kiên Giang',
        amount: '3',
    },
    {
        key: '2',
        address: 'Hồ Chí Minh',
        amount: '6',
    },
    {
        key: '3',
        address: 'Cà Mau',
        amount: '2',
    },
    {
        key: '4',
        address: 'Hà Nội',
        amount: '10',
    },

    
    
];
const index = () => {
    return (
        <div>
            <h2 className='mb-3'>Trang Thống kê </h2>
            <div className="statistics">
                <Row gutter={[16, 16]}>
                    <Col span={18}>
                        <div className="project">
                            <Row gutter={[16, 16]}  className="text-center">
                                <Col span={12} className="box1">
                                    <h4>Tài khoản</h4>
                                    <div className="account">
                                        <div className="account-total">
                                            <p>Total</p>
                                            <p>2</p>
                                        </div>
                                        <div className="account-total-infor">
                                            <p>Lecture</p>
                                            <p>3</p>
                                            <p>Business</p>
                                            <p>6</p>
                                            <p>Student</p>
                                            <p>8</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12} className="box2">
                                    <h4>Dự án</h4>
                                    <div className="project">
                                        <div className="project-total">
                                            <p>Total</p>
                                            <p>9</p>
                                        </div>
                                        <div className="project-total-infor">
                                            <p>Nông nghiệp</p>
                                            <p>10</p>
                                            <p>Thủ công nghiệp</p>
                                            <p>3</p>
                                        </div>
                                    </div>
                                </Col>

                                <Col span={24}>
                                    <div className="status">
                                        <h4>Các đánh giá</h4>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Statistic title="Feedback" value={1022} prefix={<LikeOutlined />} />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic title="Unmerged" value={87} suffix="/ 100" />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                    </Col>

                    <Col span={6}>
                        <div className="location">
                            <h4>Thống kê doanh nghiệp theo địa chỉ </h4>
                            <Table columns={columns} dataSource={data} size="small" />

                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    )
}

export default index;