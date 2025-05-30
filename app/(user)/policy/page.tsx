import "./style.css";

export default function PolicyRender() {
  return (
    <div className="block">
      <section>
        <h2>Условия обслуживания</h2>
        <p>
          КОНТЕНТ ПРЕДОСТАВЛЯЕТСЯ КАК ЕСТЬ, БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫЕ ИЛИ
          ПОДРАЗУМЕВАЕМЫЕ, ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ, ГАРАНТИЯМИ ПРИГОДНОСТЬ
          ДЛЯ ПРОДАЖИ, ПРИГОДНОСТЬ ДЛЯ ОПРЕДЕЛЕННОЙ ЦЕЛИ И ОТСУТСТВИЕ КАКИХ-ЛИБО
          НАРУШЕНИЙ. НИ В КОЕМ СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ
          ОТВЕТСТВЕННОСТИ ЗА КАКИЕ-ЛИБО ПРЕТЕНЗИИ, ВОЗМЕЩЕНИЕ УЩЕРБА ИЛИ ДРУГАЯ
          ОТВЕТСТВЕННОСТЬ, БУДЬ ТО В РАМКАХ ДЕЙСТВИЯ ДОГОВОРА, ДЕЛИКАТНЫМ ИЛИ
          ИНЫМ ОБРАЗОМ, ВЫТЕКАЮЩИЕ ИЗ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ, ИЗ-ЗА НЕГО ИЛИ В
          СВЯЗИ С НИМ КОНТЕНТ ИЛИ ИСПОЛЬЗОВАНИЯ КОНТЕНТ ИЛИ ДРУГИХ ОПЕРАЦИЙ С
          НИМ.
        </p>
      </section>
      <section>
        <h2>Политика конфиденциальности</h2>
        <p>
          Этот сайт использует веб-токены JSON и базу данных значений ключей для
          сеансов и средства аутентификации Web Auth, которые сбрасываются
          каждые 2 часа.
        </p>
        <p>
          Данные, предоставленные на этом сайте, используются исключительно для
          поддержки входа в систему и не передаются никаким сторонним службам,
          кроме как через SMTP или OAuth для целей аутентификации. И Vercel для
          размещения хранилища значений ключей.
        </p>
      </section>
      <section>
        <h2>Для правообладателей</h2>
        <p>
          Если какой - нибудь материал представленный на нашем сайте нарушает
          Ваши авторские права, или же дискредитирует Вашу компанию,
          предоставляя неверную или искаженную информацию, пожалуйста не
          обращайте на это внимания, так как все содержимое сайта, как и сам
          сайт, является исследовательским, учебным проектом, для личного
          использования, не предоставляет какой-либо контент в свободном доступе
          и не преследует коммерческих или иных неправомерных целей.
          <p>С уважением Администрация RATETABLE.</p>
        </p>
      </section>
    </div>
  );
}
