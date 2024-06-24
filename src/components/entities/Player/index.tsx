'use client'

import React, { useEffect } from 'react';

import { Details } from '@/components/shared/api/lib';

import './style.css';

declare global {
    interface Window {
        Kinobox: any;
    }
}

export const Player: React.FC<Details> = ({ details }) => {
    useEffect(() => {
        // Создаем элемент скрипта для Kinobox
        const script = document.createElement('script');
        script.src = 'https://kinobox.tv/kinobox.min.js';
        script.async = true;

        // Обработчик загрузки скрипта
        script.onload = () => {
            if (typeof window.Kinobox !== 'undefined') {
                new window.Kinobox('.kinobox_player', { search: { kinopoisk: details } }).init();
            } else {
                console.error('Kinobox is not defined');
            }
        };

        // Добавляем скрипт в документ
        document.body.appendChild(script);

        // Удаляем скрипт при размонтировании компонента
        return () => {
            document.body.removeChild(script);
        };
    }, [details]);

    return (
        <>
            <h5>Просмотр</h5>
            <div className="kinobox_player"></div>
        </>
    );
};
