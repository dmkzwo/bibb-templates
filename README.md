# BIBB Relaunch Templating

**Stand:** 31.01.2019

## Vorbemerkungen

Die hier skizzierte Struktur und Vorgehensweise kann noch Veränderungen unterliegen und in der finalen Version abweichen.  
Sie soll einen Einblick in den aktuellen Stand geben. Vor der finalen Abnahme des Templating-Systems durch das BIBB, erfolgt die Verwendung als Basis für eine technische Umsetzung auf eigene Gefahr, da Änderungen hieran noch vorgenommen werden können.

## Preview-Links

Der Einfachheit halber (kein Patternlab notwendig) werden die fertig umgesetzten Seiten noch einmal hier zum direkten Aufruf im Browser zur Verfügung gestellt:

http://bibb-preview.dmkzwo-service.de

Zugang: wie altes Template-System


## Installation

### Voraussetzungen

* git
* node (>= v8*)
* gulp (cli global)

### Pattern Lab einrichten

Clone mittels SSH:

    git clone git@github.com:dmkzwo/bibb-templates.git

oder Clone mittels HTTPS:    

    git clone https://github.com/dmkzwo/bibb-templates.git
    
Installation von Abhängigkeiten:
    
    cd bibb-templates
    npm install
    
### Pattern Lab starten
    
    gulp patternlab:serve
    
Wenn nach Starten des Servers das Browser-Fenster leer bleiben sollte, führt eine kurze Veränderung der Fenstergröße zur korrekten Darstellung (Bug Pattern Lab).
    
Der Build-Prozess ist im Prototyp nicht enthalten.    
   
### Server starten

Zum Laden von Navigationsstrukturen per AJAX muss im Testbetrieb ein Server gestartet werden. Weitere Informationen s.u.

    cd server
    php -S localhost:2222
    
oder 

    php -S 127.0.0.1:2222    
   
## Patterns (Atomic Design)

### Namensgebung

Die intern verwendeten Namen der Patterns können durch die Verwendung des *title*-Eintrags in der zugehörigen Markdown-Datei (*.md) für die Ausgabe in Pattern Lab überschrieben werden.
Die Festlegung dieser Namen beruht auf den Vorgaben des BIBB.


### Struktur

#### Atome

* *atoms/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *atoms/content*: Elemente, die in Content-Seiten direkt verwendet werden können (gemäß Namensvorgabe BIBB)
* *atoms/forms*: Formular-Bausteine
* *atoms/headlines*: Überschriften
* *atoms/images*: Bild-Bausteine
* *atoms/overview*: Elemente für Seiten ohne rechte Spalte
* *atoms/parts*: Elemente, die nur innerhalb übergeordneter Patterns verwendet werden (und die nicht schon in einem anderen atoms-Ordner enthalten sind)
* *atoms/teasers*: Teaser-Bausteine


#### Moleküle

* *molecules/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *molecules/content*: Elemente, die in Content-Seiten direkt verwendet werden können (gemäß Namensvorgabe BIBB)
* *molecules/forms*: Formular-Bausteine
* *molecules/headlines*: Überschriften
* *molecules/images*: Bild-Bausteine
* *molecules/parts*: Elemente, die nur innerhalb übergeordneter Patterns verwendet werden
* *molecules/teasers*: Teaser-Bausteine

#### Organismen

* *organisms/basic*: Elemente, die nur innerhalb eines Content-Containers etc. eingesetzt werden können (s.u.)
* *organisms/content*: Elemente, die in Content-Seiten direkt verwendet werden können (gemäß Namensvorgabe BIBB)
* *organisms/footer*: Bestandteile des Seitenfußes     
* *organisms/forms*: Formular-Bausteine     
* *organisms/header*: Elemente des Seitenkopfs und Bühnen    
* *organisms/media*: Medien-Elemente      
* *organisms/navigation*: Navigations-Elemente
* *organisms/order*: Bestellprozess (Warenkorb, etc.)     
* *organisms/pagination*: Paginierung     
* *organisms/right-column*: Elemente der rechten Spalte     
* *organisms/slider*: Elemente für Blättermodule     
* *organisms/socialmedia*: Socialmedia-Elemente     
* *organisms/karteireiter*: Karteireiter-Elemente     
* *organisms/teasers*: Teaser und Teaser-Container     
* *organisms/variants*: Varianten von Content-Elementen

#### Templates

* *templates/collections*: Zusammenstellungen
* *templates/contentpages*: Seiten mit rechter Spalte
* *templates/homepages*: Startseiten
* *templates/overviewpages*: Seite ohne rechte Spalte

#### Pages

* *pages/collections*: Zusammenstellungen
* *pages/contentpages*: Seiten mit rechter Spalte
* *pages/homepages*: Startseiten
* *pages/overviewpages*: Seite ohne rechte Spalte

### Layout

#### Besonderer Hinweis für Seiten ohne rechte Spalte

Der Contentbereich dieser Seiten ist jeweils in Streifen aufgebaut, die den eigentlichen Content enthalten.
Das Layout dieser Streifen kann/muss durch die folgenden Style-Klassen beeinflusst werden:

