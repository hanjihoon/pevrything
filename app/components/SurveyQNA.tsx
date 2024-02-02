'use client'

import { useEffect, useState, useRef } from "react";
import { ListGroup, Toast, Pagination  } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineExclamationCircle } from 'react-icons/hi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";

export type AnswerInfo = {
  answer: string,
  order: number
}

export type QnaType = {
    question: string,
    code: string,
    answerInfo: AnswerInfo[];
}

export type SubmitData = {
  answerList: string[],
  selectedQuestionItems: string[],
}

export default function SurveyQNA(surveyQNAProps: any) {

  const router = useRouter()
    
  const [currentSurveyNum, setCurrentSurveyNum] = useState(0);
  const [surveyAnswerList, setSurveyAnswerList] = useState<number[]>(Array(surveyQNAProps.surveyInfoList.length).fill(0));
  const [finishYn, setFinishYn] = useState<string>("N");

  const [isNoAnswer, setIsNoAnswer] = useState(false);

  const [piriorQuestionList, setPiriorQuestionList] = useState<number[]>([]);

  const [resultDogCodeList, setResultDogCodeList] = useState<string[]>([]);
  
  const onPageChange = (page: number) => {
    if(!surveyAnswerList[currentSurveyNum]){
      setIsNoAnswer(true);
      return;
    }
    setCurrentSurveyNum(page-1)
  };

  const nextSurvey = (order: number) => {

    setCurrentSurveyNum(currentSurveyNum+1);
    setSurveyAnswerList(() => {
      const newAnswerList = surveyAnswerList;
      newAnswerList[currentSurveyNum] = order;
      console.log(newAnswerList);
      return newAnswerList;
    })

  }

    useEffect(() => {
    }, [])

    const handleItemClick = (item: any) => {
      if (piriorQuestionList.includes(item)) {
        setPiriorQuestionList(piriorQuestionList.filter((piriorQuestionList) => piriorQuestionList !== item));
          
      }
      console.log("선택된 질문 번호: "+piriorQuestionList);
    };

    async function submitData() {
      try {
      const response = await fetch('/api/survey/getSurveyResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ surveyAnswerList, piriorQuestionList })
      }).then((res) => res.json())
      .then((data) => {
        setResultDogCodeList(data.selectDetailBasicData);
        router.push(
          `/dog-survey/result?dogList=${data.selectDetailBasicData.map((data: any)=>{return data.DOG_CODE})}`
          );
        // Redirect to another page with data as query params
        //router.push({
          //pathname: '/dog-survey/result', // Change 'resultPage' to your actual page path
          //query: { resultDogCodeList: JSON.stringify(resultDogCodeList) }
        //});
      })
    } catch (error) {
      // Handle fetch errors
      console.error('Error fetching data:', error);
    }
  }
    
    if(finishYn==="N"){
      return(
        <div className="p-16">
          <div className="flex justify-between">
            {isNoAnswer && (
              <div>
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                  <HiOutlineExclamationCircle className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">질문에 대한 답변을 선택해 주세요</div>
                <Toast.Toggle />
              </Toast>
            </div>
            )}
            
          </div>
          <div>
            <ListGroup>
              <ListGroup.Item active>
                <p className="w-64">
                  {currentSurveyNum+1}. {surveyQNAProps.surveyInfoList[currentSurveyNum].question}
                </p>
              </ListGroup.Item>
  
              {surveyQNAProps.surveyInfoList[currentSurveyNum].answerInfo.map((answerInfo: AnswerInfo, i: number)=>(
                <div key={"answer"+answerInfo.order} 
                  className={surveyAnswerList[currentSurveyNum]==answerInfo.order ? "border-double rounded-md border-4 border-cyan-600" : ""}
                >
                  <ListGroup.Item onClick={()=> nextSurvey(answerInfo.order)}>
                    <p className="text-xl">{answerInfo.answer}</p>
                  </ListGroup.Item>
                </div>
              
              ))}
            </ListGroup>
          </div>
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination currentPage={currentSurveyNum+1} 
            totalPages={surveyAnswerList.length} 
            onPageChange={onPageChange} 
            showIcons />
          </div>
          {currentSurveyNum==17 && (
              <div>
                <br/>
                <Button className="" onClick={function(){setFinishYn("Y");}}>제출하기</Button>
              </div>
            )}
        </div>
      )
    } else {
      return(
        <div className="p-14">
          <ListGroup>
            <ListGroup.Item active>
              <p className="text-xl">가장 중요하게 생각하는 질문 한가지만 선택해 주세요</p>
            </ListGroup.Item>

            {surveyQNAProps.surveyInfoList.map((qnaType: QnaType, i: number)=>(
              <div key={"questionList"+i} 
                className={piriorQuestionList.includes(i) ? "bg-cyan-500/10 border-double rounded-md border-4 border-cyan-600" : ""}
                onClick={() => handleItemClick(i)}
              >
                <ListGroup.Item>
                  <p className="text-xl">{qnaType.question}</p>
                </ListGroup.Item>
              </div>
            
            ))}

          </ListGroup>
          <br/>
              <Button className="" onClick={submitData}>제출하기</Button>
              
      </div>
     )
    }

   
}