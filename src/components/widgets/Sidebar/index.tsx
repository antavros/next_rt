'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  IconHome,
  IconMovie,
  IconDeviceTvOld,
  IconMickey,
  IconHorseToy,
  IconTorii,
  IconUsers,
  IconCards,
} from '@tabler/icons-react';

import { Togglers } from '@/components/features/Togglers';
import { UserCard } from "@/components/entities/User/Card"
import { Logo } from '@/components/entities/Logo';
import './style.css';

export function Sidebar() {

  const pathname = usePathname()
  const isActive = (href: string) => {
    return pathname.startsWith(href) ? 'active' : '';
  };

  return (
    <aside>
      <section className='Sidebar'>
        <Logo />
        <nav id="Sidebar" aria-label="Боковое меню навигации" >
          <UserCard />
          <hr />
          <ul>
            <li>
              <Link className={`button link ${pathname === '/' ? 'active' : ''}`} href="/" >
                <IconHome stroke={2} />
                <h6>Главная</h6>
              </Link>
            </li>
            <li>
              <Link className={`button link ${isActive('/title/movie')} `} href="/title/movie?page=1" >
                <IconMovie stroke={2} />
                <h6>Фильмы</h6>
              </Link>
            </li>
            <li>
              <Link className={`button link ${isActive('/title/tv-series')}`} href="/title/tv-series?page=1">
                <IconDeviceTvOld stroke={2} />
                <h6>Сериалы</h6>
              </Link>
            </li>
            <li>
              <Link className={`button link ${isActive('/title/cartoon')}`} href="/title/cartoon?page=1">
                <IconMickey stroke={2} />
                <h6>Мультфильмы</h6>
              </Link>
            </li>
            <li>
              <Link className={`button link ${isActive('/title/animated-series')}`} href="/title/animated-series?page=1">
                <IconHorseToy stroke={2} />
                <h6>Мультсериалы</h6>
              </Link>
            </li>
            <li>
              <Link className={`button link ${isActive('/title/anime')}`} href="/title/anime?page=1">
                <IconTorii stroke={2} />
                <h6>Аниме</h6>
              </Link>
            </li>
            <li>
              <Link className={`button link ${isActive('/title/list')}`} href="/title/list?page=1">
                <IconCards stroke={2} />
                <h6>Коллекции</h6>
              </Link>
            </li>
            <li>
              <Link className={`button link ${isActive('/title/person')}`} href="/title/person?page=1">
                <IconUsers stroke={2} />
                <h6>Персоны</h6>
              </Link>
            </li>
          </ul>
          <hr />
          <Togglers />
        </nav>
      </section >
    </aside >
  );
}