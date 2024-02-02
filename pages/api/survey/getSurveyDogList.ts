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

    const dogList = req?.query?.dogList?.split(',');

    const questionMarks = Array(dogList?.length).fill('?').join(',');
    if(req.method === "GET"){
        try {
            //QNA
            const selectDogList = 
                `
                SELECT * FROM DOG_BREEDS DB
                INNER JOIN  FILES F
                ON F.NAME LIKE CONCAT(DB.DOG_CODE, '_COVER%')
                WHERE DOG_CODE IN (${questionMarks})
                `

            const selectDogListValues: Array<string> = dogList;
            const selectDogListData: any = await query({
                query: selectDogList, 
                values: selectDogListValues})
            res.status(200).json({selectDogListData:selectDogListData});

            
        } catch (error) {

        }
    }
}