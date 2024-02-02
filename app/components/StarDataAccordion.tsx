'use client'

import { Accordion } from 'flowbite-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FontAwesomeReStarYe from "app/components/star/FontAwesomeReStarYe";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarContentProps {
    CONTENT : string
    STAR : string
    MAIN_TITLE : string
    TITLE : string
};

export default function StarDataAccordion(props : StarContentProps): React.ReactElement {
    

    return(
        <div>
            <Accordion>
                <Accordion.Panel>
                    <Accordion.Title>
                    <p className="text-orange-600 dark:text-orange-600">{props.TITLE}</p>
                    {props.STAR == '1' && 
                    <span><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeReStarYe/><FontAwesomeReStarYe/><FontAwesomeReStarYe/><FontAwesomeReStarYe/></span>
                    }
                    {props.STAR == '2' && 
                    <span><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeReStarYe/><FontAwesomeReStarYe/><FontAwesomeReStarYe/></span>
                    }
                    {props.STAR == '3' && 
                    <span><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeReStarYe/><FontAwesomeReStarYe/></span>
                    }
                    {props.STAR == '4' && 
                    <span><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeReStarYe/></span>
                    }
                    {props.STAR == '5' && 
                    <span><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /><FontAwesomeIcon icon={faStar} style={{color: "#ffd400",}} /></span>
                    }
                    </Accordion.Title>
                    <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        <p>
                        {props.CONTENT}
                        </p>
                    </p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    )
}