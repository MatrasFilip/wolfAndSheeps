class Pawn //pusta klasa do dziedziczenia
{
    constructor (position)
    {
        this.position = position;
    }
    go(position)
    {
        if (this.checkMove(position))
        {
            this.position = position;
            if (whoMoves == "black") whoMoves = "white";
            else whoMoves = "black";
            document.querySelector("#"+this.id).removeEventListener("click", function()
            {
                turn = this;
            });
            showPawns();
        }
    }
}

class Wilk extends Pawn
{
    constructor(position, id)
    {
        super(position);
        this.id = 'w'+id;
        this.symbol = "<img src = 'img/Wilk.png' id = '"+this.id+"'>";
        this.possibleMoves = [this.position-9, this.position-7, this.position+7, this.position+9];
        this.color = "black";
    }

    checkMove(position)
    {
        switch (position)
        {
            case (position = this.position+7):
                if (this.position<56 && this.position%8!=0)
                return true;
                break;
            case (position = this.position+9):
                if (this.position<56 && (this.position+1)%8!=0)
                return true;
                break;
            case (position = this.position-7):
                if (this.position>7 && (this.position+1)%8!=0)
                return true;
                break;
            case (position = this.position-9):
                if (this.position>7 && this.position%8!=0)
                return true;
                break;
        }
        
    }
};
class Owca extends Pawn
{
    constructor(position, id)
    {
        super(position);
        this.id = 'o'+id;
        this.symbol = "<img src = 'img/Owca.png' class = 'owca' id = '"+this.id+"'>";
        this.color = "white";
    }

    checkMove(position)
    {
        switch (position)
        {
            case (position = this.position-7):
                if (this.position>7 && (this.position+1)%8!=0)
                return true;
                break;
            case (position = this.position-9):
                if (this.position>7 && this.position%8!=0)
                return true;
                break;
        }
    }
};

class Field
{
    constructor(color, id)
    {
        this.color = color;
        this.id = "f"+id;
        this.symbol = "<div class = 'field' id = '"+this.id+"'></div>";
    }
};
var width, turn ="", whoMoves = "black";
var pawns = [new Owca(56, 0), new Owca(58, 1), new Owca(60, 2), new Owca(62, 3), new Wilk(3, 0)];
var fields = [];
for(i=0;i<64; i++)
{
    fields[i] = new Field("", i);
}   


function generateBoard() //wyswietla planszę na ekranie
{
    var kolor = false, fieldBufor = "";

   

    fields.forEach(function(field, index)
    {
        document.querySelector("#board").innerHTML+=field.symbol;
        document.querySelector("#"+field.id).style.float = "left";
       
        if (index%8==0) 
        {
            document.querySelector("#"+field.id).style.clear = "both";
            kolor = !kolor;
        }

        if (!kolor)
        {
            
            if (index%2==0) field.kolor = "black";
            else field.kolor = "white";
        }
        else
        {
            if (index%2==0) field.kolor = "white";
            else field.kolor = "black";
        }
        document.querySelector("#"+field.id).style.backgroundColor = field.kolor;
    });

    fields.forEach(function(field)
    {
        document.querySelector("#"+field.id).addEventListener("click", function()
        {
            for (i=1;i<field.id.length; i++)
            {
                fieldBufor+=field.id[i];
            }
            if (turn.position != fieldBufor)
            {
                if (turn != "" && document.querySelector("#"+field.id).innerHTML == "")
                {
                    turn.go(parseInt(fieldBufor));
                }
                turn = "";
                showPawns();
            }
             fieldBufor = "";
        });
    
    
    })  
    
    

        
        
    
}

function sizing(objects) //dostosowuje wielkosc planszy do szerokosci ekranu
{
    width = parseFloat(window.getComputedStyle(document.querySelector("#board")).getPropertyValue("width"));
    width /=8;
    width -= parseFloat(window.getComputedStyle(document.querySelector("#board")).getPropertyValue("border-width"));
    objects.forEach(function(object)
    {
        document.querySelector("#"+object.id).style.width = width+"px";
        document.querySelector("#"+object.id).style.height = width+"px";
    })
}

function showPawns() //odświeża widok planszy
{
    
    fields.forEach(function(field)
    {
        document.querySelector("#"+field.id).innerHTML = "";
        document.querySelector("#"+field.id).style.cursor = "default";
        document.querySelector("#"+field.id).style.backgroundColor = field.kolor;
    })
    
    pawns.forEach(function(pawn)
    {
        document.querySelector("#"+fields[pawn.position].id).innerHTML = pawn.symbol;
    })
    sizing(pawns);
    moves();

}

function moves() //przygotowuje pionki do ruchu
{
    var fieldBufor = "";
    pawns.forEach(function(pawn)
    {
        if (pawn.color == whoMoves)
        {
            document.querySelector("#"+fields[pawn.position].id).style.cursor = "pointer";
            document.querySelector("#"+pawn.id).addEventListener("click", function()
            {
                turn = pawn;
                fields.forEach(function(field)
                {
                    for (i=1;i<field.id.length; i++)
                    {
                        fieldBufor += field.id[i];
                    }
                    if (pawn.checkMove(parseInt(fieldBufor))&&document.querySelector("#"+field.id).innerHTML == "") 
                    {
                        document.querySelector("#"+field.id).style.cursor = "pointer";
                        document.querySelector("#"+field.id).style.backgroundColor = "rgb(100, 100, 100)";
                    }
                    fieldBufor = "";
                });
            });
            
            
    
        }
    })
    
}

function start() // uruchamia funkcje startowe
{
    generateBoard();
    showPawns();
    sizing(fields);
    sizing(pawns);
}

window.addEventListener("load", start);
window.addEventListener("resize", () =>
{
    sizing(fields);
    sizing(pawns);
});
