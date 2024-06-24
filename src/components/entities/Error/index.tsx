'use client'

import Link from 'next/link';
import { IconHome, IconRefreshAlert } from '@tabler/icons-react';

import "./style.css"

interface ErrorRenderProps {
  onClick: () => void;
}

export function ErrorRender({ onClick }: ErrorRenderProps) {
  return (
    <div className="error">
      <h2>Что-то пошло не так!</h2>
      <div>
        <Link href="/" className="button">
          <IconHome stroke={2} />
          Главная
        </Link>
        <button onClick={onClick} className="button">
          <IconRefreshAlert stroke={2} />
          Обновить
        </button>
      </div>
    </div>
  );
}
