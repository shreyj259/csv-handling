import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import MainLayout from "./components/MainLayout";


function App() {
  const [source,setSource]=useState();
  const [destination,setDestination]=useState();

  const dragHandler=(result)=>{
    const {source,destination}=result;
    setSource(source);
    setDestination(destination);
  }
  return (
    <DragDropContext onDragEnd={dragHandler}>
      <MainLayout source={source} destination={destination}/>
    </DragDropContext>
  );
}

export default App;
