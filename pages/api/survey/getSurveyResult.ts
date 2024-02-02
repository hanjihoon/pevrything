import { query } from 'app/lib/db'



{/* @ts-ignore */}
export default async function getDogDetailHandler(req, res) {

    function adjustCondition(starValue: number, iteration: number, answerVal:number) {
        let range = iteration === 1 ? 2 : 1; // ±2 for first iteration, ±1 for second
        let lowerBound = Math.max(1, starValue - range);
        let upperBound = Math.min(5, starValue + range);
        return `DCS${answerVal}.STAR BETWEEN ${lowerBound} AND ${upperBound}`;
    }
    
    //랜덤 숫자 생성하는 함수(최소값,최댓값)
    function getRandomNumber(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if(req.method === "POST"){
        
        try {

            const surveyAnswerList = req.body.surveyAnswerList;
            const piriorQuestionList = req.body.piriorQuestionList;
            
            let lastIndexOfNum = 0;

            let selectCnt = 1;

            console.log(surveyAnswerList);
            console.log(piriorQuestionList);
            //추가 조회 데이터
            let addSelectSurveyResultDogCode:any = [];


            

            //답변에 대한 최적의 데이터 조회
            let whereAD00 = ` WHERE (DCS0.TITLE_CODE='AD00' AND DCS0.STAR = ${surveyAnswerList[0]})`;
            let whereAD01 = ` AND (DCS1.TITLE_CODE='AD01' AND DCS1.STAR = ${surveyAnswerList[1]})`;
            let whereAD03 = ` AND (DCS2.TITLE_CODE='AD03' AND DCS2.STAR = ${surveyAnswerList[2]})`;
            let whereAD04 = ` AND (DCS3.TITLE_CODE='AD04' AND DCS3.STAR = ${surveyAnswerList[3]})`;
            let whereAD05 = ` AND (DCS4.TITLE_CODE='AD05' AND DCS4.STAR = ${surveyAnswerList[4]})`;
            let whereAF00 = ` AND (DCS5.TITLE_CODE='AF01' AND DCS5.STAR = ${surveyAnswerList[5]})`;
            let whereAF03 = ` AND (DCS6.TITLE_CODE='AF03' AND DCS6.STAR = ${surveyAnswerList[6]})`;
            let whereHG00 = ` AND (DCS7.TITLE_CODE='HG00' AND DCS7.STAR = ${surveyAnswerList[7]})`;
            let whereHG02 = ` AND (DCS8.TITLE_CODE='HG02' AND DCS8.STAR = ${surveyAnswerList[8]})`;
            let whereHG05 = ` AND (DCS9.TITLE_CODE='HG05' AND DCS9.STAR = ${surveyAnswerList[9]})`;
            let wherePN01 = ` AND (DCS10.TITLE_CODE='PN01' AND DCS10.STAR = ${surveyAnswerList[10]})`;
            let wherePN02 = ` AND (DCS11.TITLE_CODE='PN02' AND DCS11.STAR = ${surveyAnswerList[11]})`;
            let wherePN03 = ` AND (DCS12.TITLE_CODE='PN03' AND DCS12.STAR = ${surveyAnswerList[12]})`;
            let whereTR00 = ` AND (DCS13.TITLE_CODE='TR00' AND DCS13.STAR = ${surveyAnswerList[13]})`;
            let whereTR01 = ` AND (DCS14.TITLE_CODE='TR01' AND DCS14.STAR = ${surveyAnswerList[14]})`;
            let whereTR03 = ` AND (DCS15.TITLE_CODE='TR03' AND DCS15.STAR = ${surveyAnswerList[15]})`;
            let whereTR04 = ` AND (DCS16.TITLE_CODE='TR04' AND DCS16.STAR = ${surveyAnswerList[16]})`;
            let whereTR05 = ` AND (DCS17.TITLE_CODE='TR05' AND DCS17.STAR = ${surveyAnswerList[17]}) GROUP BY DOG_CODE;`;

            

            let selectSurveyResultDogCode = 
            `
            SELECT 
            DCS0.DOG_CODE
            FROM UWON.dog_char_star DCS0
            INNER JOIN UWON.dog_char_star DCS1
            ON DCS0.DOG_CODE = DCS1.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS2
            ON DCS0.DOG_CODE = DCS2.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS3
            ON DCS0.DOG_CODE = DCS3.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS4
            ON DCS0.DOG_CODE = DCS4.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS5
            ON DCS0.DOG_CODE = DCS5.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS6
            ON DCS0.DOG_CODE = DCS6.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS7
            ON DCS0.DOG_CODE = DCS7.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS8
            ON DCS0.DOG_CODE = DCS8.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS9
            ON DCS0.DOG_CODE = DCS9.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS10
            ON DCS0.DOG_CODE = DCS10.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS11
            ON DCS0.DOG_CODE = DCS11.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS12
            ON DCS0.DOG_CODE = DCS12.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS13
            ON DCS0.DOG_CODE = DCS13.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS14
            ON DCS0.DOG_CODE = DCS14.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS15
            ON DCS0.DOG_CODE = DCS15.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS16
            ON DCS0.DOG_CODE = DCS16.DOG_CODE
            INNER JOIN UWON.dog_char_star DCS17
            ON DCS0.DOG_CODE = DCS17.DOG_CODE
            `

            
            //기본 쿼리에 조건절들 더하기
            selectSurveyResultDogCode 
            += whereAD00
            += whereAD01
            += whereAD03
            += whereAD04
            += whereAD05
            += whereAF00
            += whereAF03
            += whereHG00
            += whereHG02
            += whereHG05
            += wherePN01
            += wherePN02
            += wherePN03
            += whereTR00
            += whereTR01
            += whereTR03
            += whereTR04
            += whereTR05;

            let selectDetailBasicData: any = await query({
                query: selectSurveyResultDogCode, 
                values: []})
            
            console.log(`${selectCnt}차 결과`);
            console.log(selectDetailBasicData);
            
            
            let beforeSelectSurveyResultDogCode = "";
            let beforeResult = selectDetailBasicData;
            if(selectDetailBasicData.length < 5){
                do{
                    //5개 이상의 데이터를 얻기 위해 임의적으로 선택된 질문지들은 조건이 재설정됨
                    //우선적으로 선택된(최대 5가지) 질문들의 조건은 수정하지 않음
                    let answerVal;

                    do{
                        answerVal = getRandomNumber(0, 17);
                    } while (piriorQuestionList.includes(answerVal));

                    //임의로 선택된 질문지는 조건이 수정되고 다음번엔 선택되지 않도록 piriorList에 넣음
                    piriorQuestionList.push(answerVal);

                    console.log("answerVal : "+answerVal);
                    console.log("piriorQuestionList 확인");
                    console.log(piriorQuestionList);

                    //질문 번호가 1의 자리면 13, 10의자리면 14, 질문이 100개 이상이 될 수도 있는 것은 고려 안했음(질문 99개까지는 정상 동작) 에러 가능성
                    if(answerVal < 10){
                        lastIndexOfNum = 13;
                    }else{
                        lastIndexOfNum = 14;
                    }

                    let lastIndexOfDSCNum = selectSurveyResultDogCode.lastIndexOf(
                        "DCS"+answerVal+".");
                    console.log(lastIndexOfDSCNum);
                    console.log("selectSurveyResultDogCode.slice lastIndexOf: "+selectSurveyResultDogCode.substring(
                        lastIndexOfDSCNum, lastIndexOfDSCNum + lastIndexOfNum));

                    let newCase = adjustCondition(surveyAnswerList[answerVal], 1, answerVal);

                    //임의적으로 선택된 질문지의 조건을 넉넉하게 조정(최소 5개 정도의 데이터를 추출하기 위함)
                    selectSurveyResultDogCode = selectSurveyResultDogCode.replace(
                        selectSurveyResultDogCode.substring(
                            lastIndexOfDSCNum, lastIndexOfDSCNum + lastIndexOfNum),
                            newCase);
                    
                    console.log(`${selectCnt}차 쿼리STR`);
                    console.log(selectSurveyResultDogCode);
                    
                    selectDetailBasicData = await query({
                        query: selectSurveyResultDogCode, 
                        values: []})
                    
                    //결과 수의 차이가 10이상 나고, 조건 실행 수가 15 미만일 경우에 다른 조건으로 변경
                    if(((selectDetailBasicData.length - beforeResult.length) > 10) && (piriorQuestionList.length < 16)){
                        selectSurveyResultDogCode = beforeSelectSurveyResultDogCode;
                        selectDetailBasicData = beforeResult;
                        piriorQuestionList.pop();
                        continue;
                    }
                        
                    beforeSelectSurveyResultDogCode = selectSurveyResultDogCode;
                    beforeResult = selectDetailBasicData;
                    console.log(`${selectCnt}차 결과`);
                    console.log(selectDetailBasicData);
                    console.log("@@@@@@@@@@@@@@@@@@@@"+selectDetailBasicData.length);

                    selectCnt++;
                } while(selectDetailBasicData.length < 4 && piriorQuestionList.length < 18)
            }
            
            console.log("beforeResult 데이터 확인!!");
            console.log(beforeResult);
            console.log("selectDetailBasicData 데이터 확인!!");
            console.log(selectDetailBasicData);

           
            res.status(200).json({selectDetailBasicData:selectDetailBasicData});



            
        } catch (error) {
            console.log(error);
        }
    }
}