* **fr-container__outside--padding-top**: normaler Innenabstand oben
* **fr-container__outside--padding-bottom**: normaler Innenabstand unten
* **fr-container__outside--padding-top-large**: großer Innenabstand oben
* **fr-container__outside--padding-bottom-large**: großer Innenabstand unten
* **fr-container-color-standard**: Hintergrundfarbe Standard-Grau
* **fr-container-color-1**: Sonderfarbe 1 (Theme) 
* **fr-container-color-2**: Sonderfarbe 2 (Theme) 
* **fr-container__outside--two-colors**: Sonderfall Socialmedia/Twitter auf Startseite (zweifarbig)
* **fr-container__outside--with-background**: Hilfsklasse für Streifen, die per style-Attribut ein Hintergrundbild erhalten

### Validierung

Alle Seiten (pages) wurden mit dem W3C Markup Validation Service (https://validator.w3.org/) erfolgreich validiert.

Ausnahmen:
* Aufgrund des Atomic Design sind Formular-IDs doppelt vergeben und resultieren in einer Fehlermeldung. Dieses Problem wird in einer Live-Umgebung nicht auftreten.
* Bei Tabs (Karteireiter) wird ein Workaround verwendet, um den Fokus-Zustand bei Click zu verhindern. Dieser resultiert ebenfalls in einer Fehlermeldung (tabindex).
Wenn der Wunsch nach validem HTML höher gewertet wird, kann dieser Workaround entfernt werden.

## Stylesheets

### Dateistruktur

Die elementspezischen Styles werden in SCSS-Dateien definiert, die im gleichen Verzeichnis wie die zugehörigen Pattern-Dateien (*.mustache) liegen.
Dabei wird zu Gunsten einer größeren Übersichtlichkeit und einer Begrenzung der Dateimenge auf eine 1:1 Zuordnung von Stylesheets und Patterns verzichtet.
In diesem Fall werden logisch zusammenhängende Style-Definitionen auf einer höheren Ebene (Molekül, Organismus) zusammengefasst.

Übergreifende Definitionen finden sich im Verzeichnis **_scss** und weiteren Unterverzeichnissen.

### Namenskonvention

Style-Klassen von externen Frameworks (Bootstrap) und Paketen werden unverändert übernommen.

Die Namen der projektspezifischen Style-Klassen und -Dateien korrelieren weitgehend mit den Patterns, in denen sie eingesetzt werden.

Zusätzlich kommen folgende Namespaces (Prefixes) zum Einsatz:

* **c-** Style-Klassen für Content-Elemente
* **h-** Style-Hilfsklassen
* **fr-** Style-Klassen für Layout und übergreifende Seiten-Elemente (z.B. Navigation)
* **js-** Style-Klassen, die als Ankerpunkte für Javascript-Interaktion fungieren

Soweit möglich und sinnvoll wurde eine Benennung nach dem **BEM**-Prinzip angewendet.

### Farben

Farben sind in den folgenden Dateien definiert:
* **_scss/general/_colors.scss** unveränderliche Farben
* **_scss/themes/theme_xxx.scss** Theme-abhängige Farben

### Content-Container

HTML-Elemente die über einen RichText-Editor eingefügt werden, sollen nach Möglichkeit keine zusätzlichen Style-Klassen erhalten und weichen somit vom BEM-Prinzip ab.
Diese Patterns (Atome, Moleküle) sind jeweils im Unterverzeichnis *basic* zu finden.
Die notwendigen Styles finden sich bei den Organismen, die diese Patterns einbinden.

### Theming

Farb-Definitionen, die sich auf der Haupt- und den verschiedenen Portal-Seiten unterschiedlich aber konsistent verhalten müssen, werden jeweils über eine zusätzliche Stylesheet-Datei (theme-*.(s)css) definiert.
Im Falle der Hauptseite z.B. theme_bibb.scss. Dadurch wird eine einfache Anpassung des jeweiligen Farbschemas erreicht.
Diese Datei wird per Import in die zentrale SCSS-Datei (z.B. main-bibb.scss) integriert.  
Als Beispiel ist ein weiteres Theme (ohne reale Farben) vorhanden: main-theme1.scss, theme_theme1.scss

### Verarbeitung

Die SCSS-Dateien werden mit Gulp-Tasks verarbeitet bzw. optimiert (autoprefixer, lint, sourcemaps) und zu einer zentralen CSS-Datei zusammengefasst, die im HEAD eingebunden wird.

**Ausnahme:** Die für die Lightbox notwendige CSS-Datei wird extra eingebunden.

## Javascript

### Dateistruktur

Alle Javascript-Dateien finden sich im Verzeichnis **_javascript** und weiteren Unterverzeichnissen.

### Verarbeitung

Die verschiedenen Javascript-Module werden per Webpack (ausgehend von main.js) zu einer zentralen Datei (build.js ) zusammengefasst und vor dem schließenden Body-Tag eingebunden. 


## Fonts / Icon-Fonts / Sprites

* Die notwendigen Text-Fonts werden extern über Google-Fonts eingebunden.
* Für Icons wird ein eigener Webfont verwendet (fonts, _scss/fonts).
* Alle weiteren Icons werden als SVGs oder SVG-Sprites eingebunden (images/svg, images/sprites).


## Hauptnavigation

Die Hauptnavigation ist auf Basis von AJAX umgesetzt, d.h. Layer mit Navigationsunterpunkten werden erst geladen, wenn sie benötigt werden.

### Dummy-Endpunkt

Da zur Zeit der Template-Erstellung keine serverseitige Quelle für die Seitenstrukturinformationen zur Verfügung stehen kann, wurde ein Testendpunkt erstellt (ajax.php), der auf Anfrage entsprechende Dummy-Daten zurückliefert.

Starten des Servers:

    cd server
    php -S localhost:2222
    
### Übergabe-Parameter

Der einzige Parameter ist die eindeutige **ID** der Seite, für die die entsprechenden Unternavigationspunkte abgefragt werden soll.

### Rückgabe-Format (JSON)

Nachfolgend ist die JSON-Rückgabe beispielhaft an einer Seite mit der fiktiven ID 29 (= Abfrage-Parameter) gezeigt.

**pid**: ID der jeweiligen Seite  
**level**: Tiefe der angefragten Seite in der Seitenstruktur  
**url**: Seiten-URL (hier der Einfachheit nur #)  
**label**: Link-Label  
**subItems**: Unternavigationspunkte  
**hasSubItems**: gibt an, ob diese Seite Unternavigationspunkte hat  

     {
       "pid": 29,
       "level": 2,
       "url": "#",
       "label": "Daten | Bildungsberichterstattung",
       "subItems": [
         {
           "pid": 291,
           "url": "#",
           "label": "Übergänge in Ausbildung",
           "hasSubItems": true
         },
         {
           "pid": 292,
           "url": "#",
           "label": "Ausbildung und Erwerbstätigkeit",
           "hasSubItems": true
         },
         {
           "pid": 293,
           "url": "#",
           "label": "Datenreport zum Berufsbildungsbericht",
           "hasSubItems": false
         },
         {
           "pid": 294,
           "url": "#",
           "label": "Indikatoren zur Bildungsberichterstattung",
           "hasSubItems": true
         },
         {
           "pid": 295,
           "url": "#",
           "label": "Integrierte Ausbildungsberichterstattung - iABE",
           "hasSubItems": true
         },
         {
           "pid": 296,
           "url": "#",
           "label": "Expertenmonitor",
           "hasSubItems": true
         },
         {
           "pid": 297,
           "url": "#",
           "label": "Referenz-Betriebs-System",
           "hasSubItems": true
         }
       ]
     }

### Initialisierung

Auf einer Unterseite soll die Navigation (beim ersten Klick) auf den passenden Hauptnavigationspunkt im korrekten Zustand also entsprechend aufgeklappt dargestellt werden.

Die dazu notwendigen Informationen werden der Navigation über ein DATA-Attribut (data-initial) mitgegeben. Im Falle der für das Template bespielhaft ausgewählten Unterseite wäre dies:

    <nav class="fr-main-navigation js-main-navigation"
        data-initial='[
            {"pid": "2", "label": "Themen"}, 
            {"pid": "29", "label": "Daten | Bildungsberichterstattung"}, 
            {"pid": "292", "label": "Ausbildung und Erwerbstätigkeit"}, 
            {"pid": "2926", "label": "Nicht formal Qualifizierte (nfQ)", "subItems": false}]'>
            ...
    </nav>
    
### Bitte beachten

Da es sich um ein Template handelt, kann die Navigation nicht *durchgeklickt* werden. Es kann auf einem beispielhaften vordefinierten Pfad aber das Verhalten der Navigationslayer getestet werden.

Der Pfad der gewählten Beispielseite lautet:

*Themen* > *Daten | Bildungsberichterstattung* > *Ausbildung und Erwerbstätigkeit* > *Nicht formal Qualifizierte (nfQ)*

In diesem Zustand öffnet sich auch die Navigation beim ersten Klick auf *Themen*

Desweiteren ist der Punkt *Ausbildungsvergütung* (Unterpunkte) verlinkt


 ## Bekannte Probleme
 
 * Die Lightbox funktioniert nicht innerhalb von PatternLab
 * Ein Bug in alten Edge-Versionen führt dazu, dass Javascript Events nicht immer verarbeitet werden. Wird durch ein Edge-Update behoben.
 * Aufgrund eines Bugs im IE11 unter Windows 10, wird der Slider während der Bewegung nicht korrekt dargestellt. Sollte diese Browser-Konstellation noch als relevant eingestuft werden, könnte dieses Problem mit einer Browserweiche durch Entfernung der halbtransparenten Flächen behoben werden.
 * Vulnaribilities in einigen Node Modulen (dies wird nicht als relevant eingeschätzt, da node nur für die Generierung der Templates aber nicht im Live-Betrieb eingesetzt wird)
 