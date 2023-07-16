import React, {useState, useEffect} from 'react';
import * as Popover from '@radix-ui/react-popover';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
//import './Popover.css';
//components
import SelectProject from "./SelectProject/SelectProject";
import AddToProjectButton from "./AddToProjectButton/AddToProjectButton";



const PopoverDemo = () => {
  const [project, setProject] = useState();
  const projectSelector = {project, setProject};

  useEffect(() => {
    console.log("project selected: ",project);
  }, [project])



  
  return (
    <div className="add-to-project-popover">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="IconButton" aria-label="Update dimensions">
            +
          </button>
        </Popover.Trigger>
        {/* <Popover.Portal> */}
          <Popover.Content className="PopoverContent" sideOffset={5}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p className="Text" style={{ marginBottom: 10 }}>
                Add to a project
              </p>

              <SelectProject projectSelector={projectSelector}/> 
              <AddToProjectButton projectSelector={projectSelector}/>
              
            </div>
            <Popover.Close className="PopoverClose" aria-label="Close">
              <Cross2Icon />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        {/* </Popover.Portal> */}
      </Popover.Root>
    </div>
)};

export default PopoverDemo;