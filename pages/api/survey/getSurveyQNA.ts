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
export default async function getSurveyQNAHandler(req, res) {
    if(req.method === "GET"){
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

            let surveyInfoList:QNAType[] = [];
            let surveyInfo:QNAType = 
            {
                question: "",
                code: "",
                answerInfo: [{
                    answer: "",
                    order: 0
                }]
            };
            let preSurveyCode:string = "";

            for(var surveyContent of selectSurveyQNAData){
                if(surveyContent.CODE!=preSurveyCode){
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
            res.status(200).json({surveyInfoList:surveyInfoList});

            
        } catch (error) {

        }
    }
}