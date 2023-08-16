'use client'

import { useEffect, useState, useRef } from "react";
import { ListGroup } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

export type AnswerInfo = {
  answer: string,
  order: number
}

export type QnaType = {
    question: string,
    code: string,
    answerInfo: AnswerInfo[];
  }

export default function SurveyQNA(surveyQNAProps: any) {
    
  const [currentSurveyNum, setCurrentSurveyNum] = useState(0);
  const [answerList, setanswerList] = useState<number[]>(Array(19).fill(null));
  const [finishYn, setFinishYn] = useState<string>("Y");
  const answerRefList = useRef<any[]>([]);

  const [selectedQuestionItems, setSelectedQuestionItems] = useState<string[]>([]);
  
    const nextSurvey = (order: number) => {
      setCurrentSurveyNum(currentSurveyNum+1);
      setanswerList(() => {
        const newAnswerList = answerList;
        newAnswerList[currentSurveyNum] = order;
        console.log(newAnswerList);
        
        if(currentSurveyNum===18){
          // 선택하지 않은 답변이 있을 때 그 해당 질문지로 이동
          answerList.map((el,i) => {
            if(!el){
              setCurrentSurveyNum(i);
              return;
            }
          })

          console.log("대답목록: "+answerList);
          setFinishYn("Y");
        }
        return newAnswerList;
      })
    }

    const goPrev = () => {
      if(currentSurveyNum!=0){
        setCurrentSurveyNum(currentSurveyNum-1);
      }
    }


    const goNext = () => {
      if(currentSurveyNum!=answerList.length-1){
        setCurrentSurveyNum(currentSurveyNum+1);
      }
    }

    useEffect(() => {

      function setSelectedAswer() {
        if(answerList[currentSurveyNum]){
          // console.log(answerRefList.current[answerList[currentSurveyNum]]);
        }
      }

      setSelectedAswer();
    }, [currentSurveyNum])

    const handleItemClick = (item: any) => {
      if (selectedQuestionItems.includes(item)) {
        setSelectedQuestionItems(selectedQuestionItems.filter((selectedQuestionItem) => selectedQuestionItem !== item));
      } else if (selectedQuestionItems.length < 5) {
        setSelectedQuestionItems([...selectedQuestionItems, item]);
      }
      console.log("선택된 아이템 코드: "+selectedQuestionItems);
    };
    
    if(finishYn==="N"){
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
  
              {surveyQNAProps.surveyInfoList[currentSurveyNum].answerInfo.map((answerInfo: AnswerInfo, i: number)=>(
                <div key={"answer"+answerInfo.order} 
                  className={answerList[currentSurveyNum]==i ? "border-double rounded-md border-4 border-cyan-600" : ""}
                >
                  <ListGroup.Item onClick={()=> nextSurvey(answerInfo.order)}>
                    <p className="text-xl">{answerInfo.answer}</p>
                  </ListGroup.Item>
                </div>
              
              ))}
            </ListGroup>
          </div>
        </div>
      )
    } else {
      return(
        <div className="flex justify-between p-16">
          <ListGroup>
            <ListGroup.Item active>
              <p className="text-xl">가장 중요하게 생각하는 항목을 선택해 주세요(최대 5가지)</p>
            </ListGroup.Item>

            {surveyQNAProps.surveyInfoList.map((qnaType: QnaType, i: number)=>(
              <div key={"questionList"+i} ref={el => answerRefList.current[i] = el}
                className={selectedQuestionItems.includes(qnaType.code) ? "bg-cyan-500/10 border-double rounded-md border-4 border-cyan-600" : ""}
                onClick={() => handleItemClick(qnaType.code)}
              >
                <ListGroup.Item>
                  <p className="text-xl">{qnaType.question}</p>
                </ListGroup.Item>
              </div>
            
            ))}
          </ListGroup>
      </div>
     )
    }

   
}