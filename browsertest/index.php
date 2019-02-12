<!DOCTYPE html>
<html>
<head>
    <title>BIBB Templates Test</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width"/>

    <style>
        * {
            font-family: Arial;
            margin: 0;
            padding: 0;
        }
        body {
            padding: 40px;
        }
        a {
            color: #003571;
        }
        h1 {
            font-size: 30px;
            margin-bottom: 20px;
        }
        h2 {
            margin-top: 30px;
            font-size: 20px;
            margin-bottom: 10px;
        }
        h3 {
            font-size: 15px;
            line-height: 15px;
            margin-bottom: 8px;
        }
        p {
            font-size: 12px;
            line-height: 16px;
            margin-bottom: 20px;
            padding-left: 10px;
        }
        p.large {
            font-size: 15px;
            padding-left: 0;
        }
        p.no-padding {
            padding-left: 0;
        }
        p > a {
            color: black;
        }
        p > a:before {
            content: '» ';
            color: black;
        }
        .border-bottom {
        }
        .page {
            margin-bottom: 10px;
        }

    </style>
</head>
<body class="{{ bodyClass }}">

<h1>BIBB Templates</h1>

<p class="large">
    Ergänzend zum Patternlab finden Sie hier die fertig umgesetzten Seiten zum direkten und bequemen Aufruf im Browser.<br>
    Die hinterlegten JPGs zeigen konkrete Anwendungsszenarien aus dem aktuellen BIBB-Auftritt.
</p>

<p class="no-padding">
<br>Übersicht Seitentypen im BIBB-Auftritt:<br>
<a href="screens/Seitentypen_BIBB.jpg">Seitentypen_BIBB.jpg</a><br>
<a href="screens/Seitentypen_Fachportale.jpg">Seitentypen_Fachportale.jpg</a><br>
<br>
</p>

<?php

$pageInfo = [];

$pageInfo['pages-homepage-standard'] = [
    'headline' => 'Startseite BIBB',
    'description' => 'Die Funktionsnavigation zeigt den Zustand bei Login ("Mein Login")<br>
Vgl. Seitenaufbau der engl. BIBB-Seite (Logout):<br>
<a href="screens/BIBB_EN.jpg">BIBB_EN.jpg</a><br>

',
    'screens' => [],
    'border' => true
];

$pageInfo['pages-overviewpage-topic-start'] = [
    'headline' => 'Themengruppenstartseite',
    'description' => 'Übersicht Standardmodule:<br>
<a href="screens/TGST_VE1.jpg">TGST_VE1.jpg</a><br>
Optionaler Text unter der Bühne (nur hier!)<br>
<a href="screens/TGST_VE2.jpg">TGST_VE2.jpg</a><br>
',
    'screens' => [],
    'meta' => 'Seiten ohne rechte Spalte'
];

$pageInfo['pages-overviewpage-archive-list'] = [
    'headline' => 'Archiv-Liste',
    'description' => 'Relevant für:<br>
<a href="screens/Pressearchiv_Liste_VE_Jahrgang.jpg">Pressearchiv_Liste_VE_Jahrgang.jpg</a><br>
<a href="screens/Pressearchiv_Liste_VE_Uebersicht.jpg">Pressearchiv_Liste_VE_Uebersicht.jpg</a><br>
<a href="screens/Veranstaltung_Liste.jpg">Veranstaltung_Liste.jpg</a><br>
<a href="screens/Veranstaltung-Doku-Liste.jpg">Veranstaltung-Doku-Liste.jpg</a><br>
<a href="screens/VOEVZ_9_Publikationen_BWP_Archiv.jpg">VOEVZ_9_Publikationen_BWP_Archiv.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-overviewpage-slider'] = [
    'headline' => 'Blättermodule (volle Breite)',
    'description' => 'Themenspezifische Icons je Überschrift: siehe Übersicht Überschriften (s.u.).',
    'screens' => []
];

$pageInfo['pages-overviewpage-search-result'] = [
    'headline' => 'Suchergebnisseite',
    'description' => 'Relevant für:<br>
<a href="screens/Suchergebnisliste.jpg">Suchergebnisliste.jpg</a><br>
',
    'screens' => [],
    'border' => true
];



