import { query } from 'app/lib/db'
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
export default async function ImageListPage(req, res) {
  const queryStr = `SELECT * FROM DOG_BREEDS A, FILES B 
  WHERE A.dog_code = SUBSTRING(B.name,1,4)
  AND B.NAME LIKE CONCAT(?,'%_COVER.%')`;
  const valueParams: Array<string> = [];
  if(req.searchParams.codeAlphabet){
    valueParams.push(req.searchParams.codeAlphabet)
  }else  {
    valueParams.push("");
  }
  const dogBreedImgList: any = await query({
    query: queryStr,
    values: valueParams
  })

  // 채우는 구문
  var aToMArr = Array.from({ length: 13 }, (v, i) => String.fromCharCode(i + 65));
  var mToZArr = Array.from({ length: 13 }, (v, i) => String.fromCharCode(i + 78));
          

  return (
    <div>
      <section className="text-gray-600 body-font eastSea_dokdoFont">
        <div className="container px-5 py-8 mx-auto items-center">
          <div className="flex justify-between">
          {aToMArr.map((content) => (
            <button className="middle none center mr-1 rounded-lg bg-green-500 py-1 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true">
              <Link id={content} href={"/dog-list?codeAlphabet="+content} className="text-2l font-bold">{content}</Link>
            </button>
          ))}
          </div>
          <br/>
          <div className="flex justify-between">
          {mToZArr.map((content) => (
            <button className="middle none center mr-1 rounded-lg bg-green-500 py-1 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true">
              <Link id={content} href={"/dog-list?codeAlphabet="+content} className="text-2l font-bold">{content}</Link>
            </button>
          ))}
          </div>
          <br/>
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900 font-bold text-center">반려견 목록</h1><br/>
          <div className="flex flex-wrap -m-4">
            {dogBreedImgList.map((dogBreed: any) => (
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
          </div>
        </div>
      </section>
    </div>
  );
};
