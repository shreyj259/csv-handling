import React from 'react'
import { Draggable,Droppable } from 'react-beautiful-dnd'

const ShowBar = ({show}) => {
  return (
    <div className="showbar">
          <div className="show">Show</div>
          <Droppable droppableId="showItems">
            {(provided) => (
              <div
                className="show-items"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {show &&
                  show.map((item, index) => (
                    <Draggable draggableId={`item-${index}`} index={index}>
                      {(provided) => (
                        <div
                          className="show-item"
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
        </div>
  )
}

export default ShowBar