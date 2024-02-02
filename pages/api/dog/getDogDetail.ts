import { query } from 'app/lib/db'

{/* @ts-ignore */}
export default async function getDogDetailHandler(req, res) {
    if(req.method === "GET"){
        try {
            //상세페이지의 이미지, 기본정보, 인트로, 더 알아보기 select
            const selectDetailBasicQuery = 
                `
                SELECT 
                DB.DOG_CODE, 
                DB.BREED_KR, 
                DB.BREED_EN,
                DB.BREED_GROUP_KR,
                DB.BREED_GROUP_EN,
                DB.MAX_HEIGHT,
                DB.MAX_WEIGHT,
                DB.MAX_LIFE_SPAN,
                DB.MIN_HEIGHT,
                DB.MIN_WEIGHT,
                DB.MIN_LIFE_SPAN,
                DD.CONTENTS AS INTRO_CONTENTS,
                DM.CONTENT AS MORE_ABOUT_THIS_CONTENTS,
                (SELECT COUNT(F.NAME)-1 FROM UWON.FILES F WHERE F.NAME LIKE CONCAT(?,'_%')) AS IMG_CNT,
                (SELECT SUBSTRING_INDEX(F.NAME, '.', -1) FROM UWON.FILES F WHERE F.NAME LIKE CONCAT(?,'_1.%')) AS IMG_EXT
                FROM UWON.DOG_BREEDS DB
                JOIN UWON.DOG_DETAIL_INTRO DD
                ON DB.DOG_CODE = DD.DOG_CODE
                JOIN UWON.DOG_MOREABOUTTHISBREED_CONTENT DM
                ON DB.DOG_CODE = DM.DOG_CODE
                WHERE DB.DOG_CODE = ?
                `
            const selectDetailBasicValues: any[] = [req.query.dogCode,req.query.dogCode,req.query.dogCode];
            const selectDetailBasicData: any = await query({
                query: selectDetailBasicQuery, 
                values: selectDetailBasicValues})


            // 상세페이지 참고 사항
            const selectStarQuery = 
                `
                SELECT
                CC.CONTENT,
                CS.STAR,
                CT.MAIN_TITLE,
                CT.TITLE
                FROM UWON.DOG_CHARACTER_STAR CS
                JOIN UWON.DOG_CHARACTER_CONTENT CC
                ON CS.TITLE_CODE = CC.TITLE_CODE
                JOIN UWON.DOG_CHARACTER_TITLE CT
                ON CS.TITLE_CODE = CT.TITLE_CODE
                WHERE CS.DOG_CODE = ?            
                `
            const selectStarValues: any[] = [req.query.dogCode];
            const selectStarData: any = await query({
                query: selectStarQuery, 
                values: selectStarValues})

            const adStarList = [];
            const afStarList = [];
            const hgStarList = [];
            const pnStarList = [];
            const trStarList = [];
            for(var starContent of selectStarData){
                if(starContent.MAIN_TITLE == '적응성'){
                    adStarList.push(starContent)
                } else if(starContent.MAIN_TITLE === '모든 주변의 친근함'){
                    afStarList.push(starContent)
                } else if(starContent.MAIN_TITLE === '건강과 몸단장의 필요성'){
                    hgStarList.push(starContent)
                } else if(starContent.MAIN_TITLE === '물리적 요구사항'){
                    pnStarList.push(starContent)
                } else if(starContent.MAIN_TITLE === '훈련성'){
                    trStarList.push(starContent)
                }
            }
            Object.assign(selectDetailBasicData[0], {
                    starData: [
                    adStarList,
                    afStarList,
                    hgStarList,
                    pnStarList,
                    trStarList
                    ]
                });
            res.status(200).json(selectDetailBasicData[0]);



            
        } catch (error) {

        }
    }
}