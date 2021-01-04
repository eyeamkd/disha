import React, { useState,useEffect, PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, LabelList
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PotentialCoveragePie = (props) => { 
    const [data, setData] = useState([]); 

    useEffect(() => {
        modifier(props.potential,props.users);
    }, [props])

    const modifier = (total,registered) =>{  
        console.log("Props passed ", props);
        let dataArray = [ 
            {
                name:'Yet to Register',
                value: total-registered
            }, 
            {
                name:'Registered',
                value: registered
            }
        ]
        setData([...dataArray]);
    }

  
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value" 
          nameKey="name"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          } 
          <LabelList dataKey="name"/>
        </Pie>
      </PieChart>
    );
  }


export default PotentialCoveragePie;