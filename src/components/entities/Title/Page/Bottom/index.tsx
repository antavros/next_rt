import { SwiperCardTitle } from "./Swiper/Titles";
import style from "./style.module.css";

export function TitlePageBottom({ details }: { readonly details: any }) {
    return (
        <>
            {details.similar.length > 0 && (
                <>
                    <hr />
                    <div className={`${style.bottom}`}>
                        <SwiperCardTitle details={details} />
                    </div>
                </>
            )}
        </>
    );
}
