
import { Seo } from "../../shared/seo/seo.jsx";

export default function Error404() {
    return (
        <>
            <Seo
                seoTitle='404'
                seoDescription="404"
                seoOgTitle='404'
                seoOgImage="/images/LOGO.png"
            />
            <div style={{ textAlign: "center", fontSize: "50px", color: "red" }}>
                404
            </div>
        </>
    );
}
