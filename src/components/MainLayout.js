import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./mainLayout.css";
import SideBar from "./SideBar";
import ShowBar from "./ShowBar";
import TableComp from "./TableComp";

const MainLayout = ({ source, destination }) => {
  const [sideBar, setSideBar] = useState([]);
  const [show, setShow] = useState([]);
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [error, setError] = useState();

  const handleFileChange = (e) => {
    setError("");

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];

      if (!fileExtension.includes("csv")) {
        setError("Please input a csv file");
        return;
      }

      setFile(inputFile);
    }
  };

  const handleDrag = async () => {
    if (!destination) return;
    if (source.droppableId == destination.droppableId){
        if(source.droppableId=="showItems"){
            const temp=[...show];
        if(source.index==destination.index)
        return ;
        else if(source.index>destination.index){
            const ele=temp.splice(source.index,1)[0];
            temp.splice(destination.index,0,ele);
        }
        else{
            const ele=temp.splice(source.index,1)[0];
            temp.splice(destination.index+1,0,ele);
        }
        setShow(temp);
    }
    }
    else {
      if (source.droppableId == "sideBar" && destination.droppableId=="showItems") {
        const temp = [...sideBar];
        const element = temp.splice(source.index, 1)[0];
        const temp2 = [...show];
        temp2.splice(destination.index, 0, element);
        setSideBar(temp);
        setShow(temp2);
      }
      if (source.droppableId == "showItems" && destination.droppableId=="sideBar") {
        const temp = [...show];
        const element = temp.splice(source.index, 1)[0];
        const temp2 = [...sideBar];
        temp2.splice(destination.index, 0, element);
        setSideBar(temp2);
        setShow(temp);
      }
    }
  };

  useEffect(() => {
    handleDrag();
  }, [source, destination]);

  useEffect(() => {
    handleParse();
  }, [file]);

  const handleParse = () => {
    if (!file) return setError("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      setData(parsedData);
      const columns = Object.keys(parsedData[0]);
      setSideBar(columns);
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <SideBar sideBar={sideBar} handleFileChange={handleFileChange}/>

      <div className="right-box">
        <ShowBar show={show}/>
        {show.length>0 && <TableComp show={show} data={data} />}
      </div>
    </div>
  );
};

export default MainLayout;
