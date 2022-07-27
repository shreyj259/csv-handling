import React from 'react'
import './table.css'

const TableComp = ({show,data}) => {
  return (
    <div className='table-container'>
        {
            show.length!=0 && <table>
               <tr> {show.map(item=>(<th>{item}</th>))}</tr>
               {data.map((item)=>(
                <tr>{show.map((key)=>(<td>{item[key]}</td>))}</tr>
               ))}
            </table>
        }
    </div>
  )
}

export default TableComp