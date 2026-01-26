interface NotApplicableText {
  view: string;
  title: string;
  description: string;
}

export function getNotApplicableTextBased(currentView: string) {
  const notApplicatbleText: NotApplicableText[] = [
    {
      view: 'HeaterLocation',
      title:
        'Aktuell keine Angebote für Heizungen im Ober- oder Dachgeschoss verfügbar',
      description: `Vielen Dank für dein Interesse! Leider können wir unser Angebot derzeit
    nicht für Gebäude anbieten, bei denen die Heizung im Ober- oder Dachgeschoss
    installiert ist. Aufgrund technischer Einschränkungen ist dies momentan
    nicht möglich. Wenn du möchtest, kannst du dich gerne in unsere Warteliste
    eintragen, indem du auf "Weiter" klickst. Wir informieren dich umgehend,
    sobald sich etwas ändert. Vielen Dank für dein Verständnis!`,
    },
    {
      view: 'HeatingRoomEntranceHeight',
      title: '  Leider kein Angebot möglich wegen des zu schmalen Laufwegs',
      description: ` Vielen Dank für dein Interesse an unserem Service! Leider können wir dir
    kein Angebot erstellen, da wir sicherstellen müssen, dass alle benötigten
    Komponenten sicher in den Heizungsraum gebracht werden können, ohne Schäden
    im Gebäude zu verursachen. Trage dich gerne in unsere Warteliste ein, damit
    wir dich informieren können, sobald sich die technischen Anforderungen
    entsprechend verändert haben. Klicke dazu einfach auf „Weiter”. Wir freuen
    uns auf die mögliche künftige Zusammenarbeit!`,
    },
    {
      view: 'HeatingRoomFloor',
      title: 'Leider kein Angebot möglich wegen Platzmangels',
      description: `Vielen Dank für dein Interesse an unserem Service! Leider können wir dir
    kein Angebot erstellen, da wir sicherstellen müssen, dass alle benötigten
    Komponenten sicher im Heizungsraum untergebracht werden können, ohne Schäden
    im Gebäude zu verursachen. Trage dich gerne in unsere Warteliste ein, damit
    wir dich informieren können, sobald sich die technischen Anforderungen
    entsprechend verändert haben. Klicke dazu einfach auf „Weiter”. Wir freuen
    uns auf die mögliche künftige Zusammenarbeit!`,
    },
    {
      view: 'HeatingRoomHeight',
      title: 'Leider kein Angebot möglich wegen Platzmangels',
      description: `Vielen Dank für dein Interesse an unserem Service! Leider können wir dir
    kein Angebot erstellen, da wir sicherstellen müssen, dass alle benötigten
    Komponenten sicher im Heizungsraum untergebracht werden können, ohne Schäden
    im Gebäude zu verursachen. Trage dich gerne in unsere Warteliste ein, damit
    wir dich informieren können, sobald sich die technischen Anforderungen
    entsprechend verändert haben. Klicke dazu einfach auf „Weiter”. Wir freuen
    uns auf die mögliche künftige Zusammenarbeit!`,
    },
    {
      view: 'HeatingRoomWidth',
      title: 'Leider kein Angebot möglich wegen des zu schmalen Laufwegs',
      description: `Vielen Dank für dein Interesse an unserem Service! Leider können wir dir
    kein Angebot erstellen, da wir sicherstellen müssen, dass alle benötigten
    Komponenten sicher in den Heizungsraum gebracht werden können, ohne Schäden
    im Gebäude zu verursachen. Trage dich gerne in unsere Warteliste ein, damit
    wir dich informieren können, sobald sich die technischen Anforderungen
    entsprechend verändert haben. Klicke dazu einfach auf „Weiter”. Wir freuen
    uns auf die mögliche künftige Zusammenarbeit!`,
    },
    {
      view: 'ListedBuilding',
      title: 'Aktuell keine Angebote für denkmalgeschützte Gebäude verfügbar',
      description: `Vielen Dank für dein Interesse! Leider können wir unser Angebot derzeit
    nicht für denkmalgeschützte Gebäude anbieten. Aufgrund spezieller Auflagen
    und Einschränkungen im Denkmalschutz können wir momentan keine
    entsprechenden Lösungen bereitstellen. Wenn du möchtest, kannst du dich
    gerne in unsere Warteliste eintragen, indem du auf "Weiter" klickst. Wir
    informieren dich umgehend, sobald sich etwas ändert. Vielen Dank für dein
    Verständnis!`,
    },
    {
      view: 'ReplaceCurrentSystem',
      title:
        ' Aktuell nur bei vollständiger Erneuerung des Heizsystems verfügbar',
      description: `Vielen Dank für dein Interesse! Leider können wir unser Angebot derzeit nur
    für Gebäude anbieten, bei denen das Heizsystem komplett erneuert werden
    kann. Da wir aktuell keine oder Teilerneuerungen anbieten, ist eine
    vollständige Erneuerung Voraussetzung. Wenn du möchtest, kannst du dich
    gerne in unsere Warteliste eintragen, indem du auf "Weiter" klickst. Wir
    informieren dich umgehend, sobald sich etwas ändert. Vielen Dank für dein
    Verständnis!`,
    },
  ];

  return notApplicatbleText.find((item) => item.view === currentView);
}
