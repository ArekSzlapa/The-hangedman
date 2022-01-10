var hasla = ["HTML", "CSS", "javascript", "Samochód", "Czołg", "Test", "Random", "Learning"];

var losowy = Math.round(Math.random()*(hasla.length-1));
console.log(losowy);

var haslo = hasla[losowy]; //Zdefiniowanie hasła które trzeba odgadnąć

haslo = haslo.toUpperCase(); //Transformacja hasła do uppercase

var length = haslo.length; //Zdefiniowanie zmiennej, która reprezentuje długość hasła
var ileSkuch = 0; //Ilość błędów która została popołniona przez gracza

var yes = new Audio("yes.wav"); // Dźwięki zaczytane z pliku, adekwatne do wybranej litery, dobrej lub złej
var no = new Audio("no.wav");

var haslo1=""; //Hasło które sie zakyrwa i odkrywa (pokazuje myślniki, lub odkrywa litere)




for (i=0; i<length; i++) //Pętla która sprawia że znak w haśle który jest spacją nie zostaje zastąpiony na myślnik. 
{
    if(haslo.charAt(i)==" ") haslo1 = haslo1 + " ";
    else haslo1 = haslo1 + "-";
}
window.onload = start; //window.onload -> Rozkaz do przeglądarki który nakazuje uruchomienie funkcji (funkcja start wypisuje liter do diva, a następnie wypisuje hasło1)


var litery = new Array(35); //Tablica z alfabetem, który później gracz wybiera litery

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";



function wypiszHaslo()

{
    document.getElementById("board").innerHTML = haslo1; //Zamieniamy wewnetrzny HTML diva na hasło1
}

function start()
{

    var trescDiva="";

    for (i=0; i<=34; i++)
    {
        var element = "lit" + i; //tutaj jest po prostu określenie kolejnej zmiennej, które wypisuje 35 elementow, określąc im nazwę i pozycje
        trescDiva = trescDiva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>'; //Odpowiada za wyświetlanie liter na stronie, przy każdej pętli zwiększa się wartość i, przez co dodawana jest kolejna litera. takie i++ 
        if((i+1) % 7==0) trescDiva = trescDiva + '<div style="clear:both"></div>'; //taka brka, jak jest podzielne przez 7 to zruca do nowej linii
    }

    document.getElementById("alphabet").innerHTML=trescDiva; //zamieniamy na trescDiva


    wypiszHaslo();
}

String.prototype.ustawZnak = function (miejsce, znak) //Dodajemy własność do stringa niestandardową
//miejsce pozycja danej litery w danym haśle

// Ala, miejsce 2="a" miejsce 3=Hasło 1 nie zostanie zmodyfikowane 
{

    if (miejsce>this.length - 1) return this.toString();
    else return this.substr(0,miejsce) + znak + this.substr(miejsce+1);
}

function sprawdz(nr)
{

    var trafiona = false;
    
    for(i=0; i<haslo.length; i++)
    {
        if(haslo.charAt(i) == litery[nr])
        {
            haslo1 = haslo1.ustawZnak(i,litery[nr]);
            trafiona = true;
        }
    }

    if (trafiona == true)
    {
        yes.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";
        wypiszHaslo();
    }
    else{
        no.play();
        var element = "lit" + nr;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick","z");

        ileSkuch++;
        var obraz = "./img/s"+ ileSkuch +".jpg"
        document.getElementById("gallows").innerHTML='<img src = "'+obraz +'" alt="Wiszone" />'
    }
//Wygrana 
if (haslo == haslo1)
document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło:"+haslo+'<br /> <br /> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';


//przegrana

if (ileSkuch >=9)
document.getElementById("alphabet").innerHTML = "Przegrana :( Prawidłowe hasło:"+haslo+'<br /> <br /> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
}

