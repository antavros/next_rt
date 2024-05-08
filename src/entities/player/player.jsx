import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const KinoboxPlayer = () => {
    const params = useParams();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://kinobox.tv/kinobox.min.js';
        script.async = true;

        script.onload = () => {
            new Kinobox('.kinobox_player', { search: { kinopoisk: params.titleId } }).init();
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div className="kinobox_player"></div>;
}

export default KinoboxPlayer;