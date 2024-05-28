import Image from 'next/image'

import { SwiperCard } from "@/entities/swiper/swiper_card/swiper_card"
import "@/entities/title/rate/rate.css";
import "./titlePage_bottom.css"

export function TitlePageBottom({ details }: { readonly details: any }) {
    return (
        <div className='titlePage_footer'>
            {/* <SwiperCard titleData={details.similar}/> */}
        </div>
    );
}