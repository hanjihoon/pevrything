import { NextApiRequest, NextApiResponse } from 'next';
import { query } from 'app/lib/db'

const ITEMS_PER_PAGE = 10;

const dataHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { queryParam, page } = req.query;
  const startIndex = (Number(page) - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const queryStr = `SELECT * FROM DOG_BREEDS A, FILES B 
  WHERE B.NAME LIKE CONCAT(A.DOG_CODE, '?%_COVER.%')`;

  const queryParamArray = []
  queryParamArray.push(queryParam)

  const pageData : any = await query({
      query: queryStr,
      values: queryParamArray
    });

  res.status(200).json(pageData);
};

export default dataHandler;