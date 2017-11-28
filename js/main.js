/**---------------------------------------------------------------------------*

                          PASTÈQUE

 *----------------------------------------------------------------------------*/

/* Tableau des images. */
images = [];
images[0] = "img/pastèque/pastèque_0.png";
images[1] = "img/pastèque/pasteque-love.png";
images[2] = "img/pastèque/PastèqueBaleine.jpg";
images[3] = "img/pastèque/salade-de-fruits-pasteque1.jpg";
images[4] = "img/pastèque/pasteque.jpg";
images[5] = "img/pastèque/eba2b2aa.jpg";
images[6] = "img/pastèque/requin_pasteque_3_t.800.jpg";
images[7] = "img/pastèque/viking-watermelon-carving.jpg";

cases = [];

var	premier = true;
var	memoire_id;
var	lignes = 4;
var colonnes = 4;
var stylesheet;
var cliquage = false;
var etat = 0;

function entier_aleatoire (min, max)
{
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function creer_styles ()
{
  let case_id;
  let	case_a;
  let	case_b;

  let nombre_cases = lignes * colonnes;
  let nombre_images = nombre_cases / 2;

  for (case_n = 0; case_n < nombre_cases; case_n++)
  {
    cases[case_n] = "null";
  }

  for (image = 0; image < nombre_images; image++)
  {
    do
    {
      case_a = entier_aleatoire (0, nombre_cases);
      console.log ("a : " + case_a  + typeof (cases[case_a]));
    }
    while (cases[case_a] != "null");
    cases[case_a] = images[image];
    do
    {
      case_b = entier_aleatoire (0, nombre_cases);
      console.log ("b : " + case_b);
    }
    while (cases[case_b] != "null");
    cases[case_b] = images[image];
  }

  for (case_id = 0; case_id < nombre_cases; case_id++)
  {
    document.getElementById(case_id).style.backgroundColor = "black";
    let style_case = "#" + case_id + ":active { background-image: url(" + cases[case_id] + ");}";
    console.log("style pour la case: " + style_case);
    /*stylesheet.insertRule(style_case, 0);*/
  }

}

function peupler_plateau ()
{
  let plateau = document.getElementById("plateau");
  let case_id = 0;

  /* Lignes */
  for (ligne = 0; ligne < lignes; ligne++)
  {
    div_ligne = document.createElement("div");
    div_ligne.setAttribute("class", "ligne");
    plateau.appendChild(div_ligne);

    /* Cases */
    for (colonne = 0; colonne < colonnes; colonne++)
    {
      div_case = document.createElement("div");
      div_case.setAttribute("class", "case");
      div_case.setAttribute("id", case_id);
      div_case.setAttribute("onclick", "clique(this.id)");
      div_ligne.appendChild(div_case);

      case_id++;
    }
  }
}

function init ()
{

  peupler_plateau ();

  creer_styles ();

}

function clique (id)
{
  if (cliquage == true)
  return;
  cliquage = true;
  element = document.getElementById(id);

  if (element.style.backgroundColor == "black")
  {
    if (premier)
    {
      memoire_id = id;
      element.style.backgroundImage = "url('" + cases[id] + "')";
      premier = false;
    }
    else
    {
      if (id != memoire_id)
      {
        if (cases[memoire_id] == cases[id])
        {
          //console.log ("cases[memoire_id] == cases[id] : " + id)
          element.style.backgroundImage = "url('" + cases[id] + "')";
          etat++;
          if (etat == 16)
          alert("Terminé !!!!");
        }
        else
        {
          //console.log ("cases[memoir._id] != cases[id] : " + id)
          document.getElementById(id).style.backgroundImage = "url('" + cases[id] + "')";

          window.setTimeout(function(){element.style.backgroundImage = "none"}, 200);

          document.getElementById(memoire_id).style.backgroundImage = "none";
        }
        premier = true;
      }
    }
  }
  cliquage = false;
}

function creer_plateau ()
{
  lignes = document.getElementById('largeur').value;
  colonnes = document.getElementById('hauteur').value;
  console.log("lignes : " + lignes);
  console.log("colonnes : " + colonnes);

  peupler_plateau ();
  creer_styles ();
}
