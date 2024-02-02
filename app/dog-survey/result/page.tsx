'use client'

import { useEffect, useState } from "react";
import { query } from 'app/lib/db'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'
export type DogBreed = {
  dog_code: string
  breed_kr: string
  breed_en: string
  mix_breed_kr: string
  mix_breed_en: string
  max_height: string
  max_weight: string
  max_life_span: string
  min_height: string
  min_weight: string
  min_life_span: string
  detail_yn: string
}

{/* @ts-ignore */}
export default function SurvetResultListPage(req, res) {

  const [selectDogListData, setSelectDogListData] = useState([]);
  const searchParams = useSearchParams();
  var dogList = searchParams?.get("dogList");
  // console.log("params 확인!!!");
  console.log('Received Parameters:', searchParams?.get("dogList"));

  // Create a string of comma-separated question marks based on the array length
  
  // const queryStr = `SELECT * FROM DOG_BREEDS A 
  // WHERE A.dog_code IN (${questionMarks})`;
  // const valueParams: Array<string> = [];
  // const dogBreedImgList: any = await query({
  //   query: queryStr,
  //   values: dogList
  // })
  
  useEffect(() => {
    async function getPageData() {
        const apiUrlEndpoint = `/api/survey/getSurveyDogList?dogList=${dogList}`
        fetch(apiUrlEndpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
               }
        })
        .then((res) => res.json())
        .then((data) => {
          setSelectDogListData(data.selectDogListData);
          console.log("data");
          console.log(data.selectDogListData);
        });
      }
    getPageData();
}, [])

  return (
    <div>
      <section className="text-gray-600 body-font eastSea_dokdoFont">
        <div className="container px-5 py-8 mx-auto items-center">
          <br/>
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900 font-bold text-center">반려견 목록</h1><br/>
          <div className="flex flex-wrap -m-4">
            {selectDogListData.map((dogBreed: any) => (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full border border-gray-400" id={dogBreed.dog_code}>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xl tracking-widest title-font mb-1">{dogBreed.dog_code}</h3>
                    <h2 className="text-gray-900 text-2xl title-font font-medium">{dogBreed.breed_kr}({dogBreed.breed_en})</h2>
                  </div>
                  <Link href={"/dog/"+dogBreed.dog_code} className="block relative h-30 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={"/img/"+dogBreed.name}/>
                  </Link>
                </div>
              ))}
              {/* {selectDogListData} */}
          </div>
        </div>
      </section>
    </div>
  );
};