$pageInfo['pages-contentpage-standard'] = [
    'headline' => 'Inhaltseite Standard',
    'description' => 'Übersicht Inhaltselemente der rechten Spalte:<br>
<a href="screens/RC-Module.jpg">RC-Module.jpg</a><br>
',
    'screens' => [],
    'meta' => 'Seiten mit rechter Spalte'
];

$pageInfo['pages-contentpage-special'] = [
    'headline' => 'Spezialelemente',
    'description' => 'Erweiterter Teaser relevant für BIBB-Publikationen:<br>
<a href="screens/VOEVZ_1_Startseite_Publikationen.jpg">VOEVZ_1_Startseite_Publikationen.jpg</a><br>
<a href="screens/VOEVZ_2_Publikation_Detail.jpg">VOEVZ_2_Publikation_Detail.jpg</a><br>
<a href="screens/VOEVZ_3_Publikation-Suchergebnisliste.jpg">VOEVZ_3_Publikation-Suchergebnisliste.jpg</a><br>
<a href="screens/VOEVZ_8_Publikationen_BWP_Start.jpg">VOEVZ_8_Publikationen_BWP_Start.jpg</a><br>
<br>Metadaten-Tabelle relevant für Veranstaltungen:<br>
<a href="screens/Veranstaltung_Detail.jpg">Veranstaltung_Detail.jpg</a><br>
<br>A-Z im Content relevant für Glossary in Kombination mit einem Akkordeon<br>
Video und Fußnoten relevant für Inhaltsseiten
',
    'screens' => []
];

$pageInfo['pages-contentpage-forms'] = [
    'headline' => 'Formulare',
    'description' => 'u.a. relevant für:<br>
- Veröffentlichungen (Suche und erweiterte Suche)<br>
- DaPro-Suche<br>
<br>Und:<br>
<a href="screens/VOEVZ_10_Publikationen_BWP_Archivsuche.jpg">VOEVZ_10_Publikationen_BWP_Archivsuche.jpg</a><br>
<a href="screens/VOEVZ_3_Publikation-Suchergebnisliste.jpg">VOEVZ_3_Publikation-Suchergebnisliste.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-slider'] = [
    'headline' => 'Blättermodule',
    'description' => 'Blättermodule für Bildergalerien, Videos, Teaser mit Cover und Teaser ohne Bild sind in der Content-Spalte einsetzbar (die Texte zwischen den Blättermodulen dienen nur der Veranschaulichung der Einbettung der Module im Content).',
    'screens' => []
];

$pageInfo['pages-contentpage-order'] = [
    'headline' => 'Bestellprozess',
    'description' => 'Relevant für:<br>
<a href="screens/VOEVZ_5_Publikationen_Warenkorb.jpg">VOEVZ_5_Publikationen_Warenkorb.jpg</a><br>
<a href="screens/VOEVZ_6_Publikationen_Warenkorb_Bestelldaten.jpg">VOEVZ_6_Publikationen_Warenkorb_Bestelldaten.jpg</a><br>
<a href="screens/VOEVZ_7_Publikationen_Warenkorb_Bestelluebersicht.jpg">VOEVZ_7_Publikationen_Warenkorb_Bestelluebersicht.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-tabs'] = [
    'headline' => 'Karteireiter',
    'description' => 'Relevant für:<br>
    Projekte, Datenreport, Literaturhinweise / Berufesuche / Zeugniserläuterungen / Forum Foraus
    ',
    'screens' => []
];

