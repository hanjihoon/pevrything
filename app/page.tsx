import { query } from './lib/db'

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


export default async function ImageListPage() {

let dogBreedImgList: any = await query({
  query: "SELECT * FROM DOG_BREEDS A, FILES B " +
      "WHERE B.NAME LIKE CONCAT(A.DOG_CODE, '_COVER.%')",
  values: [],
})

  return (
    <div>
      <h1>Image List</h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {dogBreedImgList.map((dogBreed: any) => (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full" id={dogBreed.dog_code}>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={"/img/"+dogBreed.name}/>
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Dog</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{dogBreed.breed_kr}</h2>
                    <p className="mt-1">$16.00</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
