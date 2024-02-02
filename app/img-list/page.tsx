'use client';

import { useEffect, useState } from "react";
import { ListGroup } from 'flowbite-react';
import { query } from 'app/lib/db'

export type QNAType = {
  question: string,
  code: string,
  answerInfo: [{
      answer: string,
      order: number;
  }];
}

{/* @ts-ignore */}
export default async function ListGroupWithButtons(req, res) {
  let surveyInfoList:any[] = [];
        let surveyInfo:any = 
        {
            question: "",
            code: "",
            answerInfo: [{
                answer: "",
                order: 0
            }]
        };
  const [surveyNum, setSurveyNum] = useState<number>(0);
  
      try {
        //QNA
        const selectSurveyQNA = 
            `
            SELECT
            SQ.QUESTION,
            SA.CODE,
            SA. ANSWER,
            SA.ORDER
            FROM UWON.DOG_SURVEY_QUESTION SQ
            JOIN UWON.DOG_SURVEY_ANSWER SA
            ON SQ.CODE = SA.CODE
            `

        const selectSurveyQNAValues: Array<string> = [];
        const selectSurveyQNAData: any = await query({
            query: selectSurveyQNA, 
            values: selectSurveyQNAValues})

        
        let preSurveyCode:string = "";

        for(var surveyContent of selectSurveyQNAData){
            if(surveyContent.CODE != preSurveyCode){
                if(surveyInfo.code!=""){
                    surveyInfoList.push(surveyInfo)
                    surveyInfo = 
                    {
                        question: "",
                        code: "",
                        answerInfo: [{
                            answer: "",
                            order: 0
                        }]
                    };
                }
                surveyInfo.question = surveyContent.QUESTION
                surveyInfo.code = surveyContent.CODE
                surveyInfo.answerInfo.push({
                    answer:surveyContent.ANSWER,
                    order:surveyContent.order
                }) 
            }else{
                surveyInfo.answerInfo.push({
                    answer:surveyContent.ANSWER,
                    order:surveyContent.order
                })
            }
            preSurveyCode = surveyContent.CODE;
        }
        surveyInfoList.push(surveyInfo);
      
      }catch (error) {
        return <p>에러 발생!!</p>
      }

  return (
    <div className="content-center p-8">
      <ListGroup>
        <ListGroup.Item active>
          {/* <p>{surveyInfoList[surveyNum].question}</p> */}
        </ListGroup.Item>

        {/* {surveyInfoList[surveyNum].answerInfo.map((content: any)=>(
        <ListGroup.Item key={content.order}>
          <p>
            {content.answer}
          </p>
        </ListGroup.Item>
        ))} */}
      </ListGroup>
    </div>
  )
}