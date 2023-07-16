import React, {useContext} from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import './SelectProject.css';
//util functions
import { v4 as uuidv4 } from "uuid";
//contexts
import { UserProjectsContext } from "../../../../../../../context/userProjectsContext";



const SelectDemo = (props) => {
  const {projectSelector} = props;
  const {userProjectsState} = useContext(UserProjectsContext);
  const userProjects = userProjectsState.userProjects;




  return (<Select.Root
      value={projectSelector.project}
      onValueChange={projectSelector.setProject}
    >
    <Select.Trigger className="SelectTrigger" aria-label="Food">
      {/* <Select.Value placeholder="Select a project" /> */}
      <Select.Value  placeholder="Select a project" aria-label={projectSelector.project}>
                {userProjects[projectSelector.project]}
      </Select.Value>

      <Select.Icon className="SelectIcon">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent">
        <Select.ScrollUpButton className="SelectScrollButton">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Label className="SelectLabel">Projects</Select.Label>

            {userProjects.map((project) => (
                    <Select.Item value={project.title} className="SelectItem" key={uuidv4()}>
                      <Select.ItemIndicator className="SelectItemIndicator">
                        <CheckIcon />
                      </Select.ItemIndicator>
                      <Select.ItemText>{project.title}</Select.ItemText>
                    </Select.Item>
                  ))}
          </Select.Group>

          
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)};

/* const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}); */

export default SelectDemo;