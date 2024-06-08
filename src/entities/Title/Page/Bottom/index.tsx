
import { SwiperCardTitle } from "./Swiper/Titles";
import "@/entities/Title/Rate/style.css";
import style from "./style.module.css"

export function TitlePageBottom({ details }: { readonly details: any }) {
    return (
        <div className={`${style.bottom}`}>
            {details.similar && details.similar.length > 0 && (
                <SwiperCardTitle details={details} />
            )}
        </div>
    );
}