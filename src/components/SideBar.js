import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const SideBar = ({sideBar,handleFileChange}) => {
  return (
    <div className="sidebar">
        <Droppable droppableId="sideBar">
          {(provided) => (
            <div
              className="sidebar-column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sideBar.length>0 &&
                sideBar.map((item, index) => (
                  <Draggable key={`side-item-${index}`} draggableId={`side-item-${index}`} index={index}>
                    {(provided) => (
                      <div
                        className="sidebar-item"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {item}
                      </div>
                    )}
                  </Draggable>
                ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="upload-box">
          <label className="button" htmlFor="upload">
            Upload File
          </label>
          <input
            onChange={handleFileChange}
            id="upload"
            name="file"
            type="File"
          />
        </div>
      </div>
  )
}

export default SideBar