import React, { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getData } from '../selectors/SignUpSelector';
import { Table } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { userGetData } from '../actions/userSignUp';
import { useNavigate } from 'react-router-dom';
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";

function DisplayData(){
  const [state, setState] = useState();
  const dispatch = useDispatch();
 
  const getDataSelector = useSelector(getData);
  console.log("getDataSelector:"+ getDataSelector);    
  const navigate = useNavigate();

  const onClickHandle = () => {
  localStorage.removeItem("token");
  window.location.replace("/");
};


useEffect(() => {
  dispatch(userGetData());
},[]);


  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'fname',
  },
  {
    title: 'Capital',
    dataIndex: 'capital',
    key: 'capital',
  },
  // Table.EXPAND_COLUMN,
  {
    
    title: 'currencies',
    dataIndex: 'currencies.name',
    // key: ['currencies','name'],
    key:'currencies',
    render: object => { console.log(object) }
    
  },
];

return (
  <div>
    <div className='TitleWrapper'>   
      <h1> User Data</h1>
      <LogoutOutlined onClick={onClickHandle} style={{ fontSize: '20px', color: '#08c' , align: 'right'}}/>
    </div>
 
      <div className='TableWrapper'>
      
        <Table dataSource={getDataSelector} columns={columns} rowKey={record => record.key}
           expandable={{
            expandedRowRender: record => (
              <p style={{ margin: 0 }}>{record.name} <br></br>{record.capital}</p>
            ),
            expandIcon: ({ expanded, onExpand, record, }) =>
              expanded ? (
                <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
              ) : (
                <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
              )
          }}
        />
      </div>
  </div>  
  )
}

export default DisplayData;
	