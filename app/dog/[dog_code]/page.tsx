'use client'

import { useEffect, useState } from "react";
import MoreContents from 'app/components/MoreContents';
import { Accordion } from 'flowbite-react';
import StarDataAccordion from "@/app/components/StarDataAccordion";
import { Spinner } from 'flowbite-react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './output.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

interface IStarContent {
    CONTENT : string
    STAR : string
    MAIN_TITLE : string
    TITLE : string
};

{/* @ts-ignore */}
export default function Detail(props){
    
    const [isLoading, setLoading] = useState(true);
    const [breedKr, setBreedKr] = useState([]);
    const [breedEn, setBreedEn] = useState([]);
    const [dogCode, setDogCode] = useState([]);
    const [breedGroupKr, setBreedGroupKr] = useState([]);
    const [breedGroupEn, setBreedGroupEn] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);
    const [minHeight, setMinHeight] = useState(0);
    const [maxWeight, setMaxWeight] = useState(0);
    const [minWeight, setMinWeight] = useState(0);
    const [maxLifeSpan, setmaxLifeSpan] = useState(0);
    const [minLifeSpan, setMinLifeSpan] = useState(0);
    const [introContents, setIntroContents] = useState<String[]>([]);
    const [moreAboutThisContents, setMoreAboutThisContents] = useState<string[][]>([[]]);
    const [selectedImage, setSelectedImage] = useState('');
    const [imgSrcList, setImgSrcList] = useState([]);
    const [starDataLists, setStarDataLists] = useState<IStarContent[][]>();

    // const [, set] = useState([]);

    useEffect(() => {
        async function getPageData() {
            const apiUrlEndpoint = '/api/dog/getDogDetail?dogCode='+props.params.dog_code
            fetch(apiUrlEndpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                   }
            })
            .then((res) => res.json())
            .then((data) => {
                setBreedKr(data.BREED_KR);
                setBreedEn(data.BREED_EN);
                setBreedGroupKr(data.BREED_GROUP_KR);
                setBreedGroupEn(data.BREED_GROUP_EN);
                setBreedKr(data.BREED_KR);
                setBreedEn(data.BREED_EN);
                setBreedGroupKr(data.BREED_GROUP_KR);
                setBreedGroupEn(data.BREED_GROUP_EN);
                setMaxHeight(Math.round(data.MAX_HEIGHT*2.54));
                setMinHeight(Math.round(data.MIN_HEIGHT*2.54));
                setMaxWeight(Math.round(data.MAX_WEIGHT*2.2046));
                setMinWeight(Math.round(data.MIN_WEIGHT*2.2046));
                setmaxLifeSpan(data.MAX_LIFE_SPAN);
                setMinLifeSpan(data.MIN_LIFE_SPAN);
                setSelectedImage('/img/'+data.DOG_CODE+'_1.'+data.IMG_EXT);
                setStarDataLists(data.starData);
                
                // 사진 갯수 파악해서 이미지경로 리스트화
                let imgSrcArray: any = [];
                for(var i=1;i<=data.IMG_CNT;i++){
                    imgSrcArray.push('/img/'+data.DOG_CODE+'_'+i+'.'+data.IMG_EXT);
                }
                setImgSrcList(imgSrcArray);

                // 인트로 줄바꿈
                let introContentsList: String[] = data.INTRO_CONTENTS.split('\n\n');
                setIntroContents(introContentsList);

                // 더 알아보기 줄바꿈
                let moreContentsList: string[] = data.MORE_ABOUT_THIS_CONTENTS.split('\n\n');
                let moreContentsNestedList: string[][] = [[]];
                for (var i=0;i<moreContentsList.length;i++){
                    let contentList:string = moreContentsList[i];
                    moreContentsNestedList[i] = (contentList||'').split('\n');
                }
                setMoreAboutThisContents(moreContentsNestedList);
                setLoading(false);
            });
            
            }
            getPageData();
        }, [])

        if (isLoading) return <div className="text-center"><br/><br/><br/><Spinner aria-label="Extra large spinner example" size="xl" /></div>
        if (!breedKr) return <p>데이터를 찾을 수 없습니다.</p>

    return (
    <div className="bg-white">
        <div>
            <br/>
            <div className="flex-col md:flex-row px-10 mx-10 items-center text-center">
            <div className="md:w-4/8 mb-4 md:mb-0">
                {/* <Carousel>
                {imgSrcList.map((thumbnail) => (
                    <img src={selectedImage} alt="Large Image" className="w-full rounded-lg h-50 w-60" />
                ))}
                </Carousel> */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={15}
                    loop={true}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >{imgSrcList.map((thumbnail) => (
                    <div>
                        <SwiperSlide><img src={thumbnail} className="flex w-50 h-50 rounded-lg" /></SwiperSlide>
                    </div>
                 ))}
                </Swiper>
            </div>

            
            <ul className="list-outside text-2xl font-bold eastSea_dokdoFont">
                <li>{breedKr}({breedEn})</li>
                <li>견종 그룹: {breedGroupKr}({breedGroupEn})</li>
                <li>몸무게: {minWeight}kg ~ {maxWeight}kg</li>
                <li>몸길이: {minHeight}cm ~ {maxHeight}cm</li>
                <li>수명: {minLifeSpan}살 ~ {maxLifeSpan}살</li>
            </ul>
            </div>
        <br/>
        <br/>
        </div>
        {/* <Carousel>
                {imgSrcList.map((thumbnail) => (
                    <img src={thumbnail} alt="Large Image" className="w-full rounded-lg h-50 w-60" />
                ))}
                </Carousel> */}

        <Accordion>
        <Accordion.Panel>
            <Accordion.Title >
                <p className="font-bold text-xl">{breedKr} 소개</p>
            </Accordion.Title>
            <Accordion.Content>
            {introContents.map((content) => (
                <p className="mb-2 text-gray-500 dark:text-gray-400">{content}</p>
            ))}
            </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
            <Accordion.Title>
                <p className="font-bold text-xl">{breedKr} 성향</p>
            </Accordion.Title>
            <Accordion.Content>
                {starDataLists && starDataLists.map((starDataList:IStarContent[]) => (
                    <Accordion>
                        <Accordion.Panel>
                            <Accordion.Title>
                                    <p className="mb-2 text-blue-400 dark:text-blue-400 hover:gb-indigo-800">{starDataList && starDataList[0].MAIN_TITLE}</p>
                            </Accordion.Title>
                            
                            <Accordion.Content>
                            {starDataList && starDataList.map((content:IStarContent) => (
                                <StarDataAccordion CONTENT={content.CONTENT} STAR={content.STAR} MAIN_TITLE={content.MAIN_TITLE} TITLE={content.TITLE}></StarDataAccordion>
                                
                                ))}
                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>      
                ))}
                
            </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
            <Accordion.Title>
                <p className="font-bold text-xl">{breedKr} 더 알아보기</p>
            </Accordion.Title>
            <Accordion.Content>
            {moreAboutThisContents.map((contents: string[]) => (
                <MoreContents title={contents[0]} contents={contents.slice(1)}/>
            ))}
            </Accordion.Content>
        </Accordion.Panel>
        </Accordion>
    </div>
    );
};