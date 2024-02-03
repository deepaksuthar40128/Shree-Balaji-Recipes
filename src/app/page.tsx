'use client'
export const dynamic = 'force-dynamic'
import Image from 'next/image';
import './page.scss'
import { useState, useEffect, useRef } from 'react';
import Card from '@/components/card/Card';
import LoadCard from '@/components/loadCard/LoadCard';
import Loading from './loading';
const Recepi: React.FunctionComponent = (): React.ReactNode => {
    let [loaded, setLoaded] = useState<boolean>(true);
    let [pageNum, setPageNum] = useState<number>(-1);
    let [searchQuery, setSearchQuery] = useState<string>('');
    let [searchURL, setSearchURL] = useState<String>('');
    let [noMoreData, setNoMoreData] = useState<any>(true);
    let flag = useRef(false);
    let [pageData, setPageData] = useState<[{ [key: string]: string | number }] | []>([]);
    const getData = async () => {
        let res = await fetch(searchURL as string, {
            method: 'GET'
        })
        if (res.ok) {
            let data = await res.json();
            if (data.success) {
                data = data.data;
                if (!loaded) setLoaded(true);
                if (data.length < 6) {
                    setNoMoreData(false);
                    if (data.length != 0) {
                        setPageData((prev: any): any => ([...prev, ...data]));
                    }
                    return;
                }
                setPageData((prev: any): any => ([...prev, ...data]));
                flag.current = false;
            } else {
                if (!loaded) setLoaded(true);
                setNoMoreData(false);
            }
        }
    }
    useEffect(() => {
        if (!flag.current)
            getData();
    }, [searchURL])

    useEffect(() => {
        if (pageNum >= 0)
            setSearchURL(`/api/recepi?page=${pageNum}&q=${searchQuery}`);
    }, [pageNum])

    useEffect(() => {
        flag.current = false;
        setPageData([]);
        setTimeout(() => {
            if (pageNum != 0)
                setPageNum(0);
            else setSearchURL(`/api/recepi?page=0&q=${searchQuery}`);
        }, 500);
    }, [searchQuery])

    useEffect(() => {
        setPageNum(0);
    }, [])


    const isElementInView = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    const handleScroll = () => {
        let ele = document.getElementById('lbtn');
        if (!flag.current && ele && isElementInView(document.getElementById('lbtn') as HTMLElement)) {
            flag.current = true;
            setPageNum((prev: any) => (prev + 1));
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])
    let hault: any = -1;
    const handleSearch = (e: HTMLInputElement) => {
        clearTimeout(hault);
        setNoMoreData(true);
        hault = setTimeout(() => {
            setSearchQuery((prev) => (e.value));
        }, 1000);
    }
    return (
        loaded ?
            <div className="mainContainer">
                <div className="mainPage">
                    <div className="hero">
                        <div className="heroText">
                            <h4>Jai Shree BalaJI</h4>
                            <h2>Healthy Cooking Recipes <br /> and the right Nutrition</h2>
                            <p>Browse Through Over <span>1000</span> Tasty Recipes.</p>
                            <button className='button-89'>Recipes</button>
                        </div>
                        <Image layout="responsive" width={1000} height={600} src="/img/hero.jpg" alt='hero' />
                    </div>
                </div>
                <div className='middle_main'>
                    <h2>Recepies For You</h2>
                    <form>
                        <input onChange={(e) => handleSearch(e.target)} type="text" name="search" id="search" placeholder='Search Food Recepies...' />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <div className="homeRecepis">
                    {pageData.map((card, key) => {
                        return (
                            <div key={key}>
                                <Card data={card} />
                            </div>
                        )
                    })

                    }
                    <div id='lbtn'></div>
                    {
                        noMoreData ?
                            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <LoadCard />
                                <LoadCard />
                                <LoadCard />
                                <LoadCard />
                                <LoadCard />
                                <LoadCard />
                            </div> : <div style={{ width: '100%', textAlign: 'center' }}>No More Data</div>
                    }
                </div>
            </div> : <Loading />
    )
}

export default Recepi;