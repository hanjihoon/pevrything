'use client'

import { useEffect, useState, useRef } from "react";
import { ListGroup } from 'flowbite-react';
import { Pagination } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

export type AnswerInfo = {
  answer: string,
  order: number
}

export type QNAType = {
    question: string,
    code: string,
    answerInfo: AnswerInfo[];
  }

export default function SurveyQNA(surveyQNAProps: any): React.ReactElement {
    
  const [currentSurveyNum, setCurrentSurveyNum] = useState(0);
  const [answerList, setanswerList] = useState<number[]>(Array(18).fill(null));
  const answerRefList = useRef<any[]>([]);
  
    const nextSurvey = (order: number) => {
      setCurrentSurveyNum(currentSurveyNum+1);
      setanswerList(() => {
        const newAnswerList = answerList;
        newAnswerList[currentSurveyNum] = order;
        console.log(newAnswerList);
        return newAnswerList;
      })
      if(currentSurveyNum===17){
        console.log("대답목록: "+answerList);
        setCurrentSurveyNum(0);
      }
    }

    const goPrev = () => {
      setCurrentSurveyNum(currentSurveyNum-1);
    }


    const goNext = () => {
      setCurrentSurveyNum(currentSurveyNum+1);
    }

    useEffect(() => {

      function setSelectedAswer() {
        if(answerList[currentSurveyNum]){
          console.log(answerRefList.current[answerList[currentSurveyNum]]);
        }
      }

      setSelectedAswer();
    }, [currentSurveyNum])
    


    return(
      <div className="p-16">
        <div className="flex justify-between">
          <div>
            <Button outline pill onClick={goPrev}>
              <HiOutlineArrowLeft className="h-6 w-6" />
            </Button>
          </div >
          <div>
            <Button outline pill onClick={goNext}>
              <HiOutlineArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div>
          <ListGroup>
            <ListGroup.Item active>
              <p className="text-xl">{currentSurveyNum+1}. {surveyQNAProps.surveyInfoList[currentSurveyNum].question}</p>
            </ListGroup.Item>

            {surveyQNAProps.surveyInfoList[currentSurveyNum].answerInfo.map((content: AnswerInfo, i: number)=>(
              <div key={"answer"+content.order} ref={el => answerRefList.current[i] = el}
                className={answerList[currentSurveyNum]==content.order ? "border-double rounded-md border-4 border-indigo-600" : ""}
              >
                <ListGroup.Item onClick={()=> nextSurvey(content.order)}>
                  <p className="text-xl">{content.answer}</p>
                </ListGroup.Item>
              </div>
            
            ))}
          </ListGroup>
        </div>
      </div>
    )
}