$pageInfo['pages-contentpage-press-start'] = [
    'headline' => 'Presse (Startseite)',
    'description' => 'Relevant für:<br>
<a href="screens/Presse_Start.jpg">Presse_Start.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-press-detail'] = [
    'headline' => 'Presse (Detailseite)',
    'description' => 'Relevant für:<br>
<a href="screens/Presse_Detail.jpg">Presse_Detail.jpg</a><br>
<a href="screens/Internetartikel.jpg">Internetartikel.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-result'] = [
    'headline' => 'Ergebnisliste',
    'description' => 's.o. Spezialelemente, vgl.:<br>
<a href="screens/VOEVZ_3_Publikation-Suchergebnisliste.jpg">VOEVZ_3_Publikation-Suchergebnisliste.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-sequence'] = [
    'headline' => 'Reihe',
    'description' => 'Relevant für:<br>
<a href="screens/VOEVZ_4_Publikationen_Periodika_Reihen.jpg">VOEVZ_4_Publikationen_Periodika_Reihen.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-topic'] = [
    'headline' => 'Themenseite',
    'description' => 'Relevant für: <br>
<a href="screens/THEMEN-Seite.jpg">THEMEN-Seite.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-standard-long'] = [
    'headline' => 'Inhaltsseite Standard (lange Texte)',
    'description' => '',
    'screens' => []
];

// Fachportale
$pageInfo['pages-homepage-fp'] = [
    'headline' => 'Startseite Fachportal (statisch)',
    'description' => 'Relevant für Ausbildungplus, Deqavet (Bühnengrafik nicht freigegeben):<br>
<a href="screens/FACHPORTAL-statisch_nf.jpg">FACHPORTAL-statisch_nf.jpg</a><br>
<a href="screens/FACHPORTAL-statisch_nf2.jpg">FACHPORTAL-statisch_nf2.jpg</a><br>
<br>Variante Datenportale (relevant für Datenreport, FDZ)<br>
<a href="screens/FACHPORTAL_Datenportal-statisch_nf.jpg">FACHPORTAL_Datenportal-statisch_nf.jpg</a><br>
',
    'screens' => [],
    'meta' => 'Fachportale'
];

$pageInfo['pages-homepage-fp-news'] = [
    'headline' => 'Startseite Fachportal (News)',
    'description' => 'Relevant für Foraus (Bühnengrafik nicht freigegeben):<br>
<a href="screens/FACHPORTAL-news_nf.jpg">FACHPORTAL-news_nf.jpg</a><br>
',
    'screens' => []
];

$pageInfo['pages-contentpage-standard-theme'] = [
    'headline' => 'Inhaltsseite (Fachportal)',
    'description' => 'Portalspezifische Farben sind exemplarisch rot/blau hinterlegt.<br>

',
    'screens' => []
];

$pageInfo['pages-homepage-fp-deqavet'] = [
    'headline' => 'Startseite (DEQA-VET)',
    'description' => '',
    'screens' => []
];

$pageInfo['pages-contentpage-standard-deqavet'] = [
    'headline' => 'Inhaltsseite (DEQA-VET)',
    'description' => '',
    'screens' => []
];

$pageInfo['pages-homepage-fp-foraus'] = [
    'headline' => 'Startseite (Foraus)',
    'description' => '',
    'screens' => []
];

$pageInfo['pages-contentpage-standard-foraus'] = [
    'headline' => 'Inhaltsseite (Foraus)',
    'description' => '',
    'screens' => []
];



$pageInfo['pages-collection-headlines'] = [
    'headline' => 'Übersicht Überschriften',
    'description' => '',
    'screens' => [],
    'meta' => 'Zusammenstellungen'
];


foreach ($pageInfo as $pageKey => $pageData) {
    if (array_key_exists('meta', $pageData)) {
        echo '<h2>'.$pageData['meta'].'</h2>';
    }
    if (array_key_exists('border', $pageData)) {
        $addClass = 'border-bottom';
    }
    echo '<div class="page '.$addClass.'">';
    echo '<h3><a href="page.php?page=' . $pageKey . '">' . $pageData['headline'] . '</a></h3>';
    if (strlen($pageData['description'])) {
        echo '<p>' . $pageData['description'] . '</p>';
    }
    echo '</div>';
}

    $pages = array_diff(scandir('patterns/pages'), array('..', '.'));

    foreach ($pages as $page) {
        $prefix = substr($page, 0, strpos($page, '.'));
        if (array_key_exists($prefix, $pageInfo)) {
            continue;
        }
        echo '<div><a href="page.php?page=' . $prefix . '">' . $prefix . '</a></div>';
    }

?>
</body>
</html>
