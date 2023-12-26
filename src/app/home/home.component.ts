import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly articles = ARTICLES;
}

const ARTICLES: { title: string; date: string; content: string }[] = [
  {
    title: 'PRZYKŁAD - Nowe laboratoria komputerowe dostępne dla studentów',
    date: '2023-11-29',
    content: `
      <p>Wraz z nowym rokiem w budykach A,F,V politechniki zostaną otwarte nowe laboratoria komputerowe dostępne dla studentów naszej uczelni.</p>
      <p>Laboratoria wyposażone będą w najnowszy sprzęt i oprogramowanie.</p>
      <p>Każde z tych miejsc będzie wolne dla studentów od poniedziałku do piątku w godzinach 8:00-20:00.</p>
      <p>Zapraszamy</p>
    `,
  },
  {
    title: "PRZYKŁAD - Konferencja naukowa 'Przyszłość IT, a bezpieczeństwo'",
    date: '2023-10-02',
    content: `
      <p>Jak co roku mamy przyjemność zaprosić wszystkich studentów do przyjścia na kolejną edycje naszej corocznej konferencji naukowej dt. przyszłości urządzeń IT, a ich wpływ na codzienne bezpieczestwo.
      <p>Konferencja odbędzie się 15 listopada br. w sali 101 budynku A i będzie obejmować wykłady, prezentacje naukowe oraz warsztaty.</p>
      <p>Zachęcamy wszystkich studentów uczelni, jak i jej pracowników do aktywnego udziału w tym ciekawym, lecz jak najbardziej ważnym wydarzeniu naukowym.</p>
    `,
  },
  {
    title:
      'PRZYKŁAD - Zapowiedź wykładu inauguracyjnego nowego roku akademickiego',
    date: '2023-09-27',
    content: `
      <p>Wykład inauguracyjny nowego roku akademickiego odbędzie się 1 pażdziernika o godzinie 10:00 w sali konferencyjnej budynku V Politechniki.</p>
      <p>Serdecznie zapraszamy wszystkich studentów do udziału.</p>
    `,
  },
];
