
import { query } from 'app/lib/db'
import SurveyQNA from 'app/components/SurveyQNA'

export type AnswerInfo = {
  answer: string,
  order: number
}

export type QNAType = {
  question: string,
  code: string,
  answerInfo: AnswerInfo[];
}

{/* @ts-ignore */}
export default async function ListGroupWithButtons(req, res) {
  let surveyInfoList:QNAType[] = [];
  let surveyInfo:QNAType = 
      {
          question: "",
          code: "",
          answerInfo: []
      };
  
      try {
        //QNA
        const selectSurveyQNA = 
            `
            SELECT SQ.QUESTION, SA.CODE, SA. ANSWER, SA.ORDER
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
                        answerInfo: []
                    };
                }
                surveyInfo.question = surveyContent.QUESTION
                surveyInfo.code = surveyContent.CODE
                surveyInfo.answerInfo.push({
                    answer:surveyContent.ANSWER,
                    order:surveyContent.ORDER
                }) 
            }else{
                surveyInfo.answerInfo.push({
                    answer:surveyContent.ANSWER,
                    order:surveyContent.ORDER
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
      <SurveyQNA surveyInfoList={surveyInfoList}></SurveyQNA>
    </div>
  )